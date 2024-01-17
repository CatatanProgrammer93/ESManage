DROP TABLE IF EXISTS public.roleprivilege;

CREATE TABLE IF NOT EXISTS public.roleprivilege
(
    id character varying(25) COLLATE pg_catalog."default" NOT NULL,
    roleid character varying(25) COLLATE pg_catalog."default",
    privilegeid character varying(25) COLLATE pg_catalog."default",
    createdon timestamp without time zone,
    createdby character varying(25) COLLATE pg_catalog."default",
    deleted boolean,
    CONSTRAINT roleprivilege_pkey PRIMARY KEY (id),
    CONSTRAINT roleprivilege_privilegeid_fkey FOREIGN KEY (privilegeid)
        REFERENCES public.privilege (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT roleprivilege_roleid_fkey FOREIGN KEY (roleid)
        REFERENCES public.role (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE IF EXISTS public."roleprivilege"
    OWNER to es;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('1', '1', '1', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('2', '1', '2', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('3', '1', '3', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('4', '1', '4', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('5', '1', '5', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('6', '1', '6', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('7', '1', '7', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('8', '1', '8', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('9', '1', '9', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('10', '1', '10', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('11', '1', '11', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('12', '1', '12', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('13', '1', '13', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('14', '1', '14', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('15', '1', '15', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('16', '1', '16', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('17', '1', '17', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('18', '1', '18', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('19', '1', '19', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('20', '1', '20', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('21', '1', '21', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('22', '1', '22', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('23', '1', '23', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('24', '1', '24', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('25', '1', '25', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('26', '1', '26', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('27', '1', '27', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('28', '1', '28', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('29', '1', '29', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('30', '1', '30', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('31', '1', '31', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public."roleprivilege" ("id", "roleid", "privilegeid", "createdon", "createdby", "deleted")
VALUES ('32', '1', '32', NOW(), 'System', FALSE)
ON CONFLICT ("id") DO NOTHING;