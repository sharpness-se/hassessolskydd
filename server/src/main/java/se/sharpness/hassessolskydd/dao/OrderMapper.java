package se.sharpness.hassessolskydd.dao;

import org.apache.ibatis.annotations.*;
import se.sharpness.hassessolskydd.model.Order;
import se.sharpness.hassessolskydd.model.OrderItem;
import se.sharpness.hassessolskydd.model.OrderItemsDetails;

import java.util.List;
import java.util.Optional;

@Mapper
public interface OrderMapper {

    @Select(
      "select * from \"order\" where id = #{id}"
    )
    Optional<Order> findOrderByOrderId(Long id);

    @Select("select * from \"order\" where customer_number = #{customerNumber}")
    List<Order> findAllOrdersByCustomerNumber(String customerNumber);
    //In controller just call this method and then call the method below to get the order items details

    @Select(
            "SELECT o.id as orderId, " +
            "oi.id as orderItemId, " +
            "a.name, " +
            "ia.attribute, " +
            "ia.value " +
            "FROM public.order o " +
            "JOIN public.order_items oi ON o.id = oi.order_id " +
            "JOIN public.articles a ON oi.item_id = a.id " +
            "LEFT JOIN public.item_attributes ia ON oi.id = ia.order_items_id " +
            "WHERE o.id = #{orderId}"
    )
    List<OrderItemsDetails> findOrderDetailsByOrderId(int orderId);

    @Select("select id from public.articles where name = #{name}")
    int findArticleIdByName(String name);


    @Select( //This insert has to be @Select because we need to return the id of the inserted row
            "INSERT INTO \"order\"" +
            "(customer_number, first_contact, measurement_date, installation_date, notes, indoorOutdoor) " +
            "VALUES" +
            "(#{customerNumber}, #{firstContact}, #{measurementDate}, #{installationDate}, #{notes}, #{indoorOutdoor})" +
            "RETURNING id"
    )
    int insertOrder(Order order);


    @Select( //This insert has to be @Select because we need to return the id of the inserted row
            "INSERT INTO \"order_items\" (order_id, item_id) VALUES (#{orderId}, #{itemId})" +
            "RETURNING id"
    )
    int insertOrderItem(OrderItem orderItem);


    @Insert(
            "INSERT INTO public.item_attributes (order_items_id, attribute, value) VALUES (#{orderItemId}, #{attribute}, #{value})"
    )
    void insertOrderItemDetails(OrderItemsDetails orderItemsDetails);






    /*@Results(value = {
            @Result(property = "customerNumber", column = "customer_number"),
            @Result(property = "products", column = "products", many = @Many (select = "se.sharpness.hassessolskydd.dao.ProductsMapper.findProductsByOrderId"))
    }) */
    //Optional<Order> findAllOrdersByCustomerNumber(String customerNumber);
    //Where should we do the specific order search? In the controller or in the mapper?

}
