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

ALTER TABLE ONLY public.userx
    ADD CONSTRAINT userx_pkey PRIMARY KEY (id);

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
ALTER TABLE ONLY public.customer ALTER COLUMN id SET DEFAULT nextval('public.customer_id_seq'::regclass);
SELECT pg_catalog.setval('public.customer_id_seq', 1, false);

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (id);

ALTER TABLE public.customer ADD CONSTRAINT unique_customer_number UNIQUE (customer_number);


-----------------------------------------------------------------


CREATE TABLE public.installation_details (
                                                id integer NOT NULL,
                                                order_id integer NOT NULL,
                                                mounting_type character varying(255),
                                                facade_details character varying(255),
                                                floor_details character varying(255),
                                                cable_length character varying(255),
                                                remote_control character varying(255),
                                                lift_needed character varying(255),
                                                notes character varying(2000)
);

CREATE SEQUENCE public.installation_details_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.installation_details_id_seq OWNED BY public.installation_details.id;

ALTER TABLE ONLY public.installation_details
    ADD CONSTRAINT installation_details_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.installation_details ALTER COLUMN id SET DEFAULT nextval('public.installation_details_id_seq'::regclass);

-----------------------------------------------------------------


CREATE TABLE public.order (
                                id integer NOT NULL,
                                customer_number character varying(255),
                                first_contact timestamp without time zone,
                                measurement_date timestamp without time zone,
                                installation_date timestamp without time zone,
                                notes character varying(2000),
                                indoorOutdoor varchar(20),
                                order_status integer
);

CREATE SEQUENCE public.order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.order_id_seq OWNED BY public.order.id;



ALTER TABLE ONLY public.order
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.order ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);

ALTER TABLE ONLY public.order
    ADD CONSTRAINT order_customer_fkey FOREIGN KEY (customer_number) REFERENCES public.customer(customer_number);


-----------------------------------------------------------------


CREATE TABLE public.order_photos (
                                      id integer NOT NULL,
                                      order_id integer,
                                      photo text,
                                      CONSTRAINT order_photos_pkey PRIMARY KEY (id),
                                      CONSTRAINT fk_order_photos_order FOREIGN KEY (order_id)
                                          REFERENCES public.order (id)
);

CREATE SEQUENCE public.order_photos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.order_photos_id_seq OWNED BY public.order_photos.id;

ALTER TABLE ONLY public.order_photos ALTER COLUMN id SET DEFAULT nextval('public.order_photos_id_seq'::regclass);


-----------------------------------------------------------------


CREATE TABLE public.product (
                                 id integer NOT NULL,
                                 name character varying(255) NOT NULL,
                                 CONSTRAINT articles_pkey PRIMARY KEY (id)
);

CREATE SEQUENCE public.product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


CREATE TABLE public.order_item (
                                    id integer,
                                    order_id integer NOT NULL,
                                    item_id integer NOT NULL,
                                    CONSTRAINT order_item_pkey PRIMARY KEY (id),
                                    CONSTRAINT fk_order_item_order FOREIGN KEY (order_id)
                                        REFERENCES public.order (id),
                                    CONSTRAINT fk_order_item_product FOREIGN KEY (item_id)
                                        REFERENCES public.product (id)
);

CREATE SEQUENCE public.order_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_item_id_seq OWNED BY public.order_item.id;

ALTER TABLE ONLY public.order_item ALTER COLUMN id SET DEFAULT nextval('public.order_item_id_seq'::regclass);


CREATE TABLE public.item_attributes (
                                        id integer NOT NULL,
                                        order_item_id integer,
                                        attribute character varying(255) NOT NULL,
                                        value character varying(255) NOT NULL,
                                        CONSTRAINT item_attributes_pkey PRIMARY KEY (id),
                                        CONSTRAINT fk_item_attributes_order_item FOREIGN KEY (order_item_id)
                                            REFERENCES public.order_item (id)
);

CREATE SEQUENCE public.item_attributes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.item_attributes_id_seq OWNED BY public.item_attributes.id;

ALTER TABLE ONLY public.item_attributes ALTER COLUMN id SET DEFAULT nextval('public.item_attributes_id_seq'::regclass);