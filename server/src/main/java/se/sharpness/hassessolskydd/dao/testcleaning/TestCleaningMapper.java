package se.sharpness.hassessolskydd.dao.testcleaning;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;

//TODO: remove before production
@Mapper
public interface TestCleaningMapper {

    @Delete(
            "delete from customer where customer_number = #{customerNumber}"
    )
    int deleteCustomerByCustomerNumber(String customerNumber);

    @Delete(
            "delete from \"order\" where id = #{orderId}"
            //TODO: delete orderItems, orderItemsDetails, itemAttributes
    )
    int deleteOrderByOrderId(int orderId);
}
