package se.sharpness.hassessolskydd.dao;

import org.apache.ibatis.annotations.*;
import se.sharpness.hassessolskydd.model.Order;
import se.sharpness.hassessolskydd.model.OrderItem;
import se.sharpness.hassessolskydd.model.OrderItemsDetails;
import se.sharpness.hassessolskydd.model.Alternate_Order;
import se.sharpness.hassessolskydd.model.Cart;
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

    @Select("SELECT * FROM public.order")
    List<Order> findAllOrders();

    @Select("SELECT\n" +
    "    orderid,\n" +
    "    JSONB_AGG(cart_item) AS cart\n" +
    "FROM (\n" +
    "    SELECT\n" +
    "        orderid,\n" +
    "        JSONB_BUILD_OBJECT(\n" +
    "            'cart_item_id', orderitemid,\n" +
    "            'cart_item_type', name,\n" +
    "            'item_attributes', JSONB_OBJECT_AGG(attribute, value)\n" +
    "        ) AS cart_item\n" +
    "    FROM (\n" +
    "        SELECT\n" +
    "            o.id as orderId,\n" +
    "            oi.id as orderItemId,\n" +
    "            a.name,\n" +
    "            ia.attribute,\n" +
    "            ia.value\n" +
    "        FROM public.order o\n" +
    "        JOIN public.order_items oi ON o.id = oi.order_id\n" +
    "        JOIN public.articles a ON oi.item_id = a.id\n" +
    "        LEFT JOIN public.item_attributes ia ON oi.id = ia.order_items_id\n" +
    "    ) AS subTable\n" +
    "    WHERE orderid = #{orderId}\n" +  // Added condition to filter by orderId
    "    GROUP BY orderid, orderitemid, name\n" +
    ") AS cart_items_grouped\n" +
    "GROUP BY orderid;")
Cart findCart(@Param("orderId") int orderId);

    @Select("SELECT * FROM public.order")
    List<Alternate_Order> AlternatefindAllOrders();

    @Select("select id from public.articles where name = #{name}")
    int findArticleIdByName(String name);

    @Select(
        "SELECT o.id as orderId, " +
        "oi.id as orderItemId, " +
        "a.name, " +
        "ia.attribute, " +
        "ia.value " +
        "FROM public.order o " +
        "JOIN public.order_items oi ON o.id = oi.order_id " +
        "JOIN public.articles a ON oi.item_id = a.id " +
        "LEFT JOIN public.item_attributes ia ON oi.id = ia.order_items_id "
        )


        List<OrderItemsDetails> getMyOrders();
    
    @Select( //This insert has to be @Select because we need to return the id of the inserted row
            "INSERT INTO \"order\"" +
            "(customer_number, first_contact, measurement_date, installation_date, notes, installation_details, indoorOutdoor) " +
            "VALUES" +
            "(#{customerNumber}, #{firstContact}, #{measurementDate}, #{installationDate}, #{notes}, #{installationDetails.id}, #{indoorOutdoor})" +
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

}
