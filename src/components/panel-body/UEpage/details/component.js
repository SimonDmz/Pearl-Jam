import formEnum from 'common-tools/enum/formEnum';
import { getAddressData, getMailData, getPhoneData, getUserData } from 'common-tools/functions';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import AtomicInfoTile from '../atomicInfoTile';
import SurveyUnitContext from '../UEContext';

const UEItem = ({ selectFormType }) => {
  const surveyUnit = useContext(SurveyUnitContext);

  return (
    <>
      <AtomicInfoTile
        iconType="home"
        data={getAddressData(surveyUnit)}
        onClickFunction={() => selectFormType(formEnum.ADDRESS, true)}
      />
      <AtomicInfoTile
        iconType="user"
        data={getUserData(surveyUnit)}
        onClickFunction={() => selectFormType(formEnum.USER, true)}
      />
      <AtomicInfoTile
        iconType="mail"
        data={getMailData(surveyUnit)}
        onClickFunction={() => selectFormType(formEnum.MAIL, true)}
      />
      <AtomicInfoTile
        iconType="phone"
        data={getPhoneData(surveyUnit)}
        onClickFunction={() => selectFormType(formEnum.PHONE, true)}
      />
    </>
  );
};

export default UEItem;
UEItem.propTypes = { selectFormType: PropTypes.func.isRequired };
