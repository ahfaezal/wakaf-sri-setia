alter table public.wakaf_bills
  add column if not exists donor_name text,
  add column if not exists donor_email text;

grant select (external_reference, bill_code, amount_cents, donor_name, donor_email),
  insert (external_reference, bill_code, amount_cents, donor_name, donor_email)
  on public.wakaf_bills to service_role;

grant select (refno, bill_code, external_reference, status, amount_cents,
  transaction_time, received_at)
  on public.wakaf_transactions to service_role;
