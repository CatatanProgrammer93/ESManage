CREATE TABLE IF NOT EXISTS public."UserMst" (
    "ID" UUID PRIMARY KEY,
    "UserName" VARCHAR(25) NOT NULL,
    "DisplayName" VARCHAR(50),
    "Password" VARCHAR(250) NOT NULL,
    "CreatedOn" TIMESTAMP,
    "CreatedBy" VARCHAR(25),
    "ModifiedOn" TIMESTAMP,
    "ModifiedBy" VARCHAR(25)
);