package se.sharpness.hassessolskydd.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface PhotoMapper {

    @Select("SELECT photo FROM public.order_photos WHERE order_id = #{orderId}")
    List<String> getPhotosByOrderId(int orderId);

}

/*
CREATE TABLE public.order_photos (
                                      id integer NOT NULL,
                                      order_id integer,
                                      photo text,
                                      CONSTRAINT order_photos_pkey PRIMARY KEY (id),
                                      CONSTRAINT fk_order_photos_order FOREIGN KEY (order_id)
                                          REFERENCES public.order (id)
);
 */