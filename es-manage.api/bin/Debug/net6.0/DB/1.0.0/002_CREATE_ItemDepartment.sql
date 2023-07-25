CREATE TABLE IF NOT EXISTS public."itemdepartment" (
    "id" character varying(100),
    "categoryname" character varying(100),
    "itemdepartmentparentid" character varying(10),
    "deleted" bit DEFAULT B'0',
    "createdon" timestamp,
    "createdby" character varying(25),
    "modifiedon" timestamp,
    "modifiedby" character varying(25),
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."itemdepartment"
    OWNER to es;
    ADD CONSTRAINT unique_categoryname UNIQUE ("categoryname");