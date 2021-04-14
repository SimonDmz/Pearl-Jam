import formEnum from 'common-tools/enum/formEnum';
import { getAddressData } from 'common-tools/functions';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import AtomicInfoTile from '../atomicInfoTile';
import SurveyUnitContext from '../UEContext';
import Contact from './contact';

const UEItem = ({ selectFormType }) => {
  const surveyUnit = useContext(SurveyUnitContext);
  const { persons } = surveyUnit;
  return (
    <>
      {persons.map((person, index) => {
        return <Contact person={person} index={index + 1} selectFormType={selectFormType} />;
      })}

      <AtomicInfoTile
        iconType="home"
        data={getAddressData(surveyUnit)}
        onClickFunction={() => selectFormType(formEnum.ADDRESS, true)}
      />
    </>
  );
};

export default UEItem;
UEItem.propTypes = { selectFormType: PropTypes.func.isRequired };
