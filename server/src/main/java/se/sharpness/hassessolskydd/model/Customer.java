package se.sharpness.hassessolskydd.model;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Customer {

    private int id;

    @Pattern(regexp = "^\\p{L}*$")
    @NotBlank
    @Size(max = 40)
    private String firstname;

    @Pattern(regexp = "^\\p{L}*$")
    @NotBlank
    @Size(max = 40)
    private String lastname;

    @Pattern(regexp = "^[\\p{L}0-9- ]*$")
    @NotBlank
    @Size(max = 40)
    private String address;

    @Pattern(regexp = "^[0-9 ]*$")
    @NotBlank
    @Size(min = 5, max = 6)
    private String postalCode;

    @Pattern(regexp = "^[\\p{L}0-9-]*$")
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
