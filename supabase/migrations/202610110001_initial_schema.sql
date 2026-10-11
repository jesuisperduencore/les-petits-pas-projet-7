create type public.user_role as enum ('staff','parent');
create type public.event_type as enum ('meal','nap','activity','medication','incident');
create type public.message_status as enum ('new','read','handled');

create table public.profiles(id uuid primary key references auth.users(id) on delete cascade,first_name text not null default '',last_name text not null default '',role public.user_role not null default 'parent',created_at timestamptz not null default now());
create table public.sections(id uuid primary key default gen_random_uuid(),name text unique not null check(name in ('Bébés','Moyens','Grands')));
create table public.children(id uuid primary key default gen_random_uuid(),section_id uuid not null references public.sections(id),first_name text not null,last_name text not null,birth_date date not null,medication_authorized boolean not null default false,created_at timestamptz not null default now());
create table public.family_members(child_id uuid references public.children(id) on delete cascade,profile_id uuid references public.profiles(id) on delete cascade,relationship text not null default 'parent',primary key(child_id,profile_id));
create table public.events(id uuid primary key default gen_random_uuid(),child_id uuid not null references public.children(id) on delete cascade,author_id uuid not null references public.profiles(id),type public.event_type not null,occurred_at timestamptz not null,description text not null check(char_length(description)<=500),created_at timestamptz not null default now());
create table public.messages(id uuid primary key default gen_random_uuid(),child_id uuid not null references public.children(id) on delete cascade,parent_id uuid not null references public.profiles(id),content text not null check(char_length(content) between 1 and 500),status public.message_status not null default 'new',created_at timestamptz not null default now());

create function public.handle_new_user() returns trigger language plpgsql security definer set search_path='' as $$ begin insert into public.profiles(id,first_name,last_name,role) values(new.id,coalesce(new.raw_user_meta_data->>'first_name',''),coalesce(new.raw_user_meta_data->>'last_name',''),coalesce((new.raw_app_meta_data->>'role')::public.user_role,'parent')); return new; end; $$;
revoke all on function public.handle_new_user() from public,anon,authenticated;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create function public.check_medication_authorization() returns trigger language plpgsql security invoker set search_path='' as $$ begin if new.type='medication' and not exists(select 1 from public.children c where c.id=new.child_id and c.medication_authorized) then raise exception 'Autorisation parentale requise'; end if; return new; end; $$;
create trigger medication_guard before insert or update on public.events for each row execute procedure public.check_medication_authorization();

alter table public.profiles enable row level security;alter table public.sections enable row level security;alter table public.children enable row level security;alter table public.family_members enable row level security;alter table public.events enable row level security;alter table public.messages enable row level security;
grant usage on schema public to authenticated;grant select,insert,update on all tables in schema public to authenticated;

create function public.is_staff() returns boolean language sql stable security invoker set search_path='' as $$ select coalesce((auth.jwt()->'app_metadata'->>'role')='staff',false); $$;
create policy profiles_self_or_staff on public.profiles for select to authenticated using(id=(select auth.uid()) or public.is_staff());
create policy sections_authenticated on public.sections for select to authenticated using(true);
create policy children_staff_all on public.children for all to authenticated using(public.is_staff()) with check(public.is_staff());
create policy children_parent_select on public.children for select to authenticated using(exists(select 1 from public.family_members fm where fm.child_id=children.id and fm.profile_id=(select auth.uid())));
create policy family_staff_all on public.family_members for all to authenticated using(public.is_staff()) with check(public.is_staff());
create policy family_parent_select on public.family_members for select to authenticated using(profile_id=(select auth.uid()));
create policy events_staff_all on public.events for all to authenticated using(public.is_staff()) with check(public.is_staff() and author_id=(select auth.uid()));
create policy events_parent_select on public.events for select to authenticated using(exists(select 1 from public.family_members fm where fm.child_id=events.child_id and fm.profile_id=(select auth.uid())));
create policy messages_staff_select on public.messages for select to authenticated using(public.is_staff());
create policy messages_staff_update on public.messages for update to authenticated using(public.is_staff()) with check(public.is_staff());
create policy messages_parent_select on public.messages for select to authenticated using(parent_id=(select auth.uid()));
create policy messages_parent_insert on public.messages for insert to authenticated with check(parent_id=(select auth.uid()) and exists(select 1 from public.family_members fm where fm.child_id=messages.child_id and fm.profile_id=(select auth.uid())));
