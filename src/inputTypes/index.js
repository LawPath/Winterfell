import React from 'react';
import CheckboxInput from './checkboxInput';
import CheckboxOptionsInput from './checkboxOptionsInput';
import EmailInput from './emailInput';
import FileInput from './fileInput';
import HiddenInput from './hiddenInput';
import PasswordInput from './passwordInput';
import RadioOptionsInput from './radioOptionsInput';
import SelectInput from './selectInput';
import TextareaInput from './textareaInput';
import TextInput from './textInput';
import AddressInput from './addressInput';
import DateInput from './dateInput';
import SignatureInput from './signatureInput';

export const QUESTION_INPUT_TYPES = {
  checkbox: ' checkboxInput',
  checkboxOptions: 'checkboxOptionsInput',
  email: 'emailInput',
  file: 'fileInput',
  hiddenInput: 'hiddenInput',
  password: 'passwordInput',
  radio: 'radioOptionsInput',
  select: 'selectInput',
  textArea: 'textAreaInput',
  textarea: 'textareaInput',
  text: 'textInput',
  address: 'addressInput',
  date: 'dateInput',
  signature: 'signatureInput',
};

const inputTypes = {
  checkboxInput: CheckboxInput,
  checkboxOptionsInput: CheckboxOptionsInput,
  emailInput: EmailInput,
  fileInput: FileInput,
  hiddenInput: HiddenInput,
  passwordInput: PasswordInput,
  radioOptionsInput: RadioOptionsInput,
  selectInput: SelectInput,
  textAreaInput: TextareaInput,
  textareaInput: TextareaInput,
  textInput: TextInput,
  addressInput: AddressInput,
  dateInput: DateInput,
  signatureInput: SignatureInput,
};

/**
 * Add an input type
 *
 * @param  type      name     Name of InputType
 * @param  Component instance Input Type Component
 */
inputTypes.addInputType = (name, instance) => {
  if (typeof name !== 'string') {
    throw new Error('Winterfell: First parameter of addInputType ' + 'must be of type string');
  }

  if (!React.Component instanceof instance.constructor) {
    throw new Error(
      'Winterfell: Cannot not assign "' +
        name +
        '" as an inputType. ' +
        'Second paramter expects a React component',
    );
  }

  inputTypes[name] = instance;
};

/**
 * Add multiple InputTypes
 *
 * @param  object types InputTypes to add. string => Component
 */
inputTypes.addInputTypes = (types) => {
  if (typeof types !== 'object') {
    throw new Error('Winterfell: First parameter of addInputTypes ' + 'must be of type object');
  }

  for (var type in types) {
    inputTypes.addInputType(type, types[type]);
  }
};

export default inputTypes;
