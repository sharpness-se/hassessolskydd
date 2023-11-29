package se.sharpness.hassessolskydd.api.testcleaning;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import se.sharpness.hassessolskydd.dao.CustomerMapper;
import se.sharpness.hassessolskydd.dao.testcleaning.TestCleaningMapper;
import se.sharpness.hassessolskydd.model.Customer;

@RestController
public class TestCleaningController {

    private final TestCleaningMapper testCleaningMapper;
    private final CustomerMapper customerMapper;

    public TestCleaningController(TestCleaningMapper testCleaningMapper, CustomerMapper customerMapper) {
        this.testCleaningMapper = testCleaningMapper;
        this.customerMapper = customerMapper;
    }

    @PostMapping("/api/deleteCustomerByCustomerNumber/{customerNumber}")
    public Customer deleteCustomerById(@PathVariable(value = "customerNumber") String customerNumber) throws Exception {
        testCleaningMapper.deleteCustomerByCustomerNumber(customerNumber);
        final var result = customerMapper.findByCustomerNumber(customerNumber);
        if (result.isPresent()) {
            return result.get();
        } else {
            throw new Exception("Could not find user"); //TODO: crate specific exceptions
        }
    }

}

