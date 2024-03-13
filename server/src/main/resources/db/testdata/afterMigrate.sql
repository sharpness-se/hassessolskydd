-- Insert sample data into the "public.userx" table
INSERT INTO public.userx (id, name, password, active)
VALUES
    (-1, 'John Doe', 'password123', true),
    (-2, 'Alice Smith', 'securepass', true),
    (-3, 'Bob Johnson', 'pass123', false) ON CONFLICT DO NOTHING;

-- Insert sample data into the "public.customer" table
INSERT INTO public.customer (id, firstname, lastname, address, postal_code, city, phone_number, email, customer_number)
VALUES
    (-1, 'Customer 1', 'Lastname 1', '123 Main St', '111 11', 'Stockholm', '555-123-4567', 'customer1@example.com', 'CUST001'),
    (-2, 'Customer 2', 'Lastname 2', '456 Elm St', '222 22', 'Skåne', '555-987-6543', 'customer2@example.com', 'CUST002'),
    (-3, 'Palle', 'Kuling', 'Fazers väg 10', '111 22', 'Stockholm', '08-123 45 67', 'pallekuling@fazer.se', 'pallekuling0812345678'),
    (-4, 'Samuel', 'Vimes', 'Cable Street', '666 66', 'Ankh-Morpork', '080-800 800', 'samuelvimes@citywatch.nu', 'samuelvimes080800800'),
    (-5, 'Arthur', 'Dent', 'All ends St.42', '042 42', 'Cottington', '042 - 42 00 42', 'arthurdent@improbable.com', 'arthurdent042420042'),
    (-6, 'Erik', 'Andersson', 'Sveavägen 123', '111 22', 'Stockholm', '0701234567', 'erik.andersson@example.com', 'ErikAndersson0701234567'),
    (-7, 'Anna', 'Bengtsson', 'Storgatan 45', '222 33', 'Gothenburg', '0739876543', 'anna.bengtsson@example.com', 'AnnaBengtsson0739876543'),
    (-8, 'Lars', 'Carlsson', 'Skogsvägen 7', '333 44', 'Malmö', '0768765432', 'lars.carlsson@example.com', 'LarsCarlsson0768765432'),
    (-9, 'Sofia', 'Dahlström', 'Kungsgatan 12', '444 55', 'Uppsala', '0701122334', 'sofia.dahlstrom@example.com', 'SofiaDahlström0701122334'),
    (-10, 'Anders', 'Eriksson', 'Gatuvägen 99', '555 66', 'Linköping', '0723456789', 'anders.eriksson@example.com', 'AndersEriksson0723456789'),
    (-11, 'Maria', 'Fransson', 'Strandvägen 8', '666 77', 'Örebro', '0765555555', 'maria.fransson@example.com', 'MariaFransson0765555555'),
    (-12, 'Johan', 'Gustavsson', 'Lindhagensgatan 3', '777 88', 'Gävle', '0728765432', 'johan.gustavsson@example.com', 'JohanGustavsson0728765432'),
    (-13, 'Lina', 'Hansson', 'Rosenvägen 20', '888 99', 'Västerås', '0709876543', 'lina.hansson@example.com', 'LinaHansson0709876543'),
    (-14, 'David', 'Isaksson', 'Högvägen 15', '999 00', 'Norrköping', '0731122334', 'david.isaksson@example.com', 'DavidIsaksson0731122334'),
    (-15, 'Emma', 'Johansson', 'Bergsgatan 2', '101 11', 'Umeå', '0723456789', 'emma.johansson@example.com', 'EmmaJohansson0723456789'),
    (-16, 'Oskar', 'Karlsson', 'Skolvägen 14', '111 12', 'Helsingborg', '0765555555', 'oskar.karlsson@example.com', 'OskarKarlsson0765555555'),
    (-17, 'Linnea', 'Larsson', 'Birger Jarlsgatan 9', '121 13', 'Jönköping', '0728765432', 'linnea.larsson@example.com', 'LinneaLarsson0728765432'),
    (-18, 'Niklas', 'Månsson', 'Kyrkogatan 6', '131 14', 'Lund', '0709876543', 'niklas.mansson@example.com', 'NiklasMånsson0709876543'),
    (-19, 'Elin', 'Nilsson', 'Storgatan 1', '141 15', 'Växjö', '0731122334', 'elin.nilsson@example.com', 'ElinNilsson0731122334'),
    (-20, 'Peter', 'Olofsson', 'Drottninggatan 5', '151 16', 'Karlstad', '0723456789', 'peter.olofsson@example.com', 'PeterOlofsson0723456789') ON CONFLICT DO NOTHING;

-- Insert sample data into the "public.installation_details" table
INSERT INTO public.installation_details (id, order_id, is_normal, facade_details, floor_details, cable_length, remote_control, lift_needed)
VALUES
    (-1, -1, 'true', 'Brick facade', '1st floor', '30', 'true', 'false'),
    (-2, -2, 'false', 'Wooden facade', '2nd floor', '40', 'false', 'true') ON CONFLICT DO NOTHING;

-- Insert sample data into the "public.order" table
INSERT INTO public.order (id, customer_number, first_contact, measurement_date, installation_date, notes, installation_details, indooroutdoor)
VALUES
    (-1, 'CUST001', '2023-11-01', '2023-11-05', '2023-11-15', 'Notes for order 1', null, 'INDOOR'),
    (-2, 'CUST002', '2023-11-02', '2023-11-06', '2023-11-16', 'Notes for order 2', null, 'OUTDOOR'),
    (-3, 'CUST001', '2023-05-05', '2023-06-06', '2023-07-07', 'Notes for order 3', null, 'OUTDOOR'),
    (-4, 'pallekuling0812345678', '2024-01-01', '2024-01-18', '2024-02-01', 'Notes for Palles first order', null, 'INDOOR') ON CONFLICT DO NOTHING;

INSERT INTO public.articles (id, name)
VALUES
    (-1, 'persienn'),
    (-2, 'fönstermarkis'),
    (-3, 'pilsegardin'),
    (-4, 'plisségardin'),
    (-5, 'rullgardin'),
    (-6, 'lamellgardin'),
    (-7, 'terrassmarkis')
     ON CONFLICT DO NOTHING;

INSERT INTO public.order_items (id, order_id, item_id)
VALUES
    (-1, -1, -1),
    (-2, -2, -2),
    (-3, -1, -1),
    (-4, -1, -2) ON CONFLICT DO NOTHING;

INSERT INTO public.item_attributes (id, order_items_id, attribute, value)
VALUES
    (-1, -1, 'width', '1200'),
    (-2, -1, 'height', '1500'),
    (-3, -1, 'colour', 'white'),
    (-4, -2, 'width', '2000'),
    (-5, -2, 'height', '1800'),
    (-6, -3, 'width', '1200'),
    (-7, -3, 'height', '1500'),
    (-8, -3, 'colour', 'pink'),
    (-9, -4, 'markisfärg', 'rosa'),
    (-10, -4, 'bredd', '2000'),
    (-11, -4, 'höjd', '1800') ON CONFLICT DO NOTHING;