import React, { useContext } from 'react';
import Modal from 'react-modal';
import D from 'i18n';
import Icon from '../icon/house.icon';
import EditIcon from '../icon/pen.icon';
import Form from './form';
import SurveyUnitContext from '../../UEContext';

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

  if (ue.address) {
    return (
      <div className="ue-item adresse">
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
          <Form closeModal={closeModal} surveyUnit={ue} saveUE={save} />
        </Modal>
        <Icon width={40} />
        <div className="data">
          <table>
            <tbody>
              <tr key={1}>
                <th>{D.addressDeliveryPoint}</th>
                <td>{ue.address.l1}</td>
              </tr>
              <tr key={2}>
                <th>{D.addressAdditionalAddress}</th>
                <td>{ue.address.l2}</td>
              </tr>
              <tr key={3}>
                <th>{D.addressNumber}</th>
                <td>{ue.address.l3}</td>
              </tr>
              <tr key={4}>
                <th>{D.addressStreetType}</th>
                <td>{ue.address.l4}</td>
              </tr>
              <tr key={5}>
                <th>{D.addressStreetName}</th>
                <td>{ue.address.l5}</td>
              </tr>
              <tr key={6}>
                <th>{D.addressPostcode}</th>
                <td>{ue.address.l6}</td>
              </tr>
              <tr key={7}>
                <th>{D.addressCity}</th>
                <td>{ue.address.l7}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <EditIcon
          onClick={openModal}
          style={{ border: 'solid 1px black', borderRadius: '5px', margin: 'auto', padding: '2px' }}
          width={30}
        />
      </div>
    );
  }
  return (
    <div className="ue-item adresse">
      <Icon width={40} />
      <div className="data">Pas d&aposadresse</div>
    </div>
  );
};

export default UEItem;
