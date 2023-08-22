CREATE TABLE IF NOT EXISTS public."usermst" (
    "id" UUID PRIMARY KEY,
    "username" VARCHAR(25) NOT NULL,
    "displayname" VARCHAR(50),
    "password" VARCHAR(250) NOT NULL,
    "createdon" TIMESTAMP,
    "createdby" VARCHAR(25),
    "modifiedon" TIMESTAMP,
    "modifiedby" VARCHAR(25),
    "deletedat" TIMESTAMP,
    "roleid" VARCHAR(100),  -- Foreign key column
    CONSTRAINT fk_user_role FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE SET NULL
);

ALTER TABLE IF EXISTS public."usermst"
    OWNER to es;