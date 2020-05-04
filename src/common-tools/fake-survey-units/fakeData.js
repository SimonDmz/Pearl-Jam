import suStateEnum from 'common-tools/enum/SUStateEnum';

const rootSurveyUnit = {
  civility: 'Monsieur',
  lastName: 'MANGIN',
  firstName: 'Jean',
  address: {
    deliveryPoint: '',
    additionalAdress: '',
    number: '1',
    streetType: 'Rue',
    streetName: 'Principale',
    postcode: '54000',
    city: 'Maxéville',
  },
  phone: ['06 95 68 45 95', '03 87 73 22 00'],
  priority: true,
  sampleId: 1,
  state: suStateEnum.NOT_STARTED.type,
  questionnaire: 'vqs2021x00',
  collectionStartDate: '2021-06-01',
  collectionEndDate: '2021-06-30',
  interviewerComment: '',
  managementComment: 'Beware of the dog.',
  questionnaireState: '',
};

const fakeData = [
  {
    ...rootSurveyUnit,
    id: '11',
    questionnaire: 'simpsons2020x00',
    sampleId: Math.floor(Math.random() * 100) + 1,
    collectionStartDate: '2020-01-01',
    collectionEndDate: '2020-12-31',
  },
  {
    ...rootSurveyUnit,
    id: '12',
    firstName: 'Pierre',
    questionnaire: 'simpsons2020x00',
    sampleId: Math.floor(Math.random() * 100) + 1,
    priority: false,
    collectionStartDate: '2020-01-01',
    collectionEndDate: '2020-12-31',
  },
  {
    ...rootSurveyUnit,
    id: '21',
    firstName: 'Michel',
    sampleId: Math.floor(Math.random() * 100) + 1,
  },
  {
    ...rootSurveyUnit,
    id: '22',
    firstName: 'Tom',
    priority: false,
    sampleId: Math.floor(Math.random() * 100) + 1,
  },
];

export default fakeData;
