package se.sharpness.hassessolskydd.integrationstest.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.testcontainers.junit.jupiter.Testcontainers;
import se.sharpness.hassessolskydd.api.OrderController;
import se.sharpness.hassessolskydd.integrationstest.HassesDbTest;
import se.sharpness.hassessolskydd.model.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@Testcontainers
@SpringBootTest
@ContextConfiguration(initializers = {HassesDbTest.Initializer.class})
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
class OrderControllerTest extends HassesDbTest{

    private final OrderController orderController;

    @Test
    void findOrderByOrderId() throws Exception {

        Order order = orderController.findOrderByOrderId(-1L);
        assertEquals(-1L, order.getId());
        assertEquals("CUST001", order.getCustomerNumber());
        assertEquals("2023-11-01T00:00", order.getFirstContact().toString());
        assertEquals("2023-11-05T00:00", order.getMeasurementDate().toString());
        assertEquals("2023-11-15T00:00", order.getInstallationDate().toString());
        assertEquals("Notes for order 1", order.getNotes());
        assertEquals("INDOOR", order.getIndoorOutdoor().toString());
        assertEquals(3, order.getOrderItems().size(), "List size should be 3");
    }

    @Test
    void findOrderByCustomerNumber() throws Exception {

        List<Order> orders = orderController.findOrderByCustomerNumber("CUST002");

        assertEquals(1, orders.size(), "List size should be 1");
        assertEquals(-2L, orders.get(0).getId());
        assertNotEquals(-1L, orders.get(0).getId());
        assertEquals("OUTDOOR", orders.get(0).getIndoorOutdoor().toString());
    }

    @Test
    void getOrderItemDetails() {
        int orderId = -2;
        List<OrderItemsDetails> itemDetails = orderController.getOrderItemDetails(orderId);

        assertNotNull(itemDetails, "The returned list should not be null");
        assertEquals(2, itemDetails.size(), "The list should have elements");
        assertEquals("fönstermarkis", itemDetails.get(0).getName());
        assertEquals("height", itemDetails.get(0).getAttribute());
        assertEquals("width", itemDetails.get(1).getAttribute());
        assertEquals("1800", itemDetails.get(0).getValue());
        assertEquals("2000", itemDetails.get(1).getValue());

    }

    @Test
    void defineArticles() {
        int orderId = -1;
        List<Article> articles = orderController.defineArticles(orderId);

        assertNotNull(articles, "The returned list should not be null");
        assertTrue(articles.size() > 0, "The list should have elements");
    }

    @Test
    void createOrderSuccess() {
        Order order = new Order();
        order.setCustomerNumber("CUST001");
        order.setFirstContact(LocalDateTime.now());
        order.setMeasurementDate(LocalDateTime.now().plusDays(7));
        order.setInstallationDate(LocalDateTime.now().plusDays(14));
        order.setNotes("Some notes about the order");
        order.setIndoorOutdoor(IndoorOutdoor.INDOOR);

        List<Article> orderItems = new ArrayList<>();
        Article article1 = new Article();
        article1.setName("persienn");
        article1.setAttributes(Arrays.asList("Color", "Material"));
        article1.setValues(Arrays.asList("Red", "Wood"));

        Article article2 = new Article();
        article2.setName("fönstermarkis");
        article2.setAttributes(Arrays.asList("Color", "Material"));
        article2.setValues(Arrays.asList("Brown", "Metal"));

        orderItems.add(article1);
        orderItems.add(article2);

        order.setOrderItems(orderItems);

        Order createdOrder = orderController.createOrder(order);

        assertNotNull(createdOrder, "Created order should not be null");
        assertNotEquals(0, createdOrder.getId(), "Created order should have a valid ID");
        assertEquals("CUST001", createdOrder.getCustomerNumber(), "Customer number should match");
    }

    @Test
    void createOrderFailure() {
        Order order = new Order();
        order.setCustomerNumber("IncorrectCustomerNumber"); //This should fail the validation
        order.setFirstContact(LocalDateTime.now());
        order.setMeasurementDate(LocalDateTime.now().plusDays(7));
        order.setInstallationDate(LocalDateTime.now().plusDays(14));
        order.setNotes("Some notes about the order");
        order.setIndoorOutdoor(IndoorOutdoor.INDOOR);

        List<Article> orderItems = new ArrayList<>();
        Article article1 = new Article();
        article1.setName("persienn");
        article1.setAttributes(Arrays.asList("Color", "Material"));
        article1.setValues(Arrays.asList("Red", "Wood"));

        Article article2 = new Article();
        article2.setName("fönstermarkis");
        article2.setAttributes(Arrays.asList("Color", "Material"));
        article2.setValues(Arrays.asList("Brown", "Metal"));

        orderItems.add(article1);
        orderItems.add(article2);

        order.setOrderItems(orderItems);

        assertThrows(Exception.class, () -> orderController.createOrder(order),
                "Should throw an exception when creating an order with an invalid customer number");
    }

    @Test
    void insertOrderItem() {
        OrderItem orderItem = new OrderItem();
        orderItem.setOrderId(-2);
        orderItem.setItemId(-1);

        assertDoesNotThrow(() -> orderController.insertOrderItem(orderItem),
                "Should not throw an exception when inserting an order item");
        List<OrderItemsDetails> orderItemsDetails = orderController.getOrderItemDetails(-2);
        System.out.println(orderItemsDetails);
        assertEquals(3, orderController.getOrderItemDetails(-2).size(),
                "Should have 3 order item details after inserting an order item");
        //The list will have 3 orderItemsDetails because the @Select "LEFT JOIN public.item_attributes ia ON oi.id = ia.order_items_id" in
        //OrderMapper.getOrderItemDetails will return null for the attributes and values of the new order item
    }

    @Test
    void insertOrderItemDetails() {

        OrderItem orderItem = new OrderItem();
        orderItem.setOrderId(-3);
        orderItem.setItemId(-2);

        assertDoesNotThrow(() -> orderController.insertOrderItem(orderItem),
                "Should not throw an exception when inserting an order item");

        OrderItemsDetails orderItemsDetails = new OrderItemsDetails();
        orderItemsDetails.setOrderItemId(1);
        orderItemsDetails.setAttribute("Color");
        orderItemsDetails.setValue("Blue");

        assertDoesNotThrow(() -> orderController.insertOrderItemDetails(orderItemsDetails),
                "Should not throw an exception when inserting order item details");


        List<OrderItemsDetails> itemDetails = orderController.getOrderItemDetails(-3);
        OrderItemsDetails recievedOrderItemDetails = itemDetails.get(0);
        assertEquals("fönstermarkis", recievedOrderItemDetails.getName());
        assertEquals("Color", recievedOrderItemDetails.getAttribute());
        assertEquals("Blue", recievedOrderItemDetails.getValue());
    }
}