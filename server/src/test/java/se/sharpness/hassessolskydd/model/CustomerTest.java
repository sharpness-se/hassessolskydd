package se.sharpness.hassessolskydd.model;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullSource;
import org.junit.jupiter.params.provider.ValueSource;

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
  @ValueSource(strings = {"John", "Alice", "Bob", "Mañuel", "Hélène", "Per-Åke", "Per Åke", "Hèlén-Øsé"})
  void validFirstname(String validFirstname) {
    Customer customer = createValidCustomer();
    customer.setFirstname(validFirstname);
    Set<ConstraintViolation<Customer>> violations = validator.validateProperty(customer, "firstname");
    assertTrue(violations.isEmpty(), "Validation should pass for valid firstname: " + validFirstname);
  }

  @ParameterizedTest
  @ValueSource(strings = {" John", "  John", "\tJohn", "John ", "John  ", "John\t", " ", ""})
  @NullSource
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
  @ValueSource(strings = {"Doe ", " Doe", "Doe\t", "\tDoe", "", " "})
  @NullSource
  void invalidLastname(String invalidLastname) {
    Customer customer = createValidCustomer();
    customer.setLastname(invalidLastname);
    Set<ConstraintViolation<Customer>> violations = validator.validateProperty(customer, "lastname");
    assertFalse(violations.isEmpty(), "Validation should fail for invalid lastname: " + invalidLastname);
  }

  @ParameterizedTest
  @ValueSource(strings = {"123 45", "456 12"})
  void postalCodeTest(String postalcode) {
    Customer customer = createValidCustomer();
    customer.setPostalCode(postalcode);
    Set<ConstraintViolation<Customer>> violations = validator.validateProperty(customer, "postalCode");
    assertTrue(violations.isEmpty(), "Validation should succeed for valid postalcode: " + postalcode);
  }

  @ParameterizedTest
  @ValueSource(strings = {"12345 ", " 456 12", "1234 5","1 2345", "", "12345", "12 345"})
  @NullSource
  void invalidPostalCodeTest(String postalcode) {
    Customer customer = createValidCustomer();
    customer.setPostalCode(postalcode);
    Set<ConstraintViolation<Customer>> violations = validator.validateProperty(customer, "postalCode");
    assertFalse(violations.isEmpty(), "Validation should fail for invalid postalcode: " + postalcode);
  }

  @ParameterizedTest
  @ValueSource(strings = {"123 Máiñ St", "Àpt 45, 789 Èlm St", "45 Oäk Aveñue"})
  void validAddress(String validAddress) {
    Customer customer = createValidCustomer();
    customer.setAddress(validAddress);
    Set<ConstraintViolation<Customer>> violations = validator.validateProperty(customer, "address");
    assertTrue(violations.isEmpty(), "Validation should pass for valid address: " + validAddress);
  }

  @ParameterizedTest
  @ValueSource(strings = {" 123 Main St", "123 Main St ", "123 Main St\t", "\t123 Main St", "", " ", "\t", "   "})
  @NullSource
  void invalidAddress(String invalidAddress) {
    Customer customer = createValidCustomer();
    customer.setAddress(invalidAddress);
    Set<ConstraintViolation<Customer>> violations = validator.validateProperty(customer, "address");
    assertFalse(violations.isEmpty(), "Validation should fail for invalid address: " + invalidAddress);
  }

  @ParameterizedTest
  @ValueSource(strings = {"Årsta", "Métrópolis", "Small-town", "Smaller towñ", "Märsta"})
  void validCity(String validCity) {
    Customer customer = createValidCustomer();
    customer.setCity(validCity);
    Set<ConstraintViolation<Customer>> violations = validator.validateProperty(customer, "city");
    assertTrue(violations.isEmpty(), "Validation should pass for valid city: " + validCity);
  }

  @ParameterizedTest
  @ValueSource(strings = {" Årsta", "Métrópolis ", "Small-town\t", "\tSmaller towñ", "", " ", "\t", "   "})
  @NullSource
  void invalidCity(String invalidCity) {
    Customer customer = createValidCustomer();
    customer.setCity(invalidCity);
    Set<ConstraintViolation<Customer>> violations = validator.validateProperty(customer, "city");
    assertFalse(violations.isEmpty(), "Validation should fail for invalid city: " + invalidCity);
  }

  @ParameterizedTest
  @ValueSource(strings = {"073-123 45 67", "071 234 567 89", "+4671 234-56 78", "071 23 45 67 89", "+4671-23 45 678"})
  void validPhoneNumber(String validPhoneNumber) {
    Customer customer = createValidCustomer();
    customer.setPhoneNumber(validPhoneNumber);
    Set<ConstraintViolation<Customer>> violations = validator.validateProperty(customer, "phoneNumber");
    assertTrue(violations.isEmpty(), "Validation should pass for valid phone number: " + validPhoneNumber);
  }

  @ParameterizedTest
  @ValueSource(strings = {" 123456789", "12345678 ", "123", "1234567", "\t12 34 56 78 90","12 34 56 78 90\t","", " ", "\t", "   "})
  @NullSource
  void invalidPhoneNumber(String invalidPhoneNumber) {
    Customer customer = createValidCustomer();
    customer.setPhoneNumber(invalidPhoneNumber);
    Set<ConstraintViolation<Customer>> violations = validator.validateProperty(customer, "phoneNumber");
    assertFalse(violations.isEmpty(), "Validation should fail for invalid phone number: " + invalidPhoneNumber);
  }

  private Customer createValidCustomer() {
    Customer customer = new Customer();
    customer.setFirstname("John");
    customer.setLastname("Doe");
    customer.setAddress("123 Main St");
    customer.setPostalCode("123 45");
    customer.setCity("Cityville");
    customer.setPhoneNumber("1234567890");
    customer.setEmail("john.doe@example.com");
    customer.setCustomerNumber("C12345");
    return customer;
  }


}