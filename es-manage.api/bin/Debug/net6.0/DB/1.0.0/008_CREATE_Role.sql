CREATE TABLE IF NOT EXISTS public."role" (
    "id" VARCHAR(100) PRIMARY KEY,
    "rolename" VARCHAR(50) NOT NULL,
    "createdon" TIMESTAMP,
    "createdby" VARCHAR(25),
    "modifiedon" TIMESTAMP,
    "modifiedby" VARCHAR(25),
    "deletedat" TIMESTAMP
);
ALTER TABLE IF EXISTS public."role"
    OWNER to es;