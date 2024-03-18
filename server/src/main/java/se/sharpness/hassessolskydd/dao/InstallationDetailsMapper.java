package se.sharpness.hassessolskydd.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import se.sharpness.hassessolskydd.model.InstallationDetails;
import se.sharpness.hassessolskydd.model.Order;

import java.util.Optional;

@Mapper
public interface InstallationDetailsMapper { //TODO: Should this be a part of OrderMapper?


    @Select(
            "select * from installation_details where order_id = #{orderId}"
    )
    Optional<InstallationDetails> findInstallationDetailsByOrderId(int orderId);

    @Insert(
            "INSERT INTO installation_details" +
            "(order_id, mounting_type, facade_details, floor_details, cable_length, remote_control, lift_needed, notes) " +
            "VALUES" +
            "(#{orderId}, #{mountingType}, #{facadeDetails}, #{floorDetails}, #{cableLength}, #{remoteControl}, #{liftNeeded}, #{notes})"
    )
    int insertInstallationDetails(InstallationDetails installationDetails);

    @Update(
            "UPDATE public.installation_details " +
                    "SET " +
                    "order_id = #{orderId}, " +
                    "mounting_type = #{mountingType}, " +
                    "facade_details = #{facadeDetails}, " +
                    "floor_details = #{floorDetails}, " +
                    "cable_length = #{cableLength}, " +
                    "remote_control = #{remoteControl}, " +
                    "lift_needed = #{liftNeeded}, " +
                    "notes = #{notes} " +
                    "WHERE order_id = #{orderId}"
    )
    void updateInstallationDetails(InstallationDetails installationDetails);


}

/*
    private int orderId;
    private String mountingType;
    private String floorDetails;
    private String needLift;
    private String facadeDetails;
    private String cableLength;
    private String remoteControl;
    private String notes;

    id integer NOT NULL,
    order_id integer NOT NULL,
    is_normal character varying(255),
    facade_details character varying(255),
    floor_details character varying(255),
    cable_length character varying(255),
    remote_control character varying(255),
    lift_needed character varying(255),
    notes character varying(2000)
 */
