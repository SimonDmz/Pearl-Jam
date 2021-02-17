import { makeStyles, Modal } from '@material-ui/core';
import D from 'i18n';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Comments from './comments';
import Contacts from './contacts';
import Details from './details';
import { getForm, getPreviousValue } from './forms';
import Identification from './identification';
import Letters from './letters';
import Navigation from './navigation/component';
import StateLine from './stateLine';
import SurveyUnitContext from './UEContext';
import UeSubInfoTile from './ueSubInfoTile';

const Router = ({ match, saveUE }) => {
  const surveyUnit = useContext(SurveyUnitContext);

  /** refs are used for scrolling, dispatched to the clickable link and linked element */
  const detailsRef = useRef('details');
  const identificationRef = useRef('spotting');
  const lettersRef = useRef('letters');
  const contactsRef = useRef('contacts');
  const commentsRef = useRef('comments');
  const refs = { detailsRef, identificationRef, lettersRef, contactsRef, commentsRef };

  /** Form type is dynamically inserted in Modal, with previousValue for edition if needed */
  const [formType, setFormType] = useState(undefined);
  const [editionMode, setEditionMode] = useState(false);
  const [previousValue, setPreviousValue] = useState(undefined);
  const [openModal, setOpenModal] = useState(false);

  /** update the previousValue */
  useEffect(() => {
    let value;
    if (editionMode) {
      value = getPreviousValue(formType, surveyUnit);
    }
    setPreviousValue(value);
  }, [formType, editionMode, surveyUnit]);

  /** double setter given to sub-components */
  const selectFormType = (newFormType, isEditionMode) => {
    setFormType(newFormType);
    setEditionMode(isEditionMode);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  // const selectedForm = getForm(saveUE, previousValue)[formType];
  const selectedForm = getForm(formType, saveUE, previousValue, closeModal);

  const useStyles = makeStyles(() => ({
    ajustScroll: {
      height: 'calc(100vh - 3em)',
    },
  }));
  const classes = useStyles();

  return (
    <>
      <div>
        <StateLine />
        <Navigation refs={refs} match={match} />
        <div>
          <UeSubInfoTile reference={detailsRef} title={D.goToContactDetailsPage}>
            <Details selectFormType={selectFormType} />
          </UeSubInfoTile>
          <UeSubInfoTile reference={identificationRef} title={D.goToSpottingPage}>
            <Identification selectFormType={selectFormType} />
          </UeSubInfoTile>
          <UeSubInfoTile reference={lettersRef} title={D.goToMailsPage}>
            <Letters selectFormType={selectFormType} />
          </UeSubInfoTile>
          <UeSubInfoTile reference={contactsRef} title={D.goToContactPage}>
            <Contacts saveUE={saveUE} selectFormType={selectFormType} />
          </UeSubInfoTile>
          <UeSubInfoTile
            reference={commentsRef}
            title={D.goToCommentsPage}
            className={classes.ajustScroll}
          >
            <Comments saveUE={saveUE} selectFormType={selectFormType} />
          </UeSubInfoTile>
        </div>
      </div>
      <Modal
        open={openModal}
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {selectedForm !== undefined ? selectedForm : <div>toto</div>}
      </Modal>
      <button type="button" onClick={() => setOpenModal(true)}>
        open form
      </button>
    </>
  );
};

export default Router;
Router.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  saveUE: PropTypes.func.isRequired,
};
