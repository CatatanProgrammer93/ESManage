CREATE TABLE IF NOT EXISTS public.itemsupplier_transaction
(
    id character varying(100) COLLATE pg_catalog."default" NOT NULL,
    itemsupplierid character varying(100) COLLATE pg_catalog."default",
    transactiontype character varying(50) COLLATE pg_catalog."default",
    transactiondate timestamp without time zone,
    quantity numeric(18,2),
    notes text COLLATE pg_catalog."default",
    deleted boolean DEFAULT false,
    createdon timestamp without time zone,
    createdby character varying(50) COLLATE pg_catalog."default",
    modifiedon timestamp without time zone,
    modifiedby character varying(50) COLLATE pg_catalog."default",
    userid uuid,
    CONSTRAINT itemsupplier_transaction_pkey PRIMARY KEY (id),
    CONSTRAINT itemsupplier_transaction_itemsupplierid_fkey FOREIGN KEY (itemsupplierid)
        REFERENCES public.itemsupplier (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT itemsupplier_transaction_userid_fkey FOREIGN KEY (userid)
        REFERENCES public.usermst (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.itemsupplier_transaction
    OWNER to es;