import React from "react";
import DoubleFieldInputRow from "../components/form/DoubleFieldInputRow";
import SingleFieldInputRow from "../components/form/SingleFieldInputRow";
import SubmitButton from "../components/form/SubmitButton";
import FormComponent from "../components/form/FormComponent";

export default function CreateCustomerPageComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center p-24 ">
      <h1 className="text-5xl bg-cyan-500 text-black border-black border-4 p-10 mb-11">
        Create Customer
      </h1>
      <FormComponent>
        <DoubleFieldInputRow
          labelOne="Förnamn"
          placeholderOne="Jane"
          labelTwo="Efternamn"
          placeholderTwo="Doe"
        ></DoubleFieldInputRow>
        <DoubleFieldInputRow
          labelOne="Email"
          placeholderOne="Jane.Doe@testing.com"
          labelTwo="Telefon"
          placeholderTwo="08 123 12312"
        />
        <SingleFieldInputRow
          label="Adress"
          placeholder=" 12 something something"
        />
        <DoubleFieldInputRow
          labelOne="Ort"
          placeholderOne="Danderyd"
          labelTwo="Postkod"
          placeholderTwo="18502"
        />
        <SubmitButton label="Skapa Kund" />
      </FormComponent>
    </div>
  );
}
