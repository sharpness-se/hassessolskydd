package se.sharpness.hassessolskydd.dao;

import org.apache.ibatis.annotations.*;
import org.springframework.web.bind.annotation.GetMapping;
import se.sharpness.hassessolskydd.model.Order;
import se.sharpness.hassessolskydd.model.OrderItem;
import se.sharpness.hassessolskydd.model.OrderItemDetails;

import java.util.List;
import java.util.Optional;

@Mapper
public interface OrderMapper {

    @Select(
      "select * from \"order\" where id = #{id}"
    )
    Optional<Order> findOrderByOrderId(int id);

    @Select("select * from \"order\" where customer_number = #{customerNumber}")
    List<Order> findAllOrdersByCustomerNumber(String customerNumber);
    //In controller just call this method and then call the method below to get the order items details

    @Select(
            "SELECT o.id as orderId, " +
            "oi.id as orderItemId, " +
            "p.name, " +
            "ia.attribute, " +
            "ia.value " +
            "FROM public.order o " +
            "JOIN public.order_item oi ON o.id = oi.order_id " +
            "JOIN public.product p ON oi.item_id = p.id " +
            "LEFT JOIN public.item_attributes ia ON oi.id = ia.order_item_id " +
            "WHERE o.id = #{orderId}"
    )
    List<OrderItemDetails> findOrderDetailsByOrderId(int orderId);

    @Select("SELECT * FROM public.order")
    List<Order> findAllOrders();

    @Select("select id from public.product where name = #{name}")
    int findProductIdByName(String name);


    @Select( //This insert has to be @Select because we need to return the id of the inserted row
            "INSERT INTO \"order\"" +
            "(customer_number, first_contact, measurement_date, installation_date, notes, indoorOutdoor, order_status) " +
            "VALUES" +
            "(#{customerNumber}, #{firstContact}, #{measurementDate}, #{installationDate}, #{notes}, #{indoorOutdoor}, #{orderStatus})" +
            "RETURNING id"
    )
    int insertOrder(Order order);



    @Select( //This insert has to be @Select because we need to return the id of the inserted row
            "INSERT INTO \"order_item\" (order_id, item_id) VALUES (#{orderId}, #{itemId})" +
            "RETURNING id"
    )
    int insertOrderItem(OrderItem orderItem);


    @Insert(
            "INSERT INTO public.item_attributes (order_item_id, attribute, value) VALUES (#{orderItemId}, #{attribute}, #{value})"
    )
    int insertOrderItemDetails(OrderItemDetails orderItemDetails);

    @Update(
            "UPDATE public.order " +
            "SET " +
            "customer_number = #{customerNumber}, " +
            "measurement_date = #{measurementDate}, " +
            "installation_date = #{installationDate}, " +
            "notes = #{notes}, " +
            "indoorOutdoor = #{indoorOutdoor}, " +
            "order_status = #{orderStatus} " +
            "WHERE id = #{id}"
    )
    void updateOrder(Order existingOrder);

    @Select("SELECT id FROM public.order_item WHERE order_id = #{orderId}")
    List<Integer> findOrderItemIdByOrderId(int orderId);

    @Delete("DELETE FROM public.order_item WHERE order_id = #{orderId}")
    void deleteOrderItemByOrderId(int orderId);

    @Delete(("DELETE FROM public.item_attributes WHERE order_item_id = #{orderItemId}"))
    void deleteOrderItemDetailsByOrderItemId(int orderItemId);
}
