import BaseRepository from './BaseRepository';

type <%= name %> = {
  id: number;
}

class <%= name %>Repository extends BaseRepository {
  async findAll(): Promise<<%= name %>[]> {
    this.logger.debug(`[DB - <%= table %>] Find all <%= name %>s.`);

    try {
      const { rows } = await this.db.query('SELECT * FROM <%= table %>');

      return rows;
    } catch (error) {
      this.logger.error(error, `[DB - <%= table %>] Failed to find all <%= name %>s.`);

      throw new Error('Failed to find all <%= name %>s.');
    }
  }
}

export default <%= name %>Repository;
