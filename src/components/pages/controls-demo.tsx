import React, { useCallback, useEffect, useRef, useState } from 'react';
import { pubSubService } from '../../pubsub';
import { FormGroup } from '../form-controls/form-group';
import { FormInput, FormInputRef } from '../form-controls/form-input';
import { FormButton } from '../form-controls/form-button';
import { FaBackward, FaArrowRight, FaSpinner, FaCheck } from 'react-icons/fa';
import { ScrollingPage } from '../form-controls/scrolling-page';
import { appState } from '../../appstate';
import { FormMemoInput } from '../form-controls/form-memo-input';
import { FormDateInput } from '../form-controls/form-date-input';


export function ControlsDemoPage(args: {}) {

  function logout() {
    appState.setLoggedInUser(null);
  }

  return (
     <ScrollingPage>
     <FormGroup>
       <FormInput label={'Single line text field'} helpText="Example of a single line text field" ></FormInput>
       <FormMemoInput label={'Multi line text field'} helpText="Example of a multi line text field" ></FormMemoInput>
       <FormDateInput label={'Date picker'} helpText="Example of a date input"></FormDateInput>
     </FormGroup>
   </ScrollingPage>
  );
}

