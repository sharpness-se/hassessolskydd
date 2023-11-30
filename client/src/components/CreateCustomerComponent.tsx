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
    firstname: Yup.string().required("Förnamn är obligatoriskt"),
    lastname: Yup.string().required("Efternamn är obligatoriskt"),
    email: Yup.string()
      .email("Ogiltig email")
      .required("Email är obligatoriskt"),
    phoneNumber: Yup.string().required("Telefon är obligatoriskt"),
    address: Yup.string().required("Adress är obligatoriskt"),
    city: Yup.string().required("Ort är obligatoriskt"),
    postalCode: Yup.string().required("Postkod är obligatoriskt"),
  });
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const defaultValues = {
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    postalCode: "",
  };
  const [errors, setErrors] = useState<{ [key: string]: string }>(
    defaultValues
  );

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
      setErrors(defaultValues);
      await schema.validate(formData, { abortEarly: false });

      // Form is valid, handle submission logic here
      console.log("Form submitted:", formData);
    } catch (validationErrors) {
      // Form validation failed, update the errors state
      if (validationErrors instanceof Yup.ValidationError) {
        setErrors((newErrors) => Object.assign({}, newErrors, 
          ...((validationErrors as Yup.ValidationError).inner ?? []).map(err => ({
            [err.path ?? ""]: err.message
          }))
        ));
      }
      
    }
  };
  return (
    <FormComponent onSubmit={handleSubmit}>
      <DoubleFieldInputRow
        labelOne="förnamn"
        labelTwo="efternamn"
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
        maxLengthOne={20}
        maxLengthTwo={15}
      />
      <SingleFieldInputRow
        label="adress"
        placeholder=" 12 something something"
        value={formData.address}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("address", e.target.value)
        }
        error={errors?.address}
        maxLength={25}
      />
      <DoubleFieldInputRow
        labelOne="ort"
        labelTwo="postkod"
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
        maxLengthOne={10}
        maxLengthTwo={5}
      />
    </FormComponent>
  );
}

export default CreateCustomerComponent;
