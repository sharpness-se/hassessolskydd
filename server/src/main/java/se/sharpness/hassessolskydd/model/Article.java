package se.sharpness.hassessolskydd.model;

import lombok.Data;

import java.util.List;

@Data
public class Article {

    private String name;
    private int orderItemId;
    private List<String> attributes;
    private List<String> values;
}
