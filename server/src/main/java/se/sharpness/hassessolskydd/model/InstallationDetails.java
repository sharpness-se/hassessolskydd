package se.sharpness.hassessolskydd.model;

import lombok.Data;

@Data
public class InstallationDetails {

    private int id;
    private int orderId;
    private String mountingType;
    private String floorDetails;
    private String needLift;
    private String facadeDetails;
    private String cableLength;
    private String remoteControl;
    private String notes;

}
