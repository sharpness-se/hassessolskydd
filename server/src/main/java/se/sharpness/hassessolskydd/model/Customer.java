package se.sharpness.hassessolskydd.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Customer {

    private int id;
    private String firstname;
    private String lastname;
    private String address;
    private String postalCode;
    private String city;
    private String phoneNumber;
    private String email;
    private String customerNumber;
}
