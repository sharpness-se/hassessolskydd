package se.sharpness.hassessolskydd.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import se.sharpness.hassessolskydd.model.InstallationDetails;

import java.util.Optional;

@Mapper
public interface InstallationDetailsMapper {


    @Select(
            "select * from installation_details where order_id = #{id}"
    )
    Optional<InstallationDetails> findInstallationDetailsByOrderId(Long id);


}

/*
private Long id;
    private boolean isNormal;
    private String facadeDetails;
    private String floorDetails;
    private Long cableLength;
    private boolean remoteControl;
    private boolean needLift;
 */
