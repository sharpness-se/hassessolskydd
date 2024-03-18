package se.sharpness.hassessolskydd.model;

import lombok.Data;

@Data
public class InstallationDetails {

    private int id;
    private int orderId;
    private String mountingType;
    private String floorDetails;
    private String liftNeeded;
    private String facadeDetails;
    private String cableLength;
    private String remoteControl;
    private String notes;

}
