/* eslint-disable @typescript-eslint/no-require-imports -- Node's isolated CommonJS test harness. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function load(file, dependencies = {}, globals = {}) {
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, require: name => {
    if (!(name in dependencies)) throw new Error(`Unexpected dependency ${name}`);
    return dependencies[name];
  }, Request, Response, ...globals });
  return exports;
}
const refs = { orderId: 'WSS123abc', billCode: 'abc123', transactionId: 'TP123' };
function route(receipt) {
  return load('app/api/payment-status/route.ts', {
    '../../../lib/supabase-admin': { getPaymentReceipt: async (...args) => {
      assert.deepEqual(args, Object.values(refs));
      if (receipt instanceof Error) throw receipt;
      return receipt;
    } },
  }).POST;
}
function request(body) {
  return new Request('http://localhost/api/payment-status', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
}
test('URL success and client amount cannot establish payment', async () => {
  const response = await route(null)(request({ ...refs, status_id: '1', amount: 9999 }));
  assert.deepEqual(await response.json(), { state: 'pending' });
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
});
test('verified receipt determines amount', async () => {
  const response = await route({ status: 1, amount_cents: 1000 })(request(refs));
  assert.deepEqual(await response.json(), { state: 'success', amount: 10, transactionId: refs.transactionId });
});
test('failed, pending and unavailable receipts never count as success', async () => {
  for (const [receipt, state] of [[{status: 3}, 'failed'], [{status: 2}, 'pending'], [new Error('offline'), 'pending'], [{status: 1, amount_cents: -1}, 'pending']]) {
    const response = await route(receipt)(request(refs));
    assert.equal((await response.json()).state, state);
  }
});
test('reject missing or filter-injection references', async () => {
  for (const body of [null, {}, {...refs, orderId: 'WSS*,status.eq.1'}]) {
    assert.equal((await route(null)(request(body))).status, 400);
  }
});
test('marketing consent is required; blocked storage fails closed', () => {
  for (const mode of ['denied', null, 'blocked']) {
    let calls = 0;
    const window = { localStorage: { getItem() { if (mode === 'blocked') throw Error(); return mode; } }, fbq() { calls++; } };
    const {trackMetaEvent} = load('lib/meta-pixel.ts', {}, {window});
    assert.equal(trackMetaEvent({name: 'Purchase'}), false);
    assert.equal(calls, 0);
  }
});
test('granted consent accepts immediate or queued events', () => {
  for (const ready of [true, false]) {
    let calls = 0;
    const window = { localStorage: {getItem: () => 'granted'}, ...(ready ? {fbq: () => calls++} : {}) };
    const {trackMetaEvent} = load('lib/meta-pixel.ts', {}, {window});
    assert.equal(trackMetaEvent({name: 'Purchase'}), true);
    assert.equal(ready ? calls : window.__metaEventQueue.length, 1);
  }
});
