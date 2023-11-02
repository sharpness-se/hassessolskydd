package se.sharpness.hassessolskydd.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Select;
import se.sharpness.hassessolskydd.model.Customer;

import java.util.Optional;

@Mapper
public interface CustomerMapper {

    @Select(
            "select * from customers where id = #{id}"
    )
    Optional<Customer> findById(Long id);

    @Select(
            "select * from customers where customerId = #{customerId}"
    )
    Optional<Customer> findByCustomerNumber(String customerNumber);

}

/*
FK
@Result(property = "group", column = "groupx", one = @One(select = "se.accelerateit.signup6.dao.GroupMapper.findById"))
  @Select(
    "select * from events where id = #{id}"


installation_details

 */