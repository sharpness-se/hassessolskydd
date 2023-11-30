SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
SET default_tablespace = '';

-- TODO: Find out how to properly run ./gradlew flywayMigrate to avoid cleaning DB
-- TODO: Set upp all FK's

CREATE TABLE public.userx (
                              id integer NOT NULL,
                              name character varying(255) NOT NULL,
                              password character varying(255) NOT NULL,
                              active boolean NOT NULL
);


CREATE SEQUENCE public.userx_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.userx_id_seq OWNED BY public.userx.id;

-----------------------------------------------------------------


CREATE TABLE public.customer (
                                 id integer NOT NULL,
                                 firstname character varying(255) NOT NULL,
                                 lastname character varying(255) NOT NULL,
                                 address character varying(255),
                                 postal_code character varying(255),
                                 city character varying(255),
                                 phone_number character varying(255) NOT NULL,
                                 email character varying(255),
                                 customer_number character varying(255) NOT NULL
);

CREATE SEQUENCE public.customer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.customer_id_seq OWNED BY public.customer.id;

-----------------------------------------------------------------


CREATE TABLE public.installation_details (
                                             id integer NOT NULL,
                                             order_id integer NOT NULL, --fk
                                             is_normal boolean NOT NULL,
                                             facade_details character varying(255),
                                             floor_details character varying(255),
                                             cable_length integer,
                                             remote_control boolean,
                                             lift_needed boolean
);

CREATE SEQUENCE public.installation_details_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.installation_details_id_seq OWNED BY public.installation_details.id;

-----------------------------------------------------------------

CREATE TABLE public.products (
                                 id integer NOT NULL,
                                 plissegardin integer, --bools?
                                 terassmarkis integer
);

CREATE SEQUENCE public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;

-----------------------------------------------------------------


CREATE TABLE public.order (
                              id integer NOT NULL,
                              customer_number integer NOT NULL, --fk, bör väl ej vara customer_id?
                              first_contact timestamp without time zone NOT NULL,
                              measurement_date timestamp without time zone NOT NULL,
                              installation_date timestamp without time zone NOT NULL,
                              notes character varying(2000),
                              products integer NOT NULL, --FK
    --Photos
                              installation_details integer NOT NULL --FK
);

CREATE SEQUENCE public.order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.order_id_seq OWNED BY public.order.id;

-----------------------------------------------------------------


CREATE TABLE public.plissegardin (
                                     id integer NOT NULL,
                                     order_id integer NOT NULL, --fk
                                     measure_type character varying(255),
                                     width integer,
                                     height integer,
                                     weave_number character varying(255),
                                     model character varying(255),
                                     mounting character varying(255),
                                     allmogebeslag boolean, --True if mounting character is
                                     controls character varying(255),
                                     control_side character varying(255),
                                     draw_string_colour character varying(255),
                                     cassette_colour character varying(255),
                                     indoor_outdoor boolean,
                                     is_external_order boolean -- Skall den alltid vara true?
);


CREATE SEQUENCE public.plissegardin_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.plissegardin_id_seq OWNED BY public.plissegardin.id;

-----------------------------------------------------------------

--Måttyp
--Modell
--Vävnummer
--Vevväxel/motor Reglage
--Utfall
--Bredd
--längd
--Detaljfärg
--Fasadtyp
--Sol&Vind automatik?
--Skaksensor?
--Stödben?
CREATE TABLE public.terassmarkis (
                                     id integer NOT NULL,
                                     order_id integer NOT NULL, --fk
                                     measuring_type character varying(255),
                                     model character varying(255),
                                     weave_number character varying(255),
                                     controls character varying(255),
                                     length integer,
                                     width integer,
                                     facade_details character varying(255),
                                     sun_wind_automation boolean,
                                     shake_sensor boolean,
                                     support_legs boolean,
                                     indoor_outdoor boolean
    -- add details colours
);

CREATE SEQUENCE public.terassmarkis_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.terassmarkis_id_seq OWNED BY public.terassmarkis.id;

-----------------------------------------------------------------
--userx
--customer
--installation_details
--products
--order
--plissegardin
--terassmarkis

ALTER TABLE ONLY public.customer ALTER COLUMN id SET DEFAULT nextval('public.customer_id_seq'::regclass);
SELECT pg_catalog.setval('public.customer_id_seq', 1, false);





--ALTER TABLE ONLY public.groups
--ADD CONSTRAINT groups_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.userx
    ADD CONSTRAINT userx_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.installation_details
    ADD CONSTRAINT installation_details_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.order
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.plissegardin
    ADD CONSTRAINT plissegardin_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.terassmarkis
    ADD CONSTRAINT terassmarkis_pkey PRIMARY KEY (id);