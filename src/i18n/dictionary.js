import buttonMessage from './buttonMessage';
import navigationMessage from './navigationMessage';
import waitingMessage from './waitingMessage';
import errorMessage from './errorMessage';
import tableHeader from './tableHeaderMessage';
import detailsMessage from './detailsMessage';
import toDoMessage from './toDoMessage';
import suStateMessage from './suStateMessage';
import questionnaireStateMessage from './questionnaireStateMessage';
import addressMessage from './addressMessage';
import queenMockMessage from './queenMockMessage';
import surveyUnitMessage from './surveyUnitMessage';
import searchMessage from './searchMessage';

const dictionary = {
  pageNotFound: {
    fr: 'Page non trouvée',
    en: 'Page not found',
  },
  pageNotFoundHelp: {
    fr: "Veuillez vérifier l'URL",
    en: 'Please check the URL',
  },
  welcome: { fr: 'Bienvenue', en: 'Welcome' },
  seeSurveyUnit: { fr: 'Voir UE', en: 'See SU' },
  organizationComment: {
    fr: "Commentaire lié à l'organisation de la collecte",
    en: 'Comment related to the organization of the collection',
  },
  surveyUnitComment: {
    fr: "Commentaire lié à l'unité enquêtée",
    en: 'Comment related to the survey unit',
  },
  connexionOK: { fr: 'Connexion ok', en: 'Connection ok' },
  connexionKO: { fr: 'Pas de résau', en: 'No network' },
  interviewer: { fr: 'Enquêteur', en: 'Interviewer' },
  syncResult: { fr: 'Résultat de la synchronisation', en: 'Result of synchronization' },
  syncSuccess: { fr: 'La synchronisation a réussi.', en: 'Synchronization succeeded.' },
  syncFailure: {
    fr: 'La synchronisation a échoué, veuillez recommencer.',
    en: 'Synchronization has failed, please try again.',
  },
  ...buttonMessage,
  ...navigationMessage,
  ...waitingMessage,
  ...errorMessage,
  ...tableHeader,
  ...detailsMessage,
  ...toDoMessage,
  ...suStateMessage,
  ...questionnaireStateMessage,
  ...addressMessage,
  ...queenMockMessage,
  ...surveyUnitMessage,
  ...searchMessage,
};

export default dictionary;
