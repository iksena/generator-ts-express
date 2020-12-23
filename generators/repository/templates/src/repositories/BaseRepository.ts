import { Client } from 'pg';
import Logger from 'bunyan';

class BaseRepository {
    protected db: Client;

    protected logger: Logger;

    constructor(db: Client, logger: Logger) {
      this.db = db;
      this.logger = logger;
    }
}

export default BaseRepository;
