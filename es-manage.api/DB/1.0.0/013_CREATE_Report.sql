CREATE TABLE IF NOT EXISTS public.report
(
    id character varying(100) COLLATE pg_catalog."default" NOT NULL,
    type character varying(25) COLLATE pg_catalog."default",
    tablename character varying(25) COLLATE pg_catalog."default",
    details character varying COLLATE pg_catalog."default",
    date timestamp without time zone,
    CONSTRAINT report_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.report
    OWNER to es;