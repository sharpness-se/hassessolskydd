package se.sharpness.hassessolskydd.integrationstest.customer;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.Test;
import se.sharpness.hassessolskydd.model.Customer;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class CustomerTest {

  private static final ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
  private static final Validator validator = factory.getValidator();

  @Test
  void validCustomer() {
    Customer customer = new Customer();
    customer.setFirstname("John");
    customer.setLastname("Doe");
    customer.setAddress("123 Main St");
    customer.setPostalCode("12345");
    customer.setCity("Cityville");
    customer.setPhoneNumber("1234567890");
    customer.setEmail("john.doe@example.com");
    customer.setCustomerNumber("C12345");

    Set<ConstraintViolation<Customer>> violations = validator.validate(customer);

    assertTrue(violations.isEmpty(), "Validation should pass");
  }

  @Test
  void validFirstname() {
    Customer customer = new Customer();
    customer.setFirstname("John");

    customer.setLastname("Doe");
    customer.setAddress("123 Main St");
    customer.setPostalCode("12345");
    customer.setCity("Cityville");
    customer.setPhoneNumber("1234567890");
    customer.setEmail("john.doe@example.com");
    customer.setCustomerNumber("C12345");

    Set<ConstraintViolation<Customer>> violations = validator.validateProperty(customer, "firstname");

    assertTrue(violations.isEmpty(), "Validation should pass for valid firstname");
  }

  @Test
  void invalidFirstname() {
    Customer customer = new Customer();

    customer.setFirstname("John123");

    customer.setLastname("Doe");
    customer.setAddress("123 Main St");
    customer.setPostalCode("12345");
    customer.setCity("Cityville");
    customer.setPhoneNumber("1234567890");
    customer.setEmail("john.doe@example.com");
    customer.setCustomerNumber("C12345");

    Set<ConstraintViolation<Customer>> violations = validator.validateProperty(customer, "firstname");

    assertFalse(violations.isEmpty(), "Validation should fail for invalid firstname");
  }

  @Test
  void validLastname() {
    Customer customer = new Customer();
    customer.setLastname("Doe");

    customer.setFirstname("John");
    customer.setAddress("123 Main St");
    customer.setPostalCode("12345");
    customer.setCity("Cityville");
    customer.setPhoneNumber("1234567890");
    customer.setEmail("john.doe@example.com");
    customer.setCustomerNumber("C12345");

    Set<ConstraintViolation<Customer>> violations = validator.validateProperty(customer, "lastname");

    assertTrue(violations.isEmpty(), "Validation should pass for valid lastname");
  }

  @Test
  void invalidLastname() {
    Customer customer = new Customer();

    customer.setLastname("Doe123");

    customer.setFirstname("John");
    customer.setAddress("123 Main St");
    customer.setPostalCode("12345");
    customer.setCity("Cityville");
    customer.setPhoneNumber("1234567890");
    customer.setEmail("john.doe@example.com");
    customer.setCustomerNumber("C12345");

    Set<ConstraintViolation<Customer>> violations = validator.validateProperty(customer, "lastname");

    assertFalse(violations.isEmpty(), "Validation should fail for invalid lastname");
  }


}