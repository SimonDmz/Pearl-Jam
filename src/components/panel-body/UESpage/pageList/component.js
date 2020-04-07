import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import suStateEnum from 'common-tools/enum/SUStateEnum';
import toDoEnum from 'common-tools/enum/SUToDoEnum';
import D from 'i18n';

const PageList = ({ surveyUnits, uesByPage }) => {
  const [page, setPage] = useState(0);
  const history = useHistory();

  const etatUEToAFaire = suState => {
    if (
      [
        suStateEnum.NOT_STARTED.type,
        suStateEnum.IN_PREPARATION.type,
        suStateEnum.AT_LEAST_ONE_CONTACT.type,
      ].includes(suState)
    ) {
      return toDoEnum.CONTACT;
    }
    if (suState === suStateEnum.APPOINTMENT_MADE.type) {
      return toDoEnum.SURVEY;
    }
    if (suState === suStateEnum.QUESTIONNAIRE_STARTED.type) {
      return toDoEnum.FINALIZE;
    }
    if (suState === suStateEnum.WAITING_FOR_VALIDATION.type) {
      return toDoEnum.TRANSMIT;
    }
    if (suState === suStateEnum.WAITING_FOR_SYNCHRONIZATION.type) {
      return toDoEnum.SYNCHRONIZE;
    }
  };

  const renderSimpleTable = sus => {
    return (
      <table className="ue-table">
        <thead>
          <tr>
            <th>{D.surveyHeader}</th>
            <th>{D.surveyUnitHeader}</th>
            <th>{D.fullNameHeader}</th>
            <th>{D.cityHeader}</th>
            <th>{D.toDoHeader}</th>
            <th>{D.actionHeader}</th>
          </tr>
        </thead>
        <tbody>
          {sus.map(su => (
            <tr key={su.id} onClick={() => history.push(`/survey-unit/${su.id}`)}>
              <td>{su.questionnaire}</td>
              <td>{su.id}</td>
              <td>{`${su.lastName} ${su.firstName}`}</td>
              <td>{su.address.city}</td>
              <td>{etatUEToAFaire(su.state)}</td>
              <td>
                <Link to={`survey-unit/${su.id}`}>{D.seeSurveyUnit}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderTable = ues => {
    let i;
    let j;
    let ueChunk;
    const tableSize = uesByPage || 10;
    const chunkSize = tableSize;
    if (ues.length <= tableSize) {
      return renderSimpleTable(ues);
    }
    const ueSplit = [];
    for (i = 0, j = ues.length; i < j; i += chunkSize) {
      ueChunk = ues.slice(i, i + chunkSize);
      ueSplit.push(ueChunk);
    }
    return (
      <>
        {renderSimpleTable(ueSplit[page])}
        <div className="div-nav-page">
          <button type="button" className="button-page nav" onClick={() => setPage(0)}>
            «
          </button>
          {ueSplit.map((ue, index) => (
            <button
              type="button"
              className={`button-page${index === page ? ' active' : ''}`}
              key={index}
              onClick={() => setPage(index)}
            >
              {index + 1}
            </button>
          ))}
          <button
            type="button"
            className="button-page nav"
            onClick={() => setPage(ueSplit.length - 1)}
          >
            »
          </button>
        </div>
      </>
    );
  };

  return <>{renderTable(surveyUnits)}</>;
};

export default PageList;
