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
                                   name character varying(255) NOT NULL,
                                   address character varying(255),
                                   phone_number character varying(255) NOT NULL,
                                   email character varying(255),
                                   customer_id character varying(255) NOT NULL
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
                                product_id integer NOT NULL
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
                                   userx integer NOT NULL,
                                   first_contact timestamp without time zone NOT NULL,
                                   measurement_date timestamp without time zone NOT NULL,
                                   installation_date timestamp without time zone NOT NULL, --mount?
                                   notes character varying(2000),
                                   --Photos
                                   installation_details integer NOT NULL,
                                   products_id integer NOT NULL,
                                   CONSTRAINT fk_products
                                       FOREIGN KEY(products_id)
                                            REFERENCES public.products(id)
                                            ON DELETE CASCADE
                                            ON UPDATE CASCADE
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
                                    measuring_type character varying(255),
                                    model character varying(255),
                                    weave_number character varying(255),
                                    controls character varying(255),
                                    length integer,
                                    width integer,
                                    facade_details character varying(255),
                                    sun_wind_automation boolean,
                                    shake_sensor boolean,
                                    support_legs boolean
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