import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import convertSUStateInToDo from 'common-tools/functions/convertSUStateInToDo';
import { formatDistanceStrict } from 'date-fns';
import D from 'i18n';

const PageList = ({ surveyUnits, uesByPage }) => {
  const [page, setPage] = useState(0);
  const history = useHistory();

  const intervalInDays = su => {
    const { collectionStartDate, collectionEndDate } = su;

    const remainingDays = formatDistanceStrict(
      new Date(collectionStartDate),
      new Date(collectionEndDate),
      {
        roundingMethod: 'ceil',
        unit: 'day',
      }
    );

    return remainingDays.split(' ')[0];
  };

  const renderSimpleTable = sus => {
    return (
      <table className="ue-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>{D.surveyHeader}</th>
            <th>{D.sampleHeader}</th>
            <th>{D.surveyUnitHeader}</th>
            <th>{D.fullNameHeader}</th>
            <th>{D.cityHeader}</th>
            <th>{D.toDoHeader}</th>
            <th>{D.remainingDaysHeader}</th>
            <th>{D.priorityHeader}</th>
            <th>{D.actionHeader}</th>
          </tr>
        </thead>
        <tbody>
          {sus.map(su => (
            <tr
              key={su.id}
              onClick={() => {
                history.push(`survey-unit/${su.id}`);
              }}
            >
              <td role="gridcell" onClick={e => e.stopPropagation()}>
                <input type="checkbox" />
              </td>
              <td>{su.questionnaire}</td>
              <td>{su.sampleId}</td>
              <td>{su.id}</td>
              <td>{`${su.lastName} ${su.firstName}`}</td>
              <td>{su.address.city}</td>
              <td>{convertSUStateInToDo(su.state)}</td>
              <td className="align-right">{intervalInDays(su)}</td>
              <td className="align-center">
                {su.priority && (
                  <span role="img" aria-label="priority">
                    🚩
                  </span>
                )}
              </td>
              <td className="align-center">
                <Link to={`survey-unit/${su.id}`}>
                  <span role="img" aria-label="calendar" title={D.seeSurveyUnit}>
                    📅
                  </span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderTable = ues => {
    const sortedUes = ues.sort(
      (ueA, ueB) =>
        ueA.questionnaire.localeCompare(ueB.questionnaire) || ueA.sampleId - ueB.sampleId
    );
    let i;
    let j;
    let ueChunk;
    const tableSize = uesByPage || 10;
    const chunkSize = tableSize;
    if (sortedUes.length <= tableSize) {
      return renderSimpleTable(sortedUes);
    }
    const ueSplit = [];
    for (i = 0, j = ues.length; i < j; i += chunkSize) {
      ueChunk = sortedUes.slice(i, i + chunkSize);
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
