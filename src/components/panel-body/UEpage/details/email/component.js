import React, { useContext } from 'react';
import Modal from 'react-modal';
import Icon from '../icon/email.icon';
import EditIcon from '../icon/pen.icon';
import Form from './form';
import SurveyUnitContext from '../../UEContext';
import D from 'i18n';

Modal.setAppElement('#root');

const UEItem = ({ saveUE }) => {
  const ue = useContext(SurveyUnitContext);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const customStyles = {
    content: {
      backgroundColor: '#eeeeee',
      border: '3px solid black',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
  };

  const save = surveyUnit => {
    saveUE(surveyUnit);
    closeModal();
  };
  return (
    <div className="ue-item">
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
        <Form closeModal={closeModal} surveyUnit={ue} saveUE={save} />
      </Modal>
      <Icon width={40} />
      <div className="data">
        <span>
          <b>{D.surveyUnitEmail}</b>
        </span>
        <span>{ue.email}</span>
      </div>
      <EditIcon
        onClick={openModal}
        style={{ border: 'solid 1px black', borderRadius: '5px', margin: 'auto', padding: '2px' }}
        width={30}
      />
    </div>
  );
};

export default UEItem;
