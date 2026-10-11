insert into public.sections(name) values('Bébés'),('Moyens'),('Grands') on conflict do nothing;
-- Les comptes auth de test sont créés via le Dashboard ou le script privé local.
-- Ne jamais appliquer des données de test dans lespetitspas-prod.
