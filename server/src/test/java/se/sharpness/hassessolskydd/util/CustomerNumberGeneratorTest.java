package se.sharpness.hassessolskydd.util;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import se.sharpness.hassessolskydd.model.Customer;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class CustomerNumberGeneratorTest {

    @Test
    public void testCreateCustomerNumber() {
        Customer customer = new Customer();
        customer.setFirstname("John");
        customer.setLastname("Doe");
        customer.setPhoneNumber("0701234567");
        String customerNumber = CustomerNumberGenerator.createCustomerNumber(customer);
        assertEquals("JohnDoe0701234567", customerNumber);
    }
}
