package se.sharpness.hassessolskydd.integrationstest.dao;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.testcontainers.junit.jupiter.Testcontainers;
import se.sharpness.hassessolskydd.dao.CustomerMapper;
import se.sharpness.hassessolskydd.integrationstest.HassesDbTest;
import se.sharpness.hassessolskydd.model.Customer;
import se.sharpness.hassessolskydd.util.CustomerNumberGenerator;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@Testcontainers
@SpringBootTest
@ContextConfiguration(initializers = { HassesDbTest.Initializer.class })
public class CustomerMapperTest extends HassesDbTest {

  private final CustomerMapper customerMapper;
  @Autowired
  CustomerMapperTest(CustomerMapper customerMapper) {
    this.customerMapper = customerMapper;
  }

  @Test
  void findAllCustomers() {
    List<Customer> customerList = customerMapper.findAll();
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

    assertNotEquals(-1, customerList.get(1).getId());
    assertNotNull(customerList.get(1).getFirstname());
    assertEquals("Lastname 2", customerList.get(1).getLastname());
    assertEquals("456 Elm St", customerList.get(1).getAddress());
    assertEquals("222 22", customerList.get(1).getPostalCode());
    assertEquals("Skåne", customerList.get(1).getCity());
    assertEquals("555-987-6543", customerList.get(1).getPhoneNumber());
    assertEquals("customer2@example.com", customerList.get(1).getEmail());
    assertNotEquals("CUST001", customerList.get(1).getCustomerNumber());
  }

  @Test
  void findById() {
    Optional<Customer> dbResponse = customerMapper.findById(-2);
    assertTrue(dbResponse.isPresent());
    Customer customer = dbResponse.get();

    assertEquals("Customer 2", customer.getFirstname());
    assertEquals("Lastname 2", customer.getLastname());
    assertEquals("456 Elm St", customer.getAddress());
    assertEquals("222 22", customer.getPostalCode());
    assertEquals("Skåne", customer.getCity());
    assertEquals("555-987-6543", customer.getPhoneNumber());
    assertEquals("customer2@example.com", customer.getEmail());
    assertEquals("CUST002", customer.getCustomerNumber());
  }

  @Test
  void findByCustomerNumber() {
    Optional<Customer> dbResponse = customerMapper.findByCustomerNumber("CUST001");
    assertTrue(dbResponse.isPresent());
    Customer customer = dbResponse.get();

    assertEquals(-1, customer.getId());
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
  void createCustomer(){
    Customer customer = new Customer();
    customer.setFirstname("Test");
    customer.setLastname("Testname");
    customer.setAddress("Address 1234");
    customer.setPostalCode("555 22");
    customer.setCity("Uppsala");
    customer.setPhoneNumber("+123321123");
    customer.setEmail("email@mail.com");
    customer.setCustomerNumber(CustomerNumberGenerator.createCustomerNumber(customer));

    customerMapper.createCustomer(customer);

    Optional<Customer> dbResponse = customerMapper.findByCustomerNumber("TestTestname+123321123");
    assertTrue(dbResponse.isPresent());
    Customer createdCustomer = dbResponse.get();
    assertEquals("Test", createdCustomer.getFirstname());
    assertEquals("Testname", createdCustomer.getLastname());
    assertEquals("Address 1234", createdCustomer.getAddress());
    assertEquals("555 22", createdCustomer.getPostalCode());
    assertEquals("Uppsala", createdCustomer.getCity());
    assertEquals("+123321123", createdCustomer.getPhoneNumber());
    assertEquals("email@mail.com", createdCustomer.getEmail());
    assertEquals("TestTestname+123321123", createdCustomer.getCustomerNumber());
  }

  @Test
  void findNoCustomerById() {
    Optional<Customer> dbResponse = customerMapper.findById(-9999);
    assertTrue(dbResponse.isEmpty(), "No customer found");
  }

  @Test
  void findByTerm() {
    String searchTerm = "Eri";
    List<Customer> dbResponse = customerMapper.findByTerm(searchTerm);
    assertFalse(dbResponse.isEmpty());
    assertEquals(2, dbResponse.size());

    searchTerm = "a";
    dbResponse = customerMapper.findByTerm(searchTerm);
    log.info("dbResponse: {}", dbResponse.toString());
    assertFalse(dbResponse.isEmpty());
    assertEquals(19, dbResponse.size());
  }

}
