create table if not exists public.wakaf_bills (
  external_reference text primary key,
  bill_code text not null unique,
  amount_cents bigint not null check (amount_cents between 100 and 3000000),
  donor_name text,
  donor_email text,
  created_at timestamptz not null default now()
);

create table if not exists public.wakaf_transactions (
  refno text primary key,
  bill_code text not null,
  external_reference text not null references public.wakaf_bills(external_reference),
  amount_cents bigint not null check (amount_cents > 0),
  status smallint not null check (status in (1, 2, 3)),
  reason text not null default '',
  transaction_time text,
  received_at timestamptz not null default now()
);

create table if not exists public.wakaf_bill_attempts (
  id bigint generated always as identity primary key,
  ip_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists wakaf_bill_attempts_ip_created_idx
  on public.wakaf_bill_attempts (ip_hash, created_at desc);

alter table public.wakaf_bills enable row level security;
alter table public.wakaf_transactions enable row level security;
alter table public.wakaf_bill_attempts enable row level security;

grant select, insert on table public.wakaf_bills to service_role;
grant select (refno, bill_code, external_reference, status, amount_cents)
  on public.wakaf_transactions to service_role;
grant select (transaction_time, received_at)
  on public.wakaf_transactions to service_role;

create or replace function public.check_wakaf_rate_limit(
  p_ip_hash text,
  p_limit integer default 5,
  p_window_minutes integer default 10
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  recent_attempts integer;
begin
  perform pg_advisory_xact_lock(hashtext(p_ip_hash));
  delete from public.wakaf_bill_attempts
    where created_at < now() - interval '1 day';
  select count(*) into recent_attempts
    from public.wakaf_bill_attempts
    where ip_hash = p_ip_hash
      and created_at >= now() - make_interval(mins => p_window_minutes);
  if recent_attempts >= p_limit then
    return false;
  end if;
  insert into public.wakaf_bill_attempts (ip_hash) values (p_ip_hash);
  return true;
end;
$$;

create or replace function public.record_wakaf_callback(
  p_refno text,
  p_bill_code text,
  p_external_reference text,
  p_amount_cents bigint,
  p_status smallint,
  p_reason text,
  p_transaction_time text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.wakaf_transactions (
    refno, bill_code, external_reference, amount_cents, status, reason,
    transaction_time
  ) values (
    p_refno, p_bill_code, p_external_reference, p_amount_cents, p_status,
    coalesce(p_reason, ''), p_transaction_time
  )
  on conflict (refno) do update set
    status = excluded.status,
    reason = excluded.reason,
    transaction_time = excluded.transaction_time;
end;
$$;

create or replace function public.get_wakaf_stats()
returns table(total_amount_cents bigint, donor_count bigint)
language sql
stable
security definer
set search_path = public
as $$
  select
    coalesce(sum(amount_cents), 0)::bigint,
    count(*)::bigint
  from public.wakaf_transactions
  where status = 1;
$$;

revoke all on function public.record_wakaf_callback(text, text, text, bigint, smallint, text, text) from public;
revoke all on function public.get_wakaf_stats() from public;
grant execute on function public.record_wakaf_callback(text, text, text, bigint, smallint, text, text) to service_role;
grant execute on function public.get_wakaf_stats() to service_role;
revoke all on function public.check_wakaf_rate_limit(text, integer, integer) from public;
grant execute on function public.check_wakaf_rate_limit(text, integer, integer) to service_role;
