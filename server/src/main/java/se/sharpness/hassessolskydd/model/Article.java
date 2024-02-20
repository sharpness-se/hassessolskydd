package se.sharpness.hassessolskydd.model;

import lombok.Data;

import java.util.List;

@Data
public class Article {

    private String name;

    private List<OrderItemDetails> articleDetails;
}
