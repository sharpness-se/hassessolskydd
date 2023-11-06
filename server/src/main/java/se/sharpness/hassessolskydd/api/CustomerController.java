package se.sharpness.hassessolskydd.api;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import se.sharpness.hassessolskydd.dao.CustomerMapper;
import se.sharpness.hassessolskydd.model.Customer;

@RestController
public class CustomerController extends BaseApiController {

    private final CustomerMapper customerMapper;

    public CustomerController(CustomerMapper customerMapper) {
        this.customerMapper = customerMapper;
    }

    @GetMapping("/customer/{customerNumber}")
    public Customer findCustomerByCustomerNumber(@PathVariable(value = "customerNumber") String customerNumber) throws Exception {

    final var result = customerMapper.findByCustomerNumber(customerNumber);
        if (result.isPresent()) {
            return result.get();
        } else {
            throw new Exception("Could not find user"); //TODO: crate specific exceptions
        }
    }

}
