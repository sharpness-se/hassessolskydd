import React, { useState } from "react";
import DoubleFieldInputRow from "../components/form/DoubleFieldInputRow";
import SingleFieldInputRow from "../components/form/SingleFieldInputRow";
import FormComponent from "../components/form/FormComponent";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

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
  interface FormDataValidation {
    firstname: { error: string; touched: boolean };
    lastname: { error: string; touched: boolean };
    email: { error: string; touched: boolean };
    phoneNumber: { error: string; touched: boolean };
    address: { error: string; touched: boolean };
    city: { error: string; touched: boolean };
    postalCode: { error: string; touched: boolean };
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
  const generateInitialValidationState = (): FormDataValidation => ({
    firstname: { error: "", touched: false },
    lastname: { error: "", touched: false },
    email: { error: "", touched: false },
    phoneNumber: { error: "", touched: false },
    address: { error: "", touched: false },
    city: { error: "", touched: false },
    postalCode: { error: "", touched: false },
  });
  const [formData, setFormData] = useState<FormData>(generateInitialState());

  const [errors, setErrors] = useState<FormDataValidation>(
    generateInitialValidationState()
  );

  const handleChange = async (name: keyof FormData, value: string) => {
    const updatedFormData = { ...formData, [name]: value };
    const updatedFormDataValidation = {
      ...errors,
      [name]: { error: "", touched: true },
    };

    setFormData(updatedFormData);
    try {
      if (updatedFormDataValidation[name].touched) {
        await schema.validateAt(name, updatedFormData, { abortEarly: false });

        setErrors((newErrors) => ({
          ...newErrors,
          [name]: { error: "", touched: true },
        }));
      }
    } catch (validationErrors: any) {
      // Form validation failed, update the errors state
      if (validationErrors instanceof Yup.ValidationError) {
        setErrors((newErrors) => ({
          ...newErrors,
          [name]: { error: validationErrors.errors[0], touched: true },
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validate the entire form using Yup
      await schema.validate(formData, { abortEarly: false });

      // Form is valid, handle submission logic here
      const response = await fetch(
        "https://hasses-be-c8520bea6cc2.herokuapp.com/api/customers/create_customer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 409) {
        toast.error("Customer exists!");
        return;
      }

      if (!response.ok) {
        // Handle errors here if needed
        console.error("Failed to submit form.");
        return;
      }
      console.log("Form submitted:", formData);
      toast.success(
        `${formData.firstname + " " + formData.lastname} saved to database!`,
        { duration: 6000 }
      );
      //clear formData after submission success
      setFormData(generateInitialState());
    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        // Yup validation errors occurred
        const newErrors = { ...generateInitialValidationState() };

        validationError.inner.forEach((error) => {
          // Update errors state with error messages
          const path = error.path as keyof FormDataValidation;
          if (path) {
            newErrors[path].error = error.message;
            newErrors[path].touched = true;
          }
        });

        // Set the new errors state
        setErrors(newErrors);
      } else {
        // Handle other errors
        console.error(validationError);
        toast.error(`${validationError}`);
        return;
      }
      toast.error("Data submission failed: Validation error!");
    }
  };
  return (
    <div className="w-full max-w-lg rounded-lg p-10 bg-white shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-3">Personuppgifter</h2>
      <FormComponent onSubmit={handleSubmit}>
        <DoubleFieldInputRow
          labelOne="förnamn"
          labelTwo="efternamn"
          idOne="firstname"
          idTwo="lastname"
          placeholderOne="Herbert"
          placeholderTwo="Bertelius"
          valueOne={formData.firstname}
          valueTwo={formData.lastname}
          onChangeOne={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange("firstname", e.target.value)
          }
          onChangeTwo={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange("lastname", e.target.value)
          }
          errorOne={errors.firstname.error}
          errorTwo={errors.lastname.error}
          maxLengthOne={20}
          maxLengthTwo={20}
        ></DoubleFieldInputRow>
        <DoubleFieldInputRow
          labelOne="email"
          labelTwo="telefon"
          idOne="email"
          idTwo="phoneNumber"
          placeholderOne="herbert@hotmail.com"
          placeholderTwo="076554400"
          valueOne={formData.email}
          valueTwo={formData.phoneNumber}
          onChangeOne={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange("email", e.target.value)
          }
          onChangeTwo={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange("phoneNumber", e.target.value)
          }
          errorOne={errors.email.error}
          errorTwo={errors.phoneNumber.error}
          maxLengthOne={225}
          maxLengthTwo={12}
        />
        <SingleFieldInputRow
          label="adress"
          id="address"
          placeholder="Västerlånggatan 48"
          value={formData.address}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange("address", e.target.value)
          }
          error={errors.address.error}
          maxLength={40}
        />
        <DoubleFieldInputRow
          labelOne="ort"
          labelTwo="postkod"
          idOne="city"
          idTwo="postalCode"
          placeholderOne="Stockholm"
          placeholderTwo="11129"
          valueOne={formData.city}
          valueTwo={formData.postalCode}
          onChangeOne={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange("city", e.target.value)
          }
          onChangeTwo={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange("postalCode", e.target.value)
          }
          errorOne={errors.city.error}
          errorTwo={errors.postalCode.error}
          maxLengthOne={20}
          maxLengthTwo={5}
        />
      </FormComponent>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}

export default CreateCustomerComponent;
