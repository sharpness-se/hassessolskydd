package se.sharpness.hassessolskydd.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import se.sharpness.hassessolskydd.security.controller.HelloController;

import static org.hamcrest.Matchers.containsStringIgnoringCase;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class HelloControllerTest {

  private MockMvc api;

  @BeforeEach
  void setUp() {
    api = MockMvcBuilders.standaloneSetup(new HelloController()).build();
  }

  @Test
  void anyoneCanViewPublicEndpoint() throws Exception {
    api.perform(get("/public"))
      .andExpect(status().isOk())
      .andExpect(content().string(containsStringIgnoringCase("Everyone")));
  }
}