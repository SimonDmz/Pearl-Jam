import { Grid } from '@material-ui/core';
import formEnum from 'common-tools/enum/formEnum';
import { getMailData, getPhoneData, getUserData } from 'common-tools/functions';
import D from 'i18n';
import PropTypes from 'prop-types';
import React from 'react';
import AtomicInfoTile from '../atomicInfoTile';
import DetailTile from './detailTile';
import PhoneTile from './phoneTile';

const Contact = ({ person, selectFormType, index }) => {
  return (
    <DetailTile label={`${D.surveyUnitIndividual} ${index}`}>
      <Grid container>
        <AtomicInfoTile
          iconType="user"
          data={getUserData(person)}
          onClickFunction={() => selectFormType(formEnum.USER, true)}
        />
        <PhoneTile
          phoneNumbers={getPhoneData(person)}
          onClickFunction={() => selectFormType(formEnum.PHONE, true)}
        ></PhoneTile>

        <AtomicInfoTile
          iconType="mail"
          data={getMailData(person)}
          onClickFunction={() => selectFormType(formEnum.MAIL, true)}
        />
      </Grid>
    </DetailTile>
  );
};

export default Contact;
Contact.propTypes = {
  selectFormType: PropTypes.func.isRequired,
  person: PropTypes.shape({}).isRequired,
  index: PropTypes.number.isRequired,
};
