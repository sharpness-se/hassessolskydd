package se.sharpness.hassessolskydd.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Customer {

    private int id;
    private String name;
    private String address;
    private String phoneNumber;
    private String email;
    private String customerNumber;
}
