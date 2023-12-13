package se.sharpness.hassessolskydd.integrationstest.customer;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import se.sharpness.hassessolskydd.model.Customer;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class CustomerTest {

  private static final ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
  private static final Validator validator = factory.getValidator();

  @Test
  void validCustomer() {
    Customer customer = createValidCustomer();
    Set<ConstraintViolation<Customer>> violations = validator.validate(customer);
    assertTrue(violations.isEmpty(), "Validation should pass");
  }

  @ParameterizedTest
  @ValueSource(strings = {"John", "Alice", "Bob"})
  void validFirstname(String validFirstname) {
    Customer customer = createValidCustomer();
    customer.setFirstname(validFirstname);
    Set<ConstraintViolation<Customer>> violations = validator.validateProperty(customer, "firstname");
    assertTrue(violations.isEmpty(), "Validation should pass for valid firstname: " + validFirstname);
  }

  @ParameterizedTest
  @ValueSource(strings = {"John123", "123John", "John!"})
  void invalidFirstname(String invalidFirstname) {
    Customer customer = createValidCustomer();
    customer.setFirstname(invalidFirstname);
    Set<ConstraintViolation<Customer>> violations = validator.validateProperty(customer, "firstname");
    assertFalse(violations.isEmpty(), "Validation should fail for invalid firstname: " + invalidFirstname);
  }

  @ParameterizedTest
  @ValueSource(strings = {"Doe", "Smith", "Johnson"})
  void validLastname(String validLastname) {
    Customer customer = createValidCustomer();
    customer.setLastname(validLastname);
    Set<ConstraintViolation<Customer>> violations = validator.validateProperty(customer, "lastname");
    assertTrue(violations.isEmpty(), "Validation should pass for valid lastname: " + validLastname);
  }

  @ParameterizedTest
  @ValueSource(strings = {"Doe123", "123Doe", "Doe!"})
  void invalidLastname(String invalidLastname) {
    Customer customer = createValidCustomer();
    customer.setLastname(invalidLastname);
    Set<ConstraintViolation<Customer>> violations = validator.validateProperty(customer, "lastname");
    assertFalse(violations.isEmpty(), "Validation should fail for invalid lastname: " + invalidLastname);
  }

  private Customer createValidCustomer() {
    Customer customer = new Customer();
    customer.setFirstname("John");
    customer.setLastname("Doe");
    customer.setAddress("123 Main St");
    customer.setPostalCode("12345");
    customer.setCity("Cityville");
    customer.setPhoneNumber("1234567890");
    customer.setEmail("john.doe@example.com");
    customer.setCustomerNumber("C12345");
    return customer;
  }


}