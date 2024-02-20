package se.sharpness.hassessolskydd.model;

import lombok.Data;

@Data
public class OrderItemDetails {

    private int id;
    private int orderItemId;
    private String name;
    private String attribute;
    private String value;
}
