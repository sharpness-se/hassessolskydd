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

    @GetMapping("/customers/customerId/{id}")
    public Customer findCustomerById(@PathVariable(value = "id") int id) throws StatusMessage {

        final var result = customerMapper.findById(id);
        if (result.isPresent()) {
            return result.get();
        } else {
            throw new CustomerNotFoundException(String.valueOf(id));
        }
    }

    @GetMapping("/customers/customerNumber/{customerNumber}")
    public Customer findCustomerByCustomerNumber(@PathVariable(value = "customerNumber") String customerNumber) throws StatusMessage {

    final var result = customerMapper.findByCustomerNumber(customerNumber);
        if (result.isPresent()) {
            return result.get();
        } else {
            throw new CustomerNotFoundException(customerNumber);
        }
    }

    @ExceptionHandler(ResourceConflictException.class)
    @PostMapping("/customers/create_customer")
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

    @GetMapping("/customers/search/{searchTerm}")
    public Customer findCustomerByTerm(@PathVariable(value = "searchTerm") String searchTerm) throws StatusMessage {
        final var result = customerMapper.findByTerm(searchTerm);
        if (result.isPresent()) {
            return result.get();
        } else {
            throw new CustomerNotFoundException(searchTerm);
        }
    }
}
