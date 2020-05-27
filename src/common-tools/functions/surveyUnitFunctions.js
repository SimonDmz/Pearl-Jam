export const getCommentByType = (type, ue) => {
  if (Array.isArray(ue.comments) && ue.comments.length > 0) {
    return ue.comments.find(x => x.type === type).value;
  }
  return '';
};

export const getLastState = ue => {
  if (Array.isArray(ue.states) && ue.states.length > 0) {
    return ue.states.reduce((a, b) => (a.date > b.date ? a : b));
  }
  return false;
};
