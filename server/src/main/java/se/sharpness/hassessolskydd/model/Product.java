package se.sharpness.hassessolskydd.model;

import lombok.Data;
import se.sharpness.hassessolskydd.model.DTO.OrderItemDetailsDTO;

import java.util.List;

@Data
public class Product {

    private String name;

    private List<OrderItemDetailsDTO> productDetails;
}
