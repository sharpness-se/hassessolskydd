package se.sharpness.hassessolskydd.util;

import org.junit.jupiter.api.Test;
import se.sharpness.hassessolskydd.model.Customer;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CustomerNumberGeneratorTest {

  @Test
  void createCustomerNumberTest() {
    Customer testCustomerOne = new Customer();
    testCustomerOne.setFirstname("Hasse");
    testCustomerOne.setLastname("Backe");
    testCustomerOne.setPhoneNumber("+46628754974");

    Customer testCustomerTwo = new Customer();
    testCustomerTwo.setFirstname("Basse");
    testCustomerTwo.setLastname("Hacke");
    testCustomerTwo.setPhoneNumber("+46517643863");

    Customer testCustomerThree = new Customer();
    testCustomerThree.setFirstname("Gagge");
    testCustomerThree.setLastname("Bagge");
    testCustomerThree.setPhoneNumber("+46406532752");

    assertEquals("HasseBacke+46628754974", CustomerNumberGenerator.createCustomerNumber(testCustomerOne));
    assertEquals("BasseHacke+46517643863", CustomerNumberGenerator.createCustomerNumber(testCustomerTwo));
    assertEquals("GaggeBagge+46406532752", CustomerNumberGenerator.createCustomerNumber(testCustomerThree));

  }


}
