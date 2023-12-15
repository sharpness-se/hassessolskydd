package se.sharpness.hassessolskydd.integrationstest.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.testcontainers.junit.jupiter.Testcontainers;
import se.sharpness.hassessolskydd.api.CustomerController;
import se.sharpness.hassessolskydd.dao.CustomerMapper;
import se.sharpness.hassessolskydd.integrationstest.HassesDbTest;
import se.sharpness.hassessolskydd.model.Customer;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@Testcontainers
@SpringBootTest
@ContextConfiguration(initializers = {HassesDbTest.Initializer.class})
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class CustomerControllerTest extends HassesDbTest {

  private final CustomerController customerController;
  private final CustomerMapper customerMapper;

  @Test
  void findAllCustomers() {
    List<Customer> customerList = customerController.findAll();

    assertEquals(20, customerList.size());

    assertEquals(-1, customerList.get(0).getId());
    assertEquals("Customer 1", customerList.get(0).getFirstname());
    assertEquals("Lastname 1", customerList.get(0).getLastname());
    assertEquals("123 Main St", customerList.get(0).getAddress());
    assertEquals("111 11", customerList.get(0).getPostalCode());
    assertEquals("Stockholm", customerList.get(0).getCity());
    assertEquals("555-123-4567", customerList.get(0).getPhoneNumber());
    assertEquals("customer1@example.com", customerList.get(0).getEmail());
    assertEquals("CUST001", customerList.get(0).getCustomerNumber());

    assertEquals(-2, customerList.get(1).getId());
    assertEquals("Customer 2",customerList.get(1).getFirstname());
    assertEquals("Lastname 2", customerList.get(1).getLastname());
    assertEquals("456 Elm St", customerList.get(1).getAddress());
    assertEquals("222 22", customerList.get(1).getPostalCode());
    assertEquals("Skåne", customerList.get(1).getCity());
    assertEquals("555-987-6543", customerList.get(1).getPhoneNumber());
    assertEquals("customer2@example.com", customerList.get(1).getEmail());
    assertEquals("CUST002", customerList.get(1).getCustomerNumber());
  }

  @Test
  void findById() throws Exception {
    Customer customer = customerController.findCustomerById(-1);

    assertEquals("Customer 1", customer.getFirstname());
    assertEquals("Lastname 1", customer.getLastname());
    assertEquals("123 Main St", customer.getAddress());
    assertEquals("111 11", customer.getPostalCode());
    assertEquals("Stockholm", customer.getCity());
    assertEquals("555-123-4567", customer.getPhoneNumber());
    assertEquals("customer1@example.com", customer.getEmail());
    assertEquals("CUST001", customer.getCustomerNumber());
  }

  @Test
  void findByCustomerNumber() throws Exception {
    Customer customer = customerController.findCustomerByCustomerNumber("CUST002");

    assertEquals(-2, customer.getId());
    assertEquals("Customer 2",customer.getFirstname());
    assertEquals("Lastname 2",customer.getLastname());
    assertEquals("456 Elm St", customer.getAddress());
    assertEquals("222 22", customer.getPostalCode());
    assertEquals("Skåne", customer.getCity());
    assertEquals("555-987-6543", customer.getPhoneNumber());
    assertEquals("customer2@example.com", customer.getEmail());
    assertEquals("CUST002", customer.getCustomerNumber());
  }

  @Test
  void addCustomer() {
    Customer customer = new Customer();
    customer.setFirstname("Test");
    customer.setLastname("Lastname");
    customer.setAddress("Address 9876");
    customer.setPostalCode("777 66");
    customer.setCity("Uppsala");
    customer.setPhoneNumber("+987654321");
    customer.setEmail("mail@email.com");

    customerController.addCustomer(customer);

    Optional<Customer> dbResponse = customerMapper.findByCustomerNumber("TestLastname+987654321");
    assertTrue(dbResponse.isPresent());
    Customer createdCustomer = dbResponse.get();
    assertEquals("Test", createdCustomer.getFirstname());
    assertEquals("Lastname", createdCustomer.getLastname());
    assertEquals("Address 9876", createdCustomer.getAddress());
    assertEquals("777 66", createdCustomer.getPostalCode());
    assertEquals("Uppsala", createdCustomer.getCity());
    assertEquals("+987654321", createdCustomer.getPhoneNumber());
    assertEquals("mail@email.com", createdCustomer.getEmail());
    assertEquals("TestLastname+987654321", createdCustomer.getCustomerNumber());
  }

  @Test
  void findByTerm() {
    List<Customer> customerList = customerController.findCustomersByTerm("Eri");
    log.info("Response: {}", customerList.toString());
    assertFalse(customerList.isEmpty());
    assertEquals(2, customerList.size());

    customerList = customerController.findCustomersByTerm("a");
    log.info("Response: {}", customerList.toString());
    assertFalse(customerList.isEmpty());
    assertEquals(19, customerList.size());

    customerList = customerController.findCustomersByTerm("up");
    log.info("Response: {}", customerList.toString());
    assertFalse(customerList.isEmpty());
    assertEquals(1, customerList.size());

    customerList = customerController.findCustomersByTerm("Joh");
    log.info("Response: {}", customerList.toString());
    assertFalse(customerList.isEmpty());
    assertEquals(2, customerList.size());

    customerList = customerController.findCustomersByTerm("helsing");
    log.info("Response: {}", customerList.toString());
    assertFalse(customerList.isEmpty());
    assertEquals(1, customerList.size());

    customerList = customerController.findCustomersByTerm("555");
    log.info("Response: {}", customerList.toString());
    assertFalse(customerList.isEmpty());
    assertEquals(4, customerList.size());
  }
}
