package se.sharpness.hassessolskydd.integrationstest.dao;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.testcontainers.junit.jupiter.Testcontainers;
import se.sharpness.hassessolskydd.dao.OrderMapper;
import se.sharpness.hassessolskydd.integrationstest.HassesDbTest;
import se.sharpness.hassessolskydd.model.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@Testcontainers
@SpringBootTest
@ContextConfiguration(initializers = { HassesDbTest.Initializer.class })
class OrderMapperTest extends HassesDbTest {

    private final OrderMapper orderMapper;

    @Autowired
    OrderMapperTest(OrderMapper orderMapper) {
        this.orderMapper = orderMapper;
    }

    @Test
    void findOrderByOrderId() {
        Optional<Order> order = orderMapper.findOrderByOrderId(-1);
        assertTrue(order.isPresent());
        assertEquals(-1L, order.get().getId());
    }

    @Test
    void findAllOrdersByCustomerNumber() {
        List<Order> orders = orderMapper.findAllOrdersByCustomerNumber("CUST001");
        assertFalse(orders.isEmpty());
    }

    @Test
    void findOrderDetailsByOrderId() {
        List<OrderItemDetails> orderItemDetailsList = orderMapper.findOrderDetailsByOrderId(-1);
        assertFalse(orderItemDetailsList.isEmpty());
    }

    @Test
    void findProductIdByName() {
        int productId = orderMapper.findProductIdByName("persienn");
        assertEquals(-1L, productId);
    }

    @Test
    void insertOrder() {
        Order order = new Order();
        order.setCustomerNumber("CUST001");
        order.setFirstContact(LocalDateTime.now());
        order.setMeasurementDate(LocalDateTime.now().plusDays(7));
        order.setInstallationDate(LocalDateTime.now().plusDays(14));
        order.setNotes("Some notes about the order");
        order.setIndoorOutdoor(IndoorOutdoor.INDOOR);
        order.setOrderStatus(OrderStatus.INQUIRY);


        int orderId = orderMapper.insertOrder(order);
        assertNotEquals(0, orderId);
    }

    @Test
    void insertOrderItem() {
        OrderItem orderItem = new OrderItem();
        orderItem.setOrderId(-1);
        orderItem.setItemId(-1);

        int orderItemId = orderMapper.insertOrderItem(orderItem);
        assertNotEquals(0, orderItemId);

    }

    @Test
    void insertOrderItemDetails() {
        OrderItemDetails orderItemDetails = new OrderItemDetails();
        orderItemDetails.setOrderItemId(-1);
        orderItemDetails.setName("plissegardin");
        orderItemDetails.setAttribute("Color");
        orderItemDetails.setValue("Red");

        assertDoesNotThrow(() -> orderMapper.insertOrderItemDetails(orderItemDetails));
    }

    @Test
    void updateOrder() {
        Optional<Order> optionalOrder = orderMapper.findOrderByOrderId(-4);
        assertTrue(optionalOrder.isPresent());
        Order existingOrder = optionalOrder.get();

        existingOrder.setMeasurementDate(LocalDateTime.of(2024, 3, 15, 10, 0));
        existingOrder.setInstallationDate(LocalDateTime.of(2024, 3, 25, 14, 30));
        existingOrder.setNotes("Updated notes notes notes");
        existingOrder.setIndoorOutdoor(IndoorOutdoor.OUTDOOR);
        existingOrder.setOrderStatus(OrderStatus.COMPLETED);

        orderMapper.updateOrder(existingOrder);

        Optional<Order> updatedOptionalOrder = orderMapper.findOrderByOrderId(existingOrder.getId());
        assertTrue(updatedOptionalOrder.isPresent());
        Order updatedOrder = updatedOptionalOrder.get();

        assertEquals(existingOrder.getMeasurementDate(), updatedOrder.getMeasurementDate());
        assertEquals(existingOrder.getInstallationDate(), updatedOrder.getInstallationDate());
        assertEquals("Updated notes notes notes", updatedOrder.getNotes());
        assertEquals(IndoorOutdoor.OUTDOOR, updatedOrder.getIndoorOutdoor());
        assertEquals(OrderStatus.COMPLETED, updatedOrder.getOrderStatus());
    }

}