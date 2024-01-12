package se.sharpness.hassessolskydd.api;


import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import se.sharpness.hassessolskydd.dao.OrderMapper;
import se.sharpness.hassessolskydd.model.Article;
import se.sharpness.hassessolskydd.model.Order;
import se.sharpness.hassessolskydd.model.OrderItem;
import se.sharpness.hassessolskydd.model.OrderItemsDetails;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@Slf4j
public class OrderController extends BaseApiController {

private final OrderMapper orderMapper;


    public OrderController(OrderMapper orderMapper) {
        this.orderMapper = orderMapper;
    }

   @GetMapping("/order/{orderId}")
    public Order findOrderByOrderId(@PathVariable(value = "orderId") Long orderId) throws Exception {

        final var result = orderMapper.findOrderByOrderId(orderId);
        if (result.isPresent()) {
            Order order = result.get();
            order.setOrderItems(defineArticles(orderId.intValue()));
            System.out.println(order);
            return order;
        } else {
            throw new Exception("Could not find order"); //TODO: crate specific exceptions
        }
    }

    @GetMapping("/order/all/{customerNumber}")
    public List<Order> findOrderByCustomerNumber(@PathVariable(value = "customerNumber") String customerNumber) throws Exception {

        final var result = orderMapper.findAllOrdersByCustomerNumber(customerNumber);
        if (result != null && !result.isEmpty()) {
            return result;
        } else {
            throw new Exception("Could not find orders for this Customer"); //TODO: crate specific exceptions
        }
    }

    public List<OrderItemsDetails> getOrderItemDetails(@PathVariable int orderId) {
        List<OrderItemsDetails> itemDetails = orderMapper.findOrderDetailsByOrderId(orderId);

        if (itemDetails != null && !itemDetails.isEmpty()) {
            return (itemDetails);
        } else {
            return null;
        }
    }

    public List<Article> defineArticles(int orderId) {
        List<OrderItemsDetails> itemDetails = getOrderItemDetails(orderId);
        List<Article> orderItems = new ArrayList<>();
        Map<Integer, Article> articleMap = new HashMap<>();

        for (OrderItemsDetails item : itemDetails) {
            int orderItemsId = item.getOrderItemId();

            if (!articleMap.containsKey(orderItemsId)) {
                Article newArticle = new Article();
                newArticle.setName(item.getName());
                newArticle.setAttributes(new ArrayList<>());
                newArticle.setValues(new ArrayList<>());

                orderItems.add(newArticle);
                articleMap.put(orderItemsId, newArticle);
            }

            Article currentArticle = articleMap.get(orderItemsId);
            currentArticle.getAttributes().add(item.getAttribute());
            currentArticle.getValues().add(item.getValue());
        }

        return orderItems;
    }

    @PostMapping("/order/create")
    public void createOrder(@RequestBody Order order) {
        order.setFirstContact(LocalDateTime.now());
        if (order.getMeasurementDate() != null) { //TODO: empty JSON is not null
            order.setMeasurementDate(order.getMeasurementDate());
        }
        if (order.getInstallationDate() != null) {
            order.setInstallationDate(order.getInstallationDate());
        }

        orderMapper.insertOrder(order);

        for (Article article : order.getOrderItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrderId(orderMapper.findMaxOrderId());
            orderItem.setItemId(orderMapper.findArticleIdByName(article.getName()));
            orderMapper.insertOrderItem(orderItem);
            for (int i = 0; i < article.getAttributes().size(); ++i) {
                OrderItemsDetails orderItemsDetails = new OrderItemsDetails();
                orderItemsDetails.setOrderItemId(orderMapper.findMaxOrderItemId());
                orderItemsDetails.setAttribute(article.getAttributes().get(i));
                orderItemsDetails.setValue(article.getValues().get(i));

                orderMapper.insertOrderItemDetails(orderItemsDetails);
            }
        }
    }

    @PostMapping("/order-items")
    public void insertOrderItem(@RequestBody OrderItem orderItem) {
        orderMapper.insertOrderItem(orderItem);

    }

    @GetMapping("/order-items/max-id")
    public int findMaxOrderItemId() {
        return orderMapper.findMaxOrderItemId();
    }

    @PostMapping("/order-items/details")
    public void insertOrderItemDetails(@RequestBody OrderItemsDetails orderItemsDetails) {
        orderMapper.insertOrderItemDetails(orderItemsDetails);
    }
}
