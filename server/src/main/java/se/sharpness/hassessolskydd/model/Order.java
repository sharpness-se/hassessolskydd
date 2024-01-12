package se.sharpness.hassessolskydd.model;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class Order {

    private Long id;
    private String customerNumber;
    private LocalDateTime firstContact;
    private LocalDateTime measurementDate;
    private LocalDateTime installationDate;
    private String notes;
    //Photos
    private InstallationDetails installationDetails;
    private IndoorOutdoor indoorOutdoor;
    private List<Article> orderItems;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}