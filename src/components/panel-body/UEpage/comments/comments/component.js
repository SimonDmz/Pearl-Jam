import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import D from 'i18n';
import SurveyUnitContext from '../../UEContext';
import Form from './form';
import './comment.scss';

const Comment = ({ saveUE, title, editable }) => {
  const ue = useContext(SurveyUnitContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
  };
  const save = surveyUnit => {
    saveUE(surveyUnit);
    closeModal();
  };
  return (
    <div className="Comment">
      <p className="title">{title}</p>

      <div className="border">
        <div className="text">{editable ? ue.interviewerComment : ue.managementComment}</div>

        {editable === true && (
          <button type="button" onClick={openModal}>
            {` ✎ ${D.editButton}`}
          </button>
        )}
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
        <Form closeModal={closeModal} surveyUnit={ue} saveUE={save} />
      </Modal>
    </div>
  );
};

export default Comment;
Comment.propTypes = {
  editable: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  saveUE: PropTypes.func.isRequired,
};
