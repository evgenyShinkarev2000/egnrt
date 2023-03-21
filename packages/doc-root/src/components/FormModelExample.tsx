import { FieldData, FormData, InputPointer, FieldValidators, FormValidators, ValidatorRegistrar, RequiredValidator, ValidatorActivator, MinLengthValidator } from "@egnrt/form-model";
import { ValidatorProvidedProps } from "@egnrt/form-model";

import React, { PropsWithChildren, useState } from "react";

export const FormModelExample: React.FC = () =>
{

  const [formMutableModel] = useState({
    "123": "input 123",
    "abc": "input abc",
  });

  return (
    <>
      <FormData modelMutable={formMutableModel}>
        <FormValidators>
          <FieldData fieldName='123'>
            <FieldValidators>
              <InputPointer>
                <input></input>
              </InputPointer>
              <InputPointer>
                <input></input>
              </InputPointer>
            </FieldValidators>
          </FieldData>
          <FieldData fieldName="abc">
            <FieldValidators>
              <InputPointer>
                <input></input>
              </InputPointer>
              <ValidatorRegistrar validator={new RequiredValidator()}>
                <ValidatorActivator element={CheckValidator}>

                </ValidatorActivator>
              </ValidatorRegistrar>
              <ValidatorRegistrar validator={new MinLengthValidator(5)}>
                <ValidatorActivator element={CheckValidator}/>
              </ValidatorRegistrar>
            </FieldValidators>
          </FieldData>
        </FormValidators>
      </FormData>
    </>
  )
}

const CheckValidator: React.FC<PropsWithChildren<ValidatorProvidedProps>> = (props) =>
{

  return (
    <div>
      <p>validator state {props.isValid ? "true" : "false"}</p>
      <p>validator message {props.message}</p>
    </div>
  )
}