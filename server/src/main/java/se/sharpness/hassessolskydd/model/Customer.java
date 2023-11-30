package se.sharpness.hassessolskydd.model;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Customer {

    private int id;

    @NotBlank
    @Size(max = 20)
    private String firstname;

    @NotBlank
    @Size(max = 20)
    private String lastname;

    @NotBlank
    @Size(max = 20)
    private String address;

    @NotBlank
    @Size(max = 5)
    private String postalCode;

    @NotBlank
    @Size(max = 20)
    private String city;

    @NotBlank
    @Size(max = 12)
    private String phoneNumber;

    @NotBlank
    @Email
    private String email;
    private String customerNumber;
}
