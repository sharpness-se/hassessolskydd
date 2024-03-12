ALTER TABLE public.installation_details
    ALTER COLUMN is_normal SET DATA TYPE character varying(255),
    ALTER COLUMN cable_length SET DATA TYPE character varying(255),
    ALTER COLUMN remote_control SET DATA TYPE character varying(255),
    ALTER COLUMN lift_needed SET DATA TYPE character varying(255);