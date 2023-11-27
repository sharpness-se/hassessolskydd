package se.sharpness.hassessolskydd.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import se.sharpness.hassessolskydd.model.Customer;

import java.util.Optional;

@Mapper
public interface CustomerMapper {

    @Select(
            "select * from customer where id = #{id}"
    )
    Optional<Customer> findById(int id);

    @Select(
            "select * from customer where customer_number = #{customerNumber}"
    )
    Optional<Customer> findByCustomerNumber(String customerNumber);

    @Insert("""
            insert into customer (name, address, phone_number, email, customer_number)
            values (#{name}, #{address}, #{phoneNumber}, #{email}, #{customerNumber})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    void createCustomer(Customer customer); //TODO: Should return fail/success?

}

/*
FK
@Result(property = "group", column = "groupx", one = @One(select = "se.accelerateit.signup6.dao.GroupMapper.findById"))
  @Select(
    "select * from events where id = #{id}"


installation_details

 */