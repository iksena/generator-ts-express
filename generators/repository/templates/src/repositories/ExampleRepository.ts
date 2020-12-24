import BaseRepository from './BaseRepository';

type <%= title %> = {
  id: number;
}

class <%= title %>Repository extends BaseRepository {
  async findAll(): Promise<<%= title %>[]> {
    this.logger.debug(`[DB - <%= table %>] Find all <%= table %>.`);

    try {
      const { rows } = await this.db.query('SELECT * FROM <%= table %>');

      return rows;
    } catch (error) {
      this.logger.error(error, `[DB - <%= table %>] Failed to find all <%= table %>.`);

      throw new Error('Failed to find all <%= table %>.');
    }
  }
}

export default <%= title %>Repository;
