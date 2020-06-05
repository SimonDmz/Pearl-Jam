import D from 'i18n';

const contactOutcome = {
  INTERVIEW_ACCEPTED: { type: 'INA', value: `${D.interviewAccepted}` },
  REFUSAL: { type: 'REF', value: `${D.refusal}` },
  INTERVIEW_IMPOSSIBLE: { type: 'INI', value: `${D.interviewImpossible}` },
  ALREADY_ANSWERED: { type: 'ALA', value: `${D.alreadyAnswered}` },
  OUT_OF_SCOPE: { type: 'OOS', value: `${D.outOfScope}` },
};

export default contactOutcome;
