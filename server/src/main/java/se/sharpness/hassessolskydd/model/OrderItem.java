package se.sharpness.hassessolskydd.model;

import lombok.Data;

@Data
public class OrderItem {
    private int id;
    private int orderId;
    private int itemId;
}
