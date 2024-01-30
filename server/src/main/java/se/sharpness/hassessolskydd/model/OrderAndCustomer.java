package se.sharpness.hassessolskydd.model;

import lombok.Data;

@Data
public class OrderAndCustomer {

    private Order order;
    private Customer customer;
}
