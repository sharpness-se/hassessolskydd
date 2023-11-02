package se.sharpness.hassessolskydd.model;

import lombok.Data;

@Data
public class Terassmarkis {

    private int id;
    private String measuringType;
    private String model;
    private String weaveNumber;
    private String controls;
    private int length;
    private int width;
    private String facadeDetails;
    private boolean sunWindAutomation;
    private boolean shakeSensor;
    private boolean supportLegs;
    private IndoorOutdoor indoorOutdoor;
}
/*
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
 */