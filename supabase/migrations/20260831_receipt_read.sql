-- Backend-only receipt lookup. Keep row-level security enabled and do not
-- grant access to anon/authenticated browser roles.
grant select (refno, bill_code, external_reference, status, amount_cents)
  on public.wakaf_transactions to service_role;
