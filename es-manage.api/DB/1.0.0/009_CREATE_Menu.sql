DROP TABLE IF EXISTS public.menu;

CREATE TABLE IF NOT EXISTS public.menu
(
    id character varying(25) COLLATE pg_catalog."default" NOT NULL,
    menuname character varying(50) COLLATE pg_catalog."default",
    createdon timestamp without time zone,
    createdby character varying(25) COLLATE pg_catalog."default",
    deleted boolean,
    CONSTRAINT menu_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.menu
    OWNER to es;

INSERT INTO public."menu" ("id", "menuname", "createdon", "createdby", "deleted")
VALUES ('1', 'Brand', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."menu" ("id", "menuname", "createdon", "createdby", "deleted")
VALUES ('2', 'Item', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."menu" ("id", "menuname", "createdon", "createdby", "deleted")
VALUES ('3', 'Category', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."menu" ("id", "menuname", "createdon", "createdby", "deleted")
VALUES ('4', 'Item Supplier', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."menu" ("id", "menuname", "createdon", "createdby", "deleted")
VALUES ('5', 'Item Supplier Transaction', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."menu" ("id", "menuname", "createdon", "createdby", "deleted")
VALUES ('6', 'Supplier', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."menu" ("id", "menuname", "createdon", "createdby", "deleted")
VALUES ('7', 'User', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."menu" ("id", "menuname", "createdon", "createdby", "deleted")
VALUES ('8', 'Role', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;