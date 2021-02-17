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

  return {
    [formEnum.ADDRESS]: (
      <AddressForm save={saveAndClose} previousValue={previousValue} closeModal={closeModal} />
    ),
    [formEnum.COMMENT]: (
      <CommentForm save={saveAndClose} previousValue={previousValue} closeModal={closeModal} />
    ),
    [formEnum.CONTACT_ATTEMPT]: (
      <ContactAttemptsForm
        save={saveAndClose}
        previousValue={previousValue}
        closeModal={closeModal}
      />
    ),
    [formEnum.CONTACT_OUTCOME]: (
      <ContactOutcomeForm
        save={saveAndClose}
        previousValue={previousValue}
        closeModal={closeModal}
      />
    ),
    [formEnum.DELETION]: <DeletionForm save={saveAndClose} />,
    [formEnum.MAIL]: (
      <MailForm save={saveAndClose} previousValue={previousValue} closeModal={closeModal} />
    ),
    [formEnum.PHONE]: (
      <PhoneForm save={saveAndClose} previousValue={previousValue} closeModal={closeModal} />
    ),
    [formEnum.USER]: (
      <UserForm save={saveAndClose} previousValue={previousValue} closeModal={closeModal} />
    ),
  }[formType];
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

    default:
      value = { titi: 'tutu' };
      break;
  }

  return value;
};
