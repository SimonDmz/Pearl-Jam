import formEnum from 'common-tools/enum/formEnum';
import { getAddressData } from 'common-tools/functions';
import D from 'i18n';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import AtomicInfoTile from '../atomicInfoTile';
import SurveyUnitContext from '../UEContext';
import Contact from './contact';
import DetailTile from './detailTile';

const UEItem = ({ selectFormType }) => {
  const surveyUnit = useContext(SurveyUnitContext);
  const { persons } = surveyUnit;
  return (
    <>
      {persons.map((person, index) => {
        return <Contact person={person} index={index + 1} selectFormType={selectFormType} />;
      })}
      <DetailTile label={D.surveyUnitHousing}>
        <AtomicInfoTile
          iconType="home"
          data={getAddressData(surveyUnit)}
          onClickFunction={() => selectFormType(formEnum.ADDRESS, true)}
        />
      </DetailTile>
    </>
  );
};

export default UEItem;
UEItem.propTypes = { selectFormType: PropTypes.func.isRequired };
