CREATE TABLE IF NOT EXISTS public."usermst" (
    "id" UUID PRIMARY KEY,
    "username" VARCHAR(25) NOT NULL,
    "displayName" VARCHAR(50),
    "password" VARCHAR(250) NOT NULL,
    "createdOn" TIMESTAMP,
    "createdBy" VARCHAR(25),
    "modifiedOn" TIMESTAMP,
    "modifiedBy" VARCHAR(25)
);