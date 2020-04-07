import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Comment from './comments';
import D from 'i18n';
import './comments.scss';

const Comments = ({ saveUE }) => {
  const locationUrl = useHistory().location.pathname;
  const save = unite => {
    saveUE(unite, locationUrl);
  };
  return (
    <div className="Comments">
      <h2>{D.organizationComment}</h2>
      <Comment title={D.interviewer} editable saveUE={save} />
      <Comment title="DEM" editable={false} saveUE={save} />
    </div>
  );
};

export default Comments;
Comments.propTypes = {
  saveUE: PropTypes.func.isRequired,
};
