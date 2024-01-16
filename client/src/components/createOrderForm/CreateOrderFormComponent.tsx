import React, { useState } from "react";
import FormComponent from "../form/FormComponent";
import DoubleFieldInputRow from "../form/DoubleFieldInputRow";
import SingleFieldInputRow from "../form/SingleFieldInputRow";

function CreateOrderFormComponent() {
  const [numberOfProduct, setNumberOfProduct] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [model, setModel] = useState("");
  const [weave, setWeave] = useState("");
  const [fitting, setFitting] = useState("");
  const [ordinaryFitting, setOrdinaryFitting] = useState("");
  const [color, setColor] = useState("");
  const [remote, setRemote] = useState("");
  const handleSubmit = () => {};
  return (<div>
    <h1 className=" text-center font-bold text-gray-700 uppercase">Pilsegardin</h1>
    <FormComponent
      backButtonText={"Rensa"}
      submitButtonText={"Lägg Till"}
      onSubmit={handleSubmit}
      applyGrid={true}
      >
      <div className="grid grid-cols-subgrid col-span-4">
      <SingleFieldInputRow
        applyGrid
        label={"Antal"}
        id={"numberOfProduct"}
        value={numberOfProduct}
        onChange={(e) => {
          setNumberOfProduct(e.target.value);
        }}
        ></SingleFieldInputRow>
      </div>
      <SingleFieldInputRow
        applyGrid
        label={"Bred"}
        id={"width"}
        value={width}
        onChange={(e) => {
          setWidth(e.target.value);
        }}
        ></SingleFieldInputRow>
      <SingleFieldInputRow
        applyGrid
        label={"Höjd"}
        id={"height"}
        value={length}
        onChange={(e) => {
          setLength(e.target.value);
        }}
        ></SingleFieldInputRow>
      <SingleFieldInputRow
        applyGrid
        label={"Modell"}
        id={"model"}
        value={model}
        onChange={(e) => {
          setModel(e.target.value);
        }}
        ></SingleFieldInputRow>
      <SingleFieldInputRow
        applyGrid
        label={"Vävnummer"}
        id={"weave"}
        value={weave}
        onChange={(e) => {
          setWeave(e.target.value);
        }}
        ></SingleFieldInputRow>
      {/* "nextLine" */}
      <SingleFieldInputRow
        applyGrid
        label={"Beslag"}
        id={"beslag"}
        value={fitting}
        onChange={(e) => {
          setFitting(e.target.value);
        }}
        ></SingleFieldInputRow>
      <SingleFieldInputRow
        applyGrid
        label={"Allmodebeslag"}
        id={"ordinaryFitting"}
        value={ordinaryFitting}
        onChange={(e) => {
          setOrdinaryFitting(e.target.value);
        }}
        ></SingleFieldInputRow>
      <SingleFieldInputRow
        applyGrid
        label={"Reglage"}
        id={"remote"}
        value={remote}
        onChange={(e) => {
          setRemote(e.target.value);
        }}
        ></SingleFieldInputRow>
      <SingleFieldInputRow
        applyGrid
        label={"Detaljfärg"}
        id={"color"}
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
        }}
        ></SingleFieldInputRow>
    </FormComponent>
        </div>
  );
}

export default CreateOrderFormComponent;
