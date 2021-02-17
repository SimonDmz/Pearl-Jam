import formEnum from 'common-tools/enum/formEnum';
import { getAddressData } from 'common-tools/functions';
import React from 'react';
import AddressForm from './addressForm';
import CommentForm from './commentForm';
import ContactAttemptsForm from './contactAttemptsForm';
import ContactOutcomeForm from './contactOutcomeForm';
import DeletionForm from './deletionForm';
import MailForm from './mailForm';
import PhoneForm from './phoneForm';
import UserForm from './userForm';

export const getForm = (formType, saveFunction, previousValue, closeModal) => {
  const saveAndClose = surveyUnit => {
    closeModal();
    saveFunction(surveyUnit);
  };

  switch (formType) {
    case formEnum.ADDRESS:
      return (
        <AddressForm save={saveAndClose} previousValue={previousValue} closeModal={closeModal} />
      );
    case formEnum.COMMENT:
      return (
        <CommentForm save={saveAndClose} previousValue={previousValue} closeModal={closeModal} />
      );
    case formEnum.CONTACT_ATTEMPT:
      return (
        <ContactAttemptsForm
          save={saveAndClose}
          previousValue={previousValue}
          closeModal={closeModal}
        />
      );
    case formEnum.CONTACT_OUTCOME:
      return (
        <ContactOutcomeForm
          save={saveAndClose}
          previousValue={previousValue}
          closeModal={closeModal}
        />
      );
    case formEnum.DELETION:
      return <DeletionForm save={saveAndClose} />;
    case formEnum.MAIL:
      return <MailForm save={saveAndClose} previousValue={previousValue} closeModal={closeModal} />;
    case formEnum.PHONE:
      return (
        <PhoneForm save={saveAndClose} previousValue={previousValue} closeModal={closeModal} />
      );
    case formEnum.USER:
      return <UserForm save={saveAndClose} previousValue={previousValue} closeModal={closeModal} />;

    default:
      return null;
  }
};

export const getPreviousValue = (formType, surveyUnit) => {
  let value;

  switch (formType) {
    case formEnum.ADDRESS:
      value = getAddressData(surveyUnit);
      break;
    case formEnum.USER:
      value = { firstName: surveyUnit.firstName, lastName: surveyUnit.lastName };
      break;
    case formEnum.MAIL:
      value = surveyUnit.email;
      break;
    case formEnum.PHONE:
      value = surveyUnit.phoneNumbers;
      break;

    default:
      value = { titi: 'tutu' };
      break;
  }

  return value;
};
