package se.sharpness.hassessolskydd.model;

import lombok.Data;

@Data
public class Customer {

    private Long id;
    private String name;
    private String address;
    private String phoneNumber;
    private String email;
    private String customerId;
}
