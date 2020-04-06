import React, { useContext } from 'react';
import Modal from 'react-modal';
import Icon from '../icon/user.icon';
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
    <div className="ue-item ue">
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
        <Form closeModal={closeModal} surveyUnit={ue} saveUE={save} />
      </Modal>
      <Icon width={40} />
      <div className="data">
        <table>
          <tbody>
            <tr key={1}>
              <th>{D.surveyUnitCivility}</th>
              <td>{ue.civility}</td>
            </tr>
            <tr key={2}>
              <th>{D.surveyUnitLastName}</th>
              <td>{ue.lastName}</td>
            </tr>
            <tr key={3}>
              <th>{D.surveyUnitFirstName}</th>
              <td>{ue.firstName}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <EditIcon
        style={{ border: 'solid 1px black', borderRadius: '5px', margin: 'auto', padding: '2px' }}
        width={30}
        onClick={openModal}
      />
    </div>
  );
};

export default UEItem;
