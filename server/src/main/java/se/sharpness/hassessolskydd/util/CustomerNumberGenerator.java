package se.sharpness.hassessolskydd.util;

import org.springframework.stereotype.Service;
import se.sharpness.hassessolskydd.model.Customer;

@Service
public class CustomerNumberGenerator {

    static public String createCustomerNumber(Customer customer) {
        return customer.getFirstname()+customer.getLastname()+customer.getPhoneNumber().replaceAll("\\s+", "");
    }
}
