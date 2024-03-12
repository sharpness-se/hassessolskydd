DROP TABLE public.products;
DROP TABLE public.plissegardin;
DROP TABLE public.terassmarkis;

ALTER TABLE public.order
    DROP COLUMN products;

ALTER TABLE public.order
    ALTER COLUMN customer_number DROP NOT NULL,
    ALTER COLUMN first_contact DROP NOT NULL,
    ALTER COLUMN measurement_date DROP NOT NULL,
    ALTER COLUMN installation_date DROP NOT NULL,
    ALTER COLUMN installation_details DROP NOT NULL;

ALTER TABLE public.installation_details
    ALTER COLUMN is_normal DROP NOT NULL;

ALTER TABLE ONLY public.order ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);

ALTER TABLE public.order
    ADD COLUMN placed_by_user integer;

ALTER TABLE public.order
    ADD COLUMN order_status integer;

ALTER TABLE public.order
    ALTER COLUMN customer_number SET DATA TYPE character varying(255);

ALTER TABLE ONLY public.order
    ADD CONSTRAINT order_installation_details_fkey FOREIGN KEY (installation_details) REFERENCES public.installation_details(id);

ALTER TABLE ONLY public.order
    ADD CONSTRAINT order_placed_by_user_fkey FOREIGN KEY (placed_by_user) REFERENCES public.userx(id);

ALTER TABLE ONLY public.order ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);


ALTER TABLE customer ADD CONSTRAINT unique_customer_number UNIQUE (customer_number);


ALTER TABLE ONLY public.order
    ADD CONSTRAINT order_customer_fkey FOREIGN KEY (customer_number) REFERENCES public.customer(customer_number);



CREATE TABLE public.articles (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    CONSTRAINT items_pkey PRIMARY KEY (id)
);

CREATE SEQUENCE public.items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.items_id_seq OWNED BY public.articles.id;

CREATE TABLE public.order_items (
    id integer,
    order_id integer NOT NULL,
    item_id integer NOT NULL,
    CONSTRAINT order_items_pkey PRIMARY KEY (id),
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id)
        REFERENCES public.order (id),
    CONSTRAINT fk_order_items_articles FOREIGN KEY (item_id)
        REFERENCES public.articles (id)
);

CREATE SEQUENCE public.order_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


CREATE TABLE public.item_attributes (
    id integer NOT NULL,
    order_items_id integer,
    attribute character varying(255) NOT NULL,
    value character varying(255) NOT NULL,
    CONSTRAINT item_attributes_pkey PRIMARY KEY (id),
    CONSTRAINT fk_item_attributes_order_items FOREIGN KEY (order_items_id)
        REFERENCES public.order_items (id)
);

CREATE SEQUENCE public.item_attributes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.item_attributes_id_seq OWNED BY public.item_attributes.id;

ALTER TABLE ONLY public.item_attributes ALTER COLUMN id SET DEFAULT nextval('public.item_attributes_id_seq'::regclass);



