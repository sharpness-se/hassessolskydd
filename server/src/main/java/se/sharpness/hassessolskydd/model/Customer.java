package se.sharpness.hassessolskydd.model;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Customer {

    private int id;

    @Pattern(regexp = "^[^\\s].*[^\\s]$")
    @NotBlank
    @Size(max = 40)
    private String firstname;

    @Pattern(regexp = "^[^\\s].*[^\\s]$")
    @NotBlank
    @Size(max = 40)
    private String lastname;

    @Pattern(regexp = "^[^\\s].*[^\\s]$")
    @NotBlank
    @Size(max = 40)
    private String address;


    @Pattern(regexp = "^\\d{3}[\\s?]\\d{2}$") //"^\\d{3}\s?\\d{2}$"
    @NotBlank
    @Size(min = 5, max = 6)
    private String postalCode;

    @Pattern(regexp = "^[^\\s].*[^\\s]$")
    @NotBlank
    @Size(max = 40)
    private String city;

    @Pattern(regexp = "^[+]?[0-9]+([-\\s][0-9]+)*$") //"^[0-9()+\\- ]*$"
    @NotBlank
    @Size(min = 8, max = 20)
    private String phoneNumber;

    @NotBlank
    @Email
    private String email;

    private String customerNumber;
}
