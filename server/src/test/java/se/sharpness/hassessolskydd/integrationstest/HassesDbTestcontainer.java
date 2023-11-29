package se.sharpness.hassessolskydd.integrationstest;

import org.springframework.boot.test.context.SpringBootTest;
import org.testcontainers.containers.PostgreSQLContainer;

@SpringBootTest
public class HassesDbTestcontainer extends PostgreSQLContainer<HassesDbTestcontainer> {
  private static final String IMAGE_VERSION = "postgres:latest";
  private static HassesDbTestcontainer container;

  private HassesDbTestcontainer() {
    super(IMAGE_VERSION);
  }

  public static HassesDbTestcontainer getInstance() {
    if (container == null) {
      container = new HassesDbTestcontainer()
        .withDatabaseName("hassessolskydd")
        .withUsername("hassessolskydd")
        .withPassword("r4d3+");
    }
    return container;
  }

  @Override
  public void stop() {
  }
}
