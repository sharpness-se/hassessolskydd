-- Insert sample data into the "public.userx" table
INSERT INTO public.userx (id, name, password, active)
VALUES
    (-1, 'John Doe', 'password123', true),
    (-2, 'Alice Smith', 'securepass', true),
    (-3, 'Bob Johnson', 'pass123', false) ON CONFLICT DO NOTHING;

-- Insert sample data into the "public.customer" table
INSERT INTO public.customer (id, name, address, phone_number, email, customer_number)
VALUES
    (-1, 'Customer 1', '123 Main St', '555-123-4567', 'customer1@example.com', 'CUST001'),
    (-2, 'Customer 2', '456 Elm St', '555-987-6543', 'customer2@example.com', 'CUST002') ON CONFLICT DO NOTHING;

-- Insert sample data into the "public.installation_details" table
INSERT INTO public.installation_details (id, order_id, is_normal, facade_details, floor_details, cable_length, remote_control, lift_needed)
VALUES
    (-1, 1, true, 'Brick facade', '1st floor', 30, true, false),
    (-2, 2, false, 'Wooden facade', '2nd floor', 40, false, true) ON CONFLICT DO NOTHING;

-- Insert sample data into the "public.products" table
INSERT INTO public.products (id, plissegardin, terassmarkis)
VALUES
    (-1, 1, 0),
    (-2, 0, 1) ON CONFLICT DO NOTHING;

-- Insert sample data into the "public.order" table
INSERT INTO public.order (id, customer_number, first_contact, measurement_date, installation_date, notes, products, installation_details)
VALUES
    (-1, 1, '2023-11-01', '2023-11-05', '2023-11-15', 'Notes for order 1', 1, 1),
    (-2, 2, '2023-11-02', '2023-11-06', '2023-11-16', 'Notes for order 2', 2, 2) ON CONFLICT DO NOTHING;

-- Insert sample data into the "public.plissegardin" table
INSERT INTO public.plissegardin (id, order_id, measure_type, width, height, weave_number, model, mounting, allmogebeslag, controls, control_side, draw_string_colour, cassette_colour, indoor_outdoor, is_external_order)
VALUES
    (-1, 1, 'Inside Mount', 120, 150, 'Weave 1', 'Model A', 'Ceiling', false, 'Manual', 'Left', 'White', 'Silver', true, false),
    (-2, 2, 'Outside Mount', 200, 180, 'Weave 2', 'Model B', 'Wall', true, 'Motorized', 'Right', 'Black', 'Black', false, true) ON CONFLICT DO NOTHING;

-- Insert sample data into the "public.terassmarkis" table
INSERT INTO public.terassmarkis (id, order_id, measuring_type, model, weave_number, controls, length, width, facade_details, sun_wind_automation, shake_sensor, support_legs, indoor_outdoor)
VALUES
    (-1, 1, 'Outside Mount', 'Model X', 'Weave 3', 'Motorized', 300, 250, 'Brick facade', true, false, true, false),
    (-2, 2, 'Inside Mount', 'Model Y', 'Weave 4', 'Manual', 400, 300, 'Wooden facade', false, true, false, true) ON CONFLICT DO NOTHING;
