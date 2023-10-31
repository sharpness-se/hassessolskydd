package Sharpness.hassessolskydd.security.service;

import org.springframework.stereotype.Service;
import Sharpness.hassessolskydd.security.entity.UserEntity;

import java.util.Optional;

@Service
public class UserService {

    private static final String EXISTING_EMAIL = "test@test.com";

    public Optional<UserEntity> findByEmail(String email) {
        //Todo: Move this to a database
        if (! EXISTING_EMAIL.equalsIgnoreCase(email)) return Optional.empty();

        var user = new UserEntity();
        user.setId(1L);
        user.setEmail(EXISTING_EMAIL);
        user.setPassword("$2a$12$1UoOaURR8c3j69W2hsAZPu9fkx5tPK6uOzSBQmE6wbebkzGKsqmTS"); //pwd = test
        user.setRole("ROLE_ADMIN");
        user.setExtraInfo("My nice admin");
        return Optional.of(user);

    }
}
