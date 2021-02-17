import formEnum from 'common-tools/enum/formEnum';
import PropTypes from 'prop-types';
import React from 'react';
import Comment from './comment';
import './comments.scss';

const Comments = ({ selectFormType }) => {
  return (
    <div
      role="button"
      tabIndex={-2}
      onKeyDown={() => {}}
      onClick={() => selectFormType(formEnum.COMMENT, true)}
    >
      <Comment editable />
    </div>
  );
};

export default Comments;
Comments.propTypes = {
  selectFormType: PropTypes.func.isRequired,
};
