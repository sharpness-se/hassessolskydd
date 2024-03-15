package se.sharpness.hassessolskydd.model;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class Order {

    private int id;
    private String customerNumber;
    private LocalDateTime firstContact;
    private LocalDateTime measurementDate;
    private LocalDateTime installationDate;
    private String notes;
    private List<String> photos;
    private InstallationDetails installationDetails;
    private IndoorOutdoor indoorOutdoor;
    private OrderStatus orderStatus;
    private List<Product> orderItems;

}