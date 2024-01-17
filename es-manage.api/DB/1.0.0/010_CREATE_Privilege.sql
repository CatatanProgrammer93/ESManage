DROP TABLE IF EXISTS public.privilege;

CREATE TABLE IF NOT EXISTS public.privilege
(
    id character varying(25) COLLATE pg_catalog."default" NOT NULL,
    privilegename character varying(50) COLLATE pg_catalog."default",
    privilegetype character varying(25) COLLATE pg_catalog."default",
    createdon timestamp without time zone,
    createdby character varying(25) COLLATE pg_catalog."default",
    deleted boolean,
    menuid character varying(25) COLLATE pg_catalog."default",
    CONSTRAINT privilege_pkey PRIMARY KEY (id),
    CONSTRAINT privilege_menuid_fkey FOREIGN KEY (menuid)
        REFERENCES public.menu (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

ALTER TABLE IF EXISTS public.privilege
    OWNER to es;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('1', 'Show Brand', 'Show', NOW(), 'System', FALSE, '1')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('2', 'Create Brand', 'Create', NOW(), 'System', FALSE, '1')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('3', 'Edit Brand', 'Edit', NOW(), 'System', FALSE, '1')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('4', 'Delete Brand', 'Delete', NOW(), 'System', FALSE, '1')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('5', 'Show Item', 'Show', NOW(), 'System', FALSE, '2')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('6', 'Create Item', 'Create', NOW(), 'System', FALSE, '2')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('7', 'Edit Item', 'Edit', NOW(), 'System', FALSE, '2')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('8', 'Delete Item', 'Delete', NOW(), 'System', FALSE, '2')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('9', 'Show Category', 'Show', NOW(), 'System', FALSE, '3')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('10', 'Create Category', 'Create', NOW(), 'System', FALSE, '3')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('11', 'Edit Category', 'Edit', NOW(), 'System', FALSE, '3')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('12', 'Delete Category', 'Delete', NOW(), 'System', FALSE, '3')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('13', 'Show Item Supplier', 'Show', NOW(), 'System', FALSE, '4')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('14', 'Create Item Supplier', 'Create', NOW(), 'System', FALSE, '4')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('15', 'Edit Item Supplier', 'Edit', NOW(), 'System', FALSE, '4')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('16', 'Delete Item Supplier', 'Delete', NOW(), 'System', FALSE, '4')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('17', 'Show Item Supplier Transaction', 'Show', NOW(), 'System', FALSE, '5')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('18', 'Create Item Supplier Transaction', 'Create', NOW(), 'System', FALSE, '5')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('19', 'Edit Item Supplier Transaction', 'Edit', NOW(), 'System', FALSE, '5')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('20', 'Delete Item Supplier Transaction', 'Delete', NOW(), 'System', FALSE, '5')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('21', 'Show Supplier', 'Show', NOW(), 'System', FALSE, '6')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('22', 'Create Supplier', 'Create', NOW(), 'System', FALSE, '6')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('23', 'Edit Supplier', 'Edit', NOW(), 'System', FALSE, '6')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('24', 'Delete Supplier', 'Delete', NOW(), 'System', FALSE, '6')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('25', 'Show User', 'Show', NOW(), 'System', FALSE, '7')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('26', 'Create User', 'Create', NOW(), 'System', FALSE, '7')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('27', 'Edit User', 'Edit', NOW(), 'System', FALSE, '7')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('28', 'Delete User', 'Delete', NOW(), 'System', FALSE, '7')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('29', 'Show Role', 'Show', NOW(), 'System', FALSE, '8')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('30', 'Create Role', 'Create', NOW(), 'System', FALSE, '8')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('31', 'Edit Role', 'Edit', NOW(), 'System', FALSE, '8')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."privilege" ("id", "privilegename", "privilegetype", "createdon", "createdby", "deleted", "menuid")
VALUES ('32', 'Delete Role', 'Delete', NOW(), 'System', FALSE, '8')
ON CONFLICT ("id") DO NOTHING;