package se.sharpness.hassessolskydd.api;


import org.springframework.web.bind.annotation.*;
import se.sharpness.hassessolskydd.dao.CustomerMapper;
import se.sharpness.hassessolskydd.model.Customer;

@RestController
public class CustomerController extends BaseApiController {

    private final CustomerMapper customerMapper;

    public CustomerController(CustomerMapper customerMapper) {
        this.customerMapper = customerMapper;
    }

    @GetMapping("/customers")
    public Iterable<Customer> findAll() {
        return customerMapper.findAll();
    }

    @GetMapping("/customers/customerId/{id}")
    public Customer findCustomerById(@PathVariable(value = "id") int id) throws Exception {

        final var result = customerMapper.findById(id);
        if (result.isPresent()) {
            return result.get();
        } else {
            throw new Exception("Could not find user"); //TODO: crate specific exceptions
        }
    }

    @GetMapping("/customers/customerNumber/{customerNumber}")
    public Customer findCustomerByCustomerNumber(@PathVariable(value = "customerNumber") String customerNumber) throws Exception {

    final var result = customerMapper.findByCustomerNumber(customerNumber);
        if (result.isPresent()) {
            return result.get();
        } else {
            throw new Exception("Could not find user"); //TODO: crate specific exceptions
        }
    }

    @PostMapping("/customers/create_customer")
    public Customer addCustomer(@RequestBody Customer customer) {
        customerMapper.createCustomer(customer);
        var result = customerMapper.findByCustomerNumber(customer.getCustomerNumber());
        if (result.isPresent()) {
            return result.get();
        } else {
            throw new RuntimeException("Could not create user"); //TODO: crate specific exceptions
        }
    }

}
