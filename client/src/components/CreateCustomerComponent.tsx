import React, { useState } from "react";
import DoubleFieldInputRow from "../components/form/DoubleFieldInputRow";
import SingleFieldInputRow from "../components/form/SingleFieldInputRow";
import FormComponent from "../components/form/FormComponent";
import * as Yup from "yup";

function CreateCustomerComponent() {
  interface FormData {
    förnamn: string;
    efternamn: string;
    email: string;
    telefon: string;
    adress: string;
    ort: string;
    postkod: string;
  }

  const schema = Yup.object().shape({
    förnamn: Yup.string().required("Förnamn är obligatoriskt"),
    efternamn: Yup.string().required("Efternamn är obligatoriskt"),
    email: Yup.string()
      .email("Ogiltig email")
      .required("Email är obligatoriskt"),
    telefon: Yup.string().required("Telefon är obligatoriskt"),
    adress: Yup.string().required("Adress är obligatoriskt"),
    ort: Yup.string().required("Ort är obligatoriskt"),
    postkod: Yup.string().required("Postkod är obligatoriskt"),
  });
  const [formData, setFormData] = useState<FormData>({
    förnamn: "",
    efternamn: "",
    email: "",
    telefon: "",
    adress: "",
    ort: "",
    postkod: "",
  });
  const defaultValues = {
    förnamn: "",
    efternamn: "",
    email: "",
    telefon: "",
    adress: "",
    ort: "",
    postkod: "",
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
        setErrors((newErrors) => ({
          ...newErrors,
          ...((validationErrors as Yup.ValidationError).inner ?? []).reduce(
            (acc, err) => {
              acc[err.path ?? ""] = err.message;
              return acc;
            },
            {} as { [key: string]: string }
          ),
        }));
      }
    }
  };
  return (
    <FormComponent onSubmit={handleSubmit}>
      <DoubleFieldInputRow
        labelOne="förnamn"
        placeholderOne="Jane"
        labelTwo="efternamn"
        placeholderTwo="Doe"
        valueOne={formData.förnamn}
        valueTwo={formData.efternamn}
        onChangeOne={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("förnamn", e.target.value)
        }
        onChangeTwo={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("efternamn", e.target.value)
        }
        errorOne={errors.förnamn}
        errorTwo={errors.efternamn}
        maxLengthOne={20}
        maxLengthTwo={20}
      ></DoubleFieldInputRow>
      <DoubleFieldInputRow
        labelOne="email"
        placeholderOne="Jane.Doe@testing.com"
        labelTwo="telefon"
        placeholderTwo="08 123 12312"
        valueOne={formData.email}
        valueTwo={formData.telefon}
        onChangeOne={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("email", e.target.value)
        }
        onChangeTwo={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("telefon", e.target.value)
        }
        errorOne={errors.email}
        errorTwo={errors.telefon}
        maxLengthOne={320}
        maxLengthTwo={15}
      />
      <SingleFieldInputRow
        label="adress"
        placeholder=" 12 something something"
        value={formData.adress}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("adress", e.target.value)
        }
        error={errors?.adress}
      />
      <DoubleFieldInputRow
        labelOne="ort"
        placeholderOne="Danderyd"
        labelTwo="postkod"
        placeholderTwo="18502"
        valueOne={formData.ort}
        valueTwo={formData.postkod}
        onChangeOne={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("ort", e.target.value)
        }
        onChangeTwo={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("postkod", e.target.value)
        }
        errorOne={errors.ort}
        errorTwo={errors.postkod}
        maxLengthOne={10}
        maxLengthTwo={5}
      />
    </FormComponent>
  );
}

export default CreateCustomerComponent;
