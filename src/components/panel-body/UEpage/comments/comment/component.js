import { getCommentByType } from 'common-tools/functions/surveyUnitFunctions';
import D from 'i18n';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import SurveyUnitContext from '../../UEContext';
import './comment.scss';
import Form from './form';

const Comment = ({ editable }) => {
  const ue = useContext(SurveyUnitContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  const value = editable ? getCommentByType('INTERVIEWER', ue) : getCommentByType('MANAGEMENT', ue);

  return (
    <div className="Comment">
      <div className="border">
        <div className="text" data-placeholder={D.organizationComment}>
          {value}
        </div>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
        <Form closeModal={closeModal} surveyUnit={ue} />
      </Modal>
    </div>
  );
};

export default Comment;
Comment.propTypes = {
  editable: PropTypes.bool.isRequired,
};
