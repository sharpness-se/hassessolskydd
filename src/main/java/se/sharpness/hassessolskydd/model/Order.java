package se.sharpness.hassessolskydd.model;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class Order {

    private Long id;
    private Long customerId;
    private LocalDateTime firstContact;
    private LocalDateTime measurementDate;
    private LocalDateTime installationDate;
    private String notes;
    //Photos
    private InstallationDetails installationDetails;
    private List<Long> productId;
    private IndoorOutdoor productType;

}