package se.sharpness.hassessolskydd.dao.testcleaning;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;

//TODO: remove before production
@Mapper
public interface TestCleaningMapper {

    @Delete(
            "delete from customer where customer_number = #{customerNumber}"
    )
    void deleteCustomerByCustomerNumber(String customerNumber);
}
