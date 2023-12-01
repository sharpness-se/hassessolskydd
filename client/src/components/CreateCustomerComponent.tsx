import React, { useState } from "react";
import DoubleFieldInputRow from "../components/form/DoubleFieldInputRow";
import SingleFieldInputRow from "../components/form/SingleFieldInputRow";
import FormComponent from "../components/form/FormComponent";
import * as Yup from "yup";

function CreateCustomerComponent() {
  interface FormData {
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    postalCode: string;
  }

  const schema = Yup.object().shape({
    firstname: Yup.string()
      .required("Förnamn är obligatoriskt")
      .matches(/^[a-zA-ZåäöÅÄÖ\-'.,\s]*$/, "Ogiltigt namnformat"),
    lastname: Yup.string()
      .required("Efternamn är obligatoriskt")
      .matches(/^[a-zA-ZåäöÅÄÖ\-'.,\s]*$/, "Ogiltigt namnformat"),
    email: Yup.string()
    .required("Email är obligatoriskt")
    .matches(
      /^(|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-åäöÅÄÖ]+\.[a-zA-ZåäöÅÄÖ]{2,})$/,
      "Ogiltig emailadress"
    ),
    phoneNumber: Yup.string()
      .required("Telefon är obligatoriskt")
      .matches(/^[0-9()+\- ]*$/, "Ogiltigt telefonnummerformat")
      .min(9, "Telefonnummer måste vara minst 9 siffror"),
    address: Yup.string()
      .required("Adress är obligatoriskt")
      .matches(/^[a-zA-Z0-9åäöÅÄÖ\s.,\-#]*$/, "Ange en giltig adress"),
    city: Yup.string()
      .required("Ort är obligatoriskt")
      .matches(/^[a-zA-ZåäöÅÄÖ]*$/, "Ange endast bokstäver"),
    postalCode: Yup.string()
      .required("Postkod är obligatoriskt")
      .matches(/^[0-9]*$/, "Ange endast siffror.")
      .min(5, "Postkod måste vara minst 5 siffror"),
  });

  const generateInitialState = (): FormData => ({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [formData, setFormData] = useState<FormData>(generateInitialState());
  const [errors, setErrors] = useState<FormData>(generateInitialState());

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Validate the form data using Yup
      setErrors(generateInitialState());

      await schema.validate(formData, { abortEarly: false });

      // Form is valid, handle submission logic here
      const response = await fetch(
        "https://hasses-be-c8520bea6cc2/api/customers/create_customer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        // Handle errors here if needed
        console.error("Failed to submit form.");
        return;
      }

      console.log("Form submitted:", formData);
    } catch (validationErrors) {
      // Form validation failed, update the errors state
      if (validationErrors instanceof Yup.ValidationError) {
        setErrors((newErrors) =>
          Object.assign(
            {},
            newErrors,
            ...((validationErrors as Yup.ValidationError).inner ?? []).map(
              (err) => ({
                [err.path ?? ""]: err.message,
              })
            )
          )
        );
      }
    }
  };
  return (
    <FormComponent onSubmit={handleSubmit}>
      <DoubleFieldInputRow
        labelOne="förnamn"
        labelTwo="efternamn"
        idOne="firstname"
        idTwo="lastname"
        placeholderOne="Jane"
        placeholderTwo="Doe"
        valueOne={formData.firstname}
        valueTwo={formData.lastname}
        onChangeOne={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("firstname", e.target.value)
        }
        onChangeTwo={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("lastname", e.target.value)
        }
        errorOne={errors.firstname}
        errorTwo={errors.lastname}
        maxLengthOne={20}
        maxLengthTwo={20}
      ></DoubleFieldInputRow>
      <DoubleFieldInputRow
        labelOne="email"
        labelTwo="telefon"
        idOne="email"
        idTwo="phoneNumber"
        placeholderOne="Jane.Doe@testing.com"
        placeholderTwo="08 123 12312"
        valueOne={formData.email}
        valueTwo={formData.phoneNumber}
        onChangeOne={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("email", e.target.value)
        }
        onChangeTwo={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("phoneNumber", e.target.value)
        }
        errorOne={errors.email}
        errorTwo={errors.phoneNumber}
        maxLengthOne={225}
        maxLengthTwo={12}
      />
      <SingleFieldInputRow
        label="adress"
        id="address"
        placeholder=" 12 something something"
        value={formData.address}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("address", e.target.value)
        }
        error={errors.address}
        maxLength={40}
      />
      <DoubleFieldInputRow
        labelOne="ort"
        labelTwo="postkod"
        idOne="city"
        idTwo="postalCode"
        placeholderOne="Danderyd"
        placeholderTwo="18502"
        valueOne={formData.city}
        valueTwo={formData.postalCode}
        onChangeOne={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("city", e.target.value)
        }
        onChangeTwo={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("postalCode", e.target.value)
        }
        errorOne={errors.city}
        errorTwo={errors.postalCode}
        maxLengthOne={20}
        maxLengthTwo={5}
      />
    </FormComponent>
  );
}

export default CreateCustomerComponent;
