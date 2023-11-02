package se.sharpness.hassessolskydd.dao;

import org.apache.ibatis.annotations.*;
import se.sharpness.hassessolskydd.model.Order;

import java.util.List;
import java.util.Optional;

@Mapper
public interface OrderMapper {

    @Select(
            "select * from orders where customer_number = #{id}"
    )
    @Results(value = {
            @Result(property = "id", column = "customer_number"),
            @Result(property = "products", column = "products", many = @Many (select = "se.sharpness.hassessolskydd.dao.ProductsMapper.findProductsByOrderId"))
    })
    Optional<Order> findAllOrdersByCustomerNumber(Long id);

    //Where should we do the specific order search? In the controller or in the mapper?

}

/*
@Mapper
public interface OrderMapper {

    @Select("SELECT * FROM Orders WHERE id = #{id}")
    @Results(value = {
        @Result(property = "id", column = "id"),
        @Result(property = "products", column = "id", javaType = List.class, many = @Many(select = "findProductsByOrderId"))
    })
    Order findOrderById(Long id);



    // ... Additional methods for other product types
}

@Result(property = "group", column = "groupx", one = @One(select = "se.accelerateit.signup6.dao.GroupMapper.findById"))
  @Select(
    "select * from events where id = #{id}"


private Long id;
    private Long customerId;
    private LocalDateTime firstContact;
    private LocalDateTime measurementDate;
    private LocalDateTime installationDate;
    private String notes;
    //Photos
    private InstallationDetails installationDetails;
    private List<Long> productId;
    private IndoorOutdoor indoorOutdoor;
 */