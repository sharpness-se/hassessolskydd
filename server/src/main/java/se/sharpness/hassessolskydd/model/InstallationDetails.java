package se.sharpness.hassessolskydd.model;

import lombok.Data;

@Data
public class InstallationDetails {

    private Long id;
    private boolean isNormal;
    private String facadeDetails;
    private String floorDetails;
    private Long cableLength;
    private boolean remoteControl;
    private boolean needLift;
}
