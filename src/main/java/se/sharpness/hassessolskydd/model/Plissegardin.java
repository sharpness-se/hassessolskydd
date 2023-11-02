package se.sharpness.hassessolskydd.model;

import lombok.Data;

@Data
public class Plissegardin {

    private Long id;
    private String measureType;
    private int width;
    private int height;
    private String weaveNumber;
    private String model;
    private String mounting;
    private boolean allmogebeslag;
    private String controls;
    private String controlSide;
    private String drawStringColour;
    private String cassetteColour;
    private IndoorOutdoor indoorOutdoor;
    private boolean isExternalOrder;

}

/*
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
 */