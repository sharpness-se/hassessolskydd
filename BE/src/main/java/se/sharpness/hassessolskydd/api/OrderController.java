package se.sharpness.hassessolskydd.api;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import se.sharpness.hassessolskydd.dao.OrderMapper;
import se.sharpness.hassessolskydd.model.Order;

@RestController
public class OrderController {

private final OrderMapper orderMapper;


    public OrderController(OrderMapper orderMapper) {
        this.orderMapper = orderMapper;
    }

    @GetMapping("order/{orderId}")
    public Order findOrderByOrderId(@PathVariable(value = "orderId") int orderId) throws Exception {

        final var result = orderMapper.findOrderByOrderId(orderId);
        if (result.isPresent()) {
            return result.get();
        } else {
            throw new Exception("Could not find order"); //TODO: crate specific exceptions
        }
    }

    @GetMapping("/order/all/{customerNumber}")
    public Order findOrderByCustomerNumber(@PathVariable(value = "customerNumber") String customerNumber) throws Exception {

        final var result = orderMapper.findAllOrdersByCustomerNumber(customerNumber);
        if (result.isPresent()) {
            return result.get();
        } else {
            throw new Exception("Could not find orders for this Customer"); //TODO: crate specific exceptions
        }
    }
}
