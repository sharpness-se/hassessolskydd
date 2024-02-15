package se.sharpness.hassessolskydd.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import se.sharpness.hassessolskydd.model.InstallationDetails;

import java.util.Optional;

@Mapper
public interface InstallationDetailsMapper { //TODO: Should this be a part of OrderMapper?


    @Select(
            "select * from installation_details where order_id = #{orderId}"
    )
    Optional<InstallationDetails> findInstallationDetailsByOrderId(int orderId);

    @Insert(
            "INSERT INTO installation_details" +
            "(order_id, is_normal, facade_details, floor_details, cable_length, remote_control, lift_needed) " +
            "VALUES" +
            "(#{orderId}, #{mountingType}, #{facadeDetails}, #{floorDetails}, #{cableLength}, #{remoteControl}, #{needLift})"
    )
    int insertInstallationDetails(InstallationDetails installationDetails);


}

/*
    private int id;
    private String mountingDetails;
    private String floorDetails;
    private String needLift;
    private String facadeDetails;
    private String cableLength;
    private String remoteControl;

    order_id integer
    is_normal boolean NOT NULL,
    facade_details character varying(255),
    floor_details character varying(255),
    cable_length integer,
    remote_control boolean,
    lift_needed
 */
