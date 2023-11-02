package se.sharpness.hassessolskydd.dao;

import org.apache.ibatis.annotations.Select;
import se.sharpness.hassessolskydd.model.Plissegardin;
import se.sharpness.hassessolskydd.model.Product;
import se.sharpness.hassessolskydd.model.Terassmarkis;

import java.util.ArrayList;
import java.util.List;

public interface ProductsMapper {

    default List<Product> findProductsByOrderId(Long orderId) {
        List<Product> products = new ArrayList<>();
        products.addAll(findPlissegardinByOrderId(orderId));
        products.addAll(findTerassmarkisByOrderId(orderId));
        return products;
    }

    @Select(
            "select * from products where order_id = #{id}"
    )
    List<Plissegardin> findPlissegardinByOrderId(Long id);

    @Select(
            "select * from products where order_id = #{id}"
    )
    List<Terassmarkis> findTerassmarkisByOrderId(Long id);
}

/*
default List<Product> findProductsByOrderId(Long orderId) {
        // Logic to handle the polymorphism, possibly fetching types individually
        List<Product> products = new ArrayList<>();
        products.addAll(findPlissegardinByOrderId(orderId).orElse(Collections.emptyList()));
        products.addAll(findAnotherProductTypeByOrderId(orderId).orElse(Collections.emptyList()));
        // ... add other product types
        return products;
    }

    @Select("SELECT * FROM Plissegardin WHERE order_id = #{orderId}")
    Optional<List<Plissegardin>> findPlissegardinByOrderId(Long orderId);

    @Select("SELECT * FROM AnotherProductType WHERE order_id = #{orderId}")
    Optional<List<AnotherProductType>> findAnotherProductTypeByOrderId(Long orderId);
 */