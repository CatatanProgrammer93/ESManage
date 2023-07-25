CREATE TABLE IF NOT EXISTS public."item" (
    "id" character varying(15),
    "itemname" character varying(200),
    "categoryname" character varying(100),
    "brandid" character varying(100),
    "uom" character varying(100),
    "taxtype" integer,
    "taxrate" numeric(18,4),
    "minimumretailprice" numeric(18,4),
    "balanceqty" numeric(18,2),
    "avgcostprice" numeric(18,4),
    "retailprice" numeric(18,4),
    "costprice" numeric(18,4),
    "deleted" bit DEFAULT B'0',
    "createdon" timestamp,
    "createdby" character varying(25),
    "modifiedon" timestamp,
    "modifiedby" character varying(25),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("categoryname") REFERENCES public."itemdepartment" ("categoryname"),
    FOREIGN KEY ("brandid") REFERENCES public."brand" ("id")
);

ALTER TABLE IF EXISTS public."item"
    OWNER to es;