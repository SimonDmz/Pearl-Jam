import Orchestrator from 'components/common/orchestrator';
import React from 'react';
import questionnaire from './questionnaire.json';

const Identification = () => {
  const Collect = () => <Orchestrator source={questionnaire} data={{}} features={['VTL']} />;

  return <div className="Contacts">{Collect()}</div>;
};

export default Identification;
Identification.propTypes = {};
