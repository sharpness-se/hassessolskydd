package se.sharpness.hassessolskydd.api;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.*;
import se.sharpness.hassessolskydd.dao.CustomerMapper;
import se.sharpness.hassessolskydd.model.Customer;
import se.sharpness.hassessolskydd.status_messages.StatusMessage;
import se.sharpness.hassessolskydd.status_messages.errors.CustomerNotFoundException;
import se.sharpness.hassessolskydd.status_messages.errors.ResourceConflictException;
import se.sharpness.hassessolskydd.status_messages.errors.VeryStrangeException;
import se.sharpness.hassessolskydd.util.CustomerNumberGenerator;

import java.util.List;
import java.util.Optional;

@RestController
@ControllerAdvice
public class CustomerController extends BaseApiController {

    private final CustomerMapper customerMapper;

    public CustomerController(CustomerMapper customerMapper) {
        this.customerMapper = customerMapper;
    }

    @GetMapping("/customers")
    public List<Customer> findAll() {
        return customerMapper.findAll();
    }

    @GetMapping("/customers/customerId/{id}") //TODO: Remove in production
    public Customer findCustomerById(@PathVariable(value = "id") int id) throws StatusMessage {

        final var result = customerMapper.findById(id);
        if (result.isPresent()) {
            return result.get();
        } else {
            throw new CustomerNotFoundException(String.valueOf(id));
        }
    }

    @GetMapping("/customer/{customerNumber}")
    public Customer findCustomerByCustomerNumber(@PathVariable(value = "customerNumber") String customerNumber) throws StatusMessage {

    final var result = customerMapper.findByCustomerNumber(customerNumber);
        if (result.isPresent()) {
            return result.get();
        } else {
            throw new CustomerNotFoundException(customerNumber);
        }
    }

    @ExceptionHandler(ResourceConflictException.class)
    @PostMapping("/customer/create_customer")
    public Customer addCustomer(@RequestBody @Valid Customer customer) {
        customer.setCustomerNumber(CustomerNumberGenerator.createCustomerNumber(customer));
        var result = customerMapper.findByCustomerNumber(customer.getCustomerNumber());
        if (result.isEmpty()) {
            customerMapper.createCustomer(customer);
            return customerMapper.findByCustomerNumber(customer.getCustomerNumber()).orElseThrow(VeryStrangeException::new);
        } else {
            throw new ResourceConflictException(customer.getCustomerNumber());
        }
    }

    @PutMapping("/customer/update/{customerNumber}") //TODO: If customer name is changed should customerNumber be changed? Should this be transactional?
    public Customer updateCustomer(@PathVariable(value = "customerNumber") String customerNumber, @RequestBody @Valid Customer customer) throws StatusMessage {

        Optional<Customer> existingCustomerOptional = customerMapper.findByCustomerNumber(customerNumber);
        if (existingCustomerOptional.isPresent()) {
            Customer existingCustomer = existingCustomerOptional.get();

            existingCustomer.setFirstname(customer.getFirstname());
            existingCustomer.setLastname(customer.getLastname());
            existingCustomer.setAddress(customer.getAddress());
            existingCustomer.setPostalCode(customer.getPostalCode());
            existingCustomer.setCity(customer.getCity());
            existingCustomer.setPhoneNumber(customer.getPhoneNumber());
            existingCustomer.setEmail(customer.getEmail());

            customerMapper.updateCustomer(existingCustomer);

            return existingCustomer;
        } else {
            throw new CustomerNotFoundException(customerNumber);
        }
    }

    @GetMapping("/customer/search/{searchTerm}")
    public List<Customer> findCustomersByTerm(@PathVariable(value = "searchTerm") String searchTerm) throws StatusMessage {
        List<Customer> result = customerMapper.findByTerm(searchTerm);
        if (!result.isEmpty()) {
            return result;
        } else {
            throw new CustomerNotFoundException(searchTerm);
        }
    }
}
