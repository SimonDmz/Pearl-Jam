import AbstractIdbService from './abstract-idb-service';

class ContactAttemptIdbService extends AbstractIdbService {
  constructor() {
    super('contactAttempt');
  }

  findByIds(idArray) {
    return this.store
      .where('id')
      .anyOf(idArray)
      .toArray();
  }
}

export default new ContactAttemptIdbService();
