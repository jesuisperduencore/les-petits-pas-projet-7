revoke all on function public.rls_auto_enable() from public, anon, authenticated;

create index if not exists children_section_id_idx on public.children(section_id);
create index if not exists events_author_id_idx on public.events(author_id);
create index if not exists events_child_id_idx on public.events(child_id);
create index if not exists family_members_profile_id_idx on public.family_members(profile_id);
create index if not exists messages_child_id_idx on public.messages(child_id);
create index if not exists messages_parent_id_idx on public.messages(parent_id);
