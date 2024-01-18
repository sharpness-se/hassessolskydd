/// <reference types="cypress" />

describe("Create Customer Form Test", () => {
  interface FormData {
    [key: string]: string;
  }

  const validFormData: FormData = {
    firstname: "Test",
    lastname: "Testson",
    email: "test@test.com",
    phoneNumber: "0731112235",
    address: "Testgatan 35",
    city: "Teststaden",
    postalCode: "12344",
  };

  beforeEach(() => {
    cy.visit("http://localhost:8080/skapakund");

    cy.request({
      method: "POST",
      url: "/api/deleteCustomerByCustomerNumber/TestTestson0731112235",
    });

    cy.intercept("POST", "/api/customers/create_customer").as("handleSubmit");
  });

  it("should submit the form successfully", () => {
    Object.entries(validFormData).forEach(([key, value]) => {
      cy.get(`input[id="${key}"]`).type(value);
    });
    cy.get('button[type="submit"]').click();

    cy.wait("@handleSubmit").its("response.statusCode").should("eq", 200);
  });

  it("should submit a customer that already exists", () => {
    cy.intercept("POST", "/api/customers/create_customer").as("handleSubmit");

    // cy.request({
    //   method: "POST",
    //   url: "/api/customers/create_customer",
    //   body: validFormData,
    // }).then((res) => expect(res.status).to.eq(200));
    Object.entries(validFormData).forEach(([key, value]) => {
      cy.get(`input[id="${key}"]`).type(value);
    });
    cy.get('button[type="submit"]').click();
    
    cy.wait("@handleSubmit").its("response.statusCode").should("eq", 200);

    Object.entries(validFormData).forEach(([key, value]) => {
      cy.get(`input[id="${key}"]`).type(value);
    });
    cy.get('button[type="submit"]').click();

    cy.wait("@handleSubmit").its("response.statusCode").should("eq", 409);
  });
});

describe("Form Validation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
    cy.contains("Skapa ny kund").click();
  });

  interface FormData {
    [key: string]: string;
  }

  const validFormData: FormData = {
    firstname: "Test",
    lastname: "Testson",
    email: "test@test.com",
    phoneNumber: "0731112235",
    address: "Testgatan 35",
    city: "Teststaden",
    postalCode: "123 44",
  };

  const invalidInput: string[] = ["Abc 123", "123", "Test!?#", "abc@def"];

  invalidInput.forEach((invalidInput: string) => {
    it(`Tests invalid input for first name: ${invalidInput}`, () => {
      cy.get('input[id="firstname"]').type(invalidInput);
      cy.get('button[type="submit"]').click();

      cy.get(`input[id="firstname"]`)
        .next("p")
        .first()
        .should("include.text", "Ogiltigt");
    });
  });

  invalidInput.forEach((invalidInput: string) => {
    it(`Tests invalid input for last name: ${invalidInput}`, () => {
      cy.get('input[id="lastname"]').type(invalidInput);
      cy.get('button[type="submit"]').click();

      cy.get(`input[id="lastname"]`)
        .next("p")
        .first()
        .should("include.text", "Ogiltigt");
    });
  });

  invalidInput.forEach((invalidInput: string) => {
    it(`Tests invalid input for email: ${invalidInput}`, () => {
      cy.get('input[id="email"]').type(invalidInput);
      cy.get('button[type="submit"]').click();

      cy.get(`input[id="email"]`)
        .next("p")
        .first()
        .should("include.text", "Ogiltig");
    });
  });

  invalidInput.forEach((invalidInput: string) => {
    it(`Tests invalid input for phone number: ${invalidInput}`, () => {
      cy.get('input[id="phoneNumber"]').type(invalidInput);
      cy.get('button[type="submit"]').click();

      cy.get(`input[id="phoneNumber"]`)
        .next("p")
        .first()
        .should("include.text", "siffror");
    });
  });

  invalidInput.forEach((invalidInput: string) => {
    it(`Tests invalid input for city: ${invalidInput}`, () => {
      cy.get('input[id="city"]').type(invalidInput);
      cy.get('button[type="submit"]').click();

      cy.get(`input[id="city"]`)
        .next("p")
        .first()
        .should("include.text", "endast bokstäver");
    });
  });

  invalidInput.forEach((invalidInput: string) => {
    it(`Tests invalid input for postal code: ${invalidInput}`, () => {
      cy.get('input[id="postalCode"]').type(invalidInput);
      cy.get('button[type="submit"]').click();

      cy.get(`input[id="postalCode"]`)
        .next("p")
        .first()
        .should("include.text", "siffror");
    });
  });

  it("should get a validation error if first name is not filled in", () => {
    Object.entries(validFormData).forEach(([key, value]) => {
      if (key !== "firstname") {
        cy.get(`input[id="${key}"]`).type(value);
      }
    });
    cy.get('button[type="submit"]').click();

    cy.get(`input[id="firstname"]`)
      .next("p")
      .first()
      .should("include.text", "obligatoriskt");
  });

  it("should get a validation error if last name is not filled in", () => {
    Object.entries(validFormData).forEach(([key, value]) => {
      if (key !== "lastname") {
        cy.get(`input[id="${key}"]`).type(value);
      }
    });
    cy.get('button[type="submit"]').click();

    cy.get(`input[id="lastname"]`)
      .next("p")
      .first()
      .should("include.text", "obligatoriskt");
  });

  it("should get a validation error if email is not filled in", () => {
    Object.entries(validFormData).forEach(([key, value]) => {
      if (key !== "email") {
        cy.get(`input[id="${key}"]`).type(value);
      }
    });
    cy.get('button[type="submit"]').click();

    cy.get(`input[id="email"]`)
      .next("p")
      .first()
      .should("include.text", "obligatoriskt");
  });

  it("should get a validation error if phone number is not filled in", () => {
    Object.entries(validFormData).forEach(([key, value]) => {
      if (key !== "phoneNumber") {
        cy.get(`input[id="${key}"]`).type(value);
      }
    });
    cy.get('button[type="submit"]').click();

    cy.get(`input[id="phoneNumber"]`)
      .next("p")
      .first()
      .should("include.text", "Telefonnummer måste vara minst 8 siffror");
  });

  it("should get a validation error if address is not filled in", () => {
    Object.entries(validFormData).forEach(([key, value]) => {
      if (key !== "address") {
        cy.get(`input[id="${key}"]`).type(value);
      }
    });
    cy.get('button[type="submit"]').click();

    cy.get(`input[id="address"]`)
      .next("p")
      .first()
      .should("include.text", "obligatoriskt");
  });

  it("should get a validation error if city is not filled in", () => {
    Object.entries(validFormData).forEach(([key, value]) => {
      if (key !== "city") {
        cy.get(`input[id="${key}"]`).type(value);
      }
    });
    cy.get('button[type="submit"]').click();

    cy.get(`input[id="city"]`)
      .next("p")
      .first()
      .should("include.text", "obligatoriskt");
  });

  it("should get a validation error if postal code is not filled in", () => {
    Object.entries(validFormData).forEach(([key, value]) => {
      if (key !== "postalCode") {
        cy.get(`input[id="${key}"]`).type(value);
      }
    });
    cy.get('button[type="submit"]').click();

    cy.get(`input[id="postalCode"]`)
      .next("p")
      .first()
      .should("include.text", "Postkod måste vara minst 5 siffror");
  });
});
