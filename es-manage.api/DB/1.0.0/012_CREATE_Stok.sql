CREATE TABLE IF NOT EXISTS public.stok
(
    id character varying(25) COLLATE pg_catalog."default" NOT NULL,
    itemid character varying(25) COLLATE pg_catalog."default",
    stok character varying(25) COLLATE pg_catalog."default",
    deleted boolean,
    CONSTRAINT stok_pkey PRIMARY KEY (id),
    CONSTRAINT stok_itemid_fkey FOREIGN KEY (itemid)
        REFERENCES public.item (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE IF EXISTS public.stok
    OWNER to es;