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
    //Photos
    private InstallationDetails installationDetails;
    private IndoorOutdoor indoorOutdoor;
    private List<Article> orderItems;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

}