package se.sharpness.hassessolskydd.api;


import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
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
            return order;
        } else {
            throw new Exception("Could not find order"); //TODO: crate specific exceptions
        }
    }


    @GetMapping("/order/all/{customerNumber}")
    public List<Order> findOrderByCustomerNumber(@PathVariable(value = "customerNumber") String customerNumber) throws Exception {

        final var result = orderMapper.findAllOrdersByCustomerNumber(customerNumber);
        if (result != null && !result.isEmpty()) {
            for (Order order : result) {
                int orderId = order.getId();
                order.setOrderItems(defineArticles(orderId));
            }
            return result;
        } else {
            throw new Exception("Could not find orders for this Customer");
        }
    }

    @GetMapping("/order/all")
    public List<Order> findAllOrders() {
        List<Order> Orders = orderMapper.findAllOrders();
        for (Order order : Orders) {
            int orderId = order.getId();
            List<Article> articles = defineArticles(orderId);
            if (articles != null) {
                order.setOrderItems(articles);
            }
        }
        return Orders;
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

        if (itemDetails == null) {
            return null;
        }

        List<Article> orderItems = new ArrayList<>();
        Map<Integer, Article> articleMap = new HashMap<>();

        for (OrderItemsDetails item : itemDetails) {
            if (item != null) { // Add a null check for each item
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
        }
        return orderItems;
    }

    @PostMapping("/order/create")
    @Transactional
    public Order createOrder(@RequestBody Order order) {
        order.setFirstContact(LocalDateTime.now());
        if (order.getMeasurementDate() != null) { //TODO: empty JSON is not null
            order.setMeasurementDate(order.getMeasurementDate());
        }
        if (order.getInstallationDate() != null) {
            order.setInstallationDate(order.getInstallationDate());
        }

        int newOrderId = orderMapper.insertOrder(order);
        order.setId(newOrderId);

        for (Article article : order.getOrderItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrderId(newOrderId);
            orderItem.setItemId(orderMapper.findArticleIdByName(article.getName()));
            int newOrderItemId = orderMapper.insertOrderItem(orderItem);
            for (int i = 0; i < article.getAttributes().size(); ++i) {
                OrderItemsDetails orderItemsDetails = new OrderItemsDetails();
                orderItemsDetails.setOrderItemId(newOrderItemId);
                orderItemsDetails.setAttribute(article.getAttributes().get(i));
                orderItemsDetails.setValue(article.getValues().get(i));

                orderMapper.insertOrderItemDetails(orderItemsDetails);
            }
        }
        return order;
    }

    @PostMapping("/order-items")
    public void insertOrderItem(@RequestBody OrderItem orderItem) {
        orderMapper.insertOrderItem(orderItem);

    }

    @PostMapping("/order-items/details")
    public void insertOrderItemDetails(@RequestBody OrderItemsDetails orderItemsDetails) {
        orderMapper.insertOrderItemDetails(orderItemsDetails);
    }
}
