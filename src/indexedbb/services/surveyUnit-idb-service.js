import AbstractIdbService from './abstract-idb-service';

class SurveyUnitIdbService extends AbstractIdbService {
  constructor() {
    super('surveyUnit');
  }

  findByLastName(lastName) {
    return this.store
      .where('lastName')
      .startsWith(lastName)
      .toArray();
  }
}

export default new SurveyUnitIdbService();
