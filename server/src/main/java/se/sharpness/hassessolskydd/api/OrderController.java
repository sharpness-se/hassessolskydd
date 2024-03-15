package se.sharpness.hassessolskydd.api;


import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import se.sharpness.hassessolskydd.dao.CustomerMapper;
import se.sharpness.hassessolskydd.dao.InstallationDetailsMapper;
import se.sharpness.hassessolskydd.dao.OrderMapper;
import se.sharpness.hassessolskydd.dao.PhotoMapper;
import se.sharpness.hassessolskydd.model.*;
import se.sharpness.hassessolskydd.model.Product;
import se.sharpness.hassessolskydd.model.DTO.OrderItemDetailsDTO;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@Slf4j
public class OrderController extends BaseApiController {

private final OrderMapper orderMapper;
private final CustomerMapper customerMapper;
private final InstallationDetailsMapper installationDetailsMapper;
private final PhotoMapper photoMapper;


    public OrderController(OrderMapper orderMapper, CustomerMapper customerMapper, InstallationDetailsMapper installationDetailsMapper, PhotoMapper photoMapper) {
        this.orderMapper = orderMapper;
        this.customerMapper = customerMapper;
        this.installationDetailsMapper = installationDetailsMapper;
        this.photoMapper = photoMapper;
    }

    @GetMapping("/order/{orderId}")
    public Order findOrderByOrderId(@PathVariable(value = "orderId") int orderId) throws Exception {

        final var result = orderMapper.findOrderByOrderId(orderId);
        if (result.isPresent()) {
            Order order = result.get();
            order.setOrderItems(defineProducts(orderId));
            order.setInstallationDetails(installationDetailsMapper.findInstallationDetailsByOrderId(orderId).orElse(null));
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
                order.setOrderItems(defineProducts(orderId));
                order.setInstallationDetails(installationDetailsMapper.findInstallationDetailsByOrderId(orderId).orElse(null));
            }
            return result;
        } else {
            throw new Exception("Could not find orders for this Customer");
        }
    }

    @GetMapping("/order/all")
    public List<OrderAndCustomer> findAllOrders() throws Exception {
        List<Order> Orders = orderMapper.findAllOrders();
        List<OrderAndCustomer> orderAndCustomers = new ArrayList<>();
        for (Order order : Orders) {
            int orderId = order.getId();
            orderAndCustomers.add(findOrderWithCustomerByOrderId(orderId));
            //order.setInstallationDetails(installationDetailsMapper.findInstallationDetailsByOrderId(orderId).orElse(null));
        }
        return orderAndCustomers;
    }

    @GetMapping("/order/withcustomer/{orderId}")
    public OrderAndCustomer findOrderWithCustomerByOrderId(@PathVariable(value = "orderId") int orderId) throws Exception {

        final var result = orderMapper.findOrderByOrderId(orderId);

        if (result.isPresent()) {
            OrderAndCustomer orderAndCustomer = new OrderAndCustomer();
            //
            Order order = result.get();
            order.setInstallationDetails(installationDetailsMapper.findInstallationDetailsByOrderId(orderId).orElse(null));

            orderAndCustomer.setOrder(order);
            //orderAndCustomer.setOrder(result.get());

            var customerNumber = result.get().getCustomerNumber();

            final var customerResult = customerMapper.findByCustomerNumber(customerNumber);
            if (customerResult.isPresent()) {
                orderAndCustomer.setCustomer(customerResult.get());
            } else {
                throw new Exception("Could not find customer");
            }

            orderAndCustomer.getOrder().setOrderItems(defineProducts(orderId));
            return orderAndCustomer;
        } else {
            throw new Exception("Could not find order"); //TODO: crate specific exceptions
        }
    }

    public List<OrderItemDetails> getOrderItemDetails(@PathVariable int orderId) {
        List<OrderItemDetails> itemDetails = orderMapper.findOrderDetailsByOrderId(orderId);

        if (itemDetails != null && !itemDetails.isEmpty()) {
            return (itemDetails);
        } else {
            return null;
        }
    }


    public List<Product> defineProducts(int orderId) {
        List<OrderItemDetails> itemDetails = getOrderItemDetails(orderId);

        if (itemDetails == null) {
            return null;
        }

        List<Product> orderItems = new ArrayList<>();
        Map<Integer, Product> productMap = new HashMap<>();

        for (OrderItemDetails item : itemDetails) {
            if (item != null) {
                int orderItemId = item.getOrderItemId();

                if (!productMap.containsKey(orderItemId)) {
                    Product newProduct = new Product();
                    newProduct.setName(item.getName());
                    newProduct.setProductDetails(new ArrayList<>()); // Initialize list of OrderItemDetails
                    orderItems.add(newProduct);
                    productMap.put(orderItemId, newProduct);
                }

                Product currentProduct = productMap.get(orderItemId);
                OrderItemDetailsDTO dto = new OrderItemDetailsDTO();
                dto.setAttribute(item.getAttribute());
                dto.setValue(item.getValue());
                currentProduct.getProductDetails().add(dto); // Add the OrderItemDetails directly to the Product
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

        InstallationDetails installationDetails = order.getInstallationDetails();
        if (installationDetails != null) {
            installationDetails.setOrderId(newOrderId);
            installationDetailsMapper.insertInstallationDetails(installationDetails);
        }

        order.setInstallationDetails(installationDetails);

        return defineOrder(newOrderId, order, order);
    }

    @PostMapping("/order-items")
    public void insertOrderItem(@RequestBody OrderItem orderItem) {
        orderMapper.insertOrderItem(orderItem);
    }

    @PostMapping("/order-items/details")
    public void insertOrderItemDetails(@RequestBody OrderItemDetails orderItemDetails) {
        orderMapper.insertOrderItemDetails(orderItemDetails);
    }

    @PutMapping("/order/update/{orderId}")
    @Transactional
    public Order updateOrder(@PathVariable(value = "orderId") int orderId, @RequestBody Order order) throws Exception {

        Optional<Order> existingOrderOptional = orderMapper.findOrderByOrderId(orderId);
        if (existingOrderOptional.isPresent()) {
            Order existingOrder = existingOrderOptional.get();
            existingOrder.setCustomerNumber(order.getCustomerNumber());
            existingOrder.setMeasurementDate(order.getMeasurementDate());
            existingOrder.setInstallationDate(order.getInstallationDate());
            existingOrder.setNotes(order.getNotes());
            existingOrder.setIndoorOutdoor(order.getIndoorOutdoor());
            orderMapper.updateOrder(existingOrder);

            InstallationDetails installationDetails = order.getInstallationDetails();
            if (installationDetails != null) {
                installationDetails.setOrderId(orderId);
                installationDetailsMapper.updateInstallationDetails(installationDetails);
            }

            existingOrder.setInstallationDetails(installationDetails);

            // Delete existing order_item attributes and order_items
            List<Integer> orderItemId = orderMapper.findOrderItemIdByOrderId(orderId);
            for (int id : orderItemId) {
                orderMapper.deleteOrderItemDetailsByOrderItemId(id);
            }
            orderMapper.deleteOrderItemByOrderId(orderId);



            // Insert updated order items
            existingOrder.setOrderItems(order.getOrderItems());
            return defineOrder(orderId, order, existingOrder);
        } else {
            throw new Exception("Could not find order");
        }
    }

    private Order defineOrder(@PathVariable("orderId") int orderId, @RequestBody Order order, Order existingOrder) {
        for (Product product : order.getOrderItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrderId(orderId);
            orderItem.setItemId(orderMapper.findProductIdByName(product.getName()));
            int newOrderItemId = orderMapper.insertOrderItem(orderItem);
            for (int i = 0; i < product.getProductDetails().size(); ++i) {
                OrderItemDetails orderItemDetails = new OrderItemDetails();
                orderItemDetails.setOrderItemId(newOrderItemId);
                orderItemDetails.setAttribute(product.getProductDetails().get(i).getAttribute());
                orderItemDetails.setValue(product.getProductDetails().get(i).getValue());
                orderMapper.insertOrderItemDetails(orderItemDetails);
            }
        }

        existingOrder.setPhotos(getPhotos(orderId));

        return existingOrder;
    }

    private List<String> getPhotos(int orderId) {
        return photoMapper.getPhotosByOrderId(orderId);
    }
}
