package se.sharpness.hassessolskydd.model;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Customer {

    private int id;

    @Pattern(regexp = "^[a-öA-Ö]*$")
    @NotBlank
    @Size(max = 20)
    private String firstname;

    @Pattern(regexp = "^[a-öA-Ö]*$")
    @NotBlank
    @Size(max = 20)
    private String lastname;

    @Pattern(regexp = "^[a-öA-Ö0-9 ]*$")
    @NotBlank
    @Size(max = 20)
    private String address;

    @Pattern(regexp = "^[0-9 ]*$")
    @NotBlank
    @Size(min = 5, max = 6)
    private String postalCode;

    @Pattern(regexp = "^[a-öA-Ö0-9 ]*$")
    @NotBlank
    @Size(max = 20)
    private String city;

    @Pattern(regexp = "^[0-9+]*$")
    @NotBlank
    @Size(max = 12)
    private String phoneNumber;

    @NotBlank
    @Email
    private String email;

    private String customerNumber;
}
