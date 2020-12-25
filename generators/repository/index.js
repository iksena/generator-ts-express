const Generator = require('yeoman-generator');

class RepositoryGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.config.defaults({
      repository: {
        name: 'example',
        table: 'examples',
      },
    });
  }

  async prompting() {
    this.log('--- Generate a repository ---');

    const { name, table } = this.config.get('repository');
    this.answers = await this.prompt([
      {
        name: 'name',
        type: 'input',
        default: name,
        message: 'What is the name of the repository?',
      },
      {
        name: 'table',
        type: 'input',
        default: table,
        message: 'What is the name of the table in database?',
      },
    ]);
  }

  default() {
    const { name } = this.answers;

    this.answers = {
      ...this.answers,
      title: `${name.charAt(0).toUpperCase()}${name.substring(1)}`,
    };
    this.config.set('repository', this.answers);
  }

  _writeCode() {
    const { title } = this.answers;

    this.fs.copyTpl(
      this.templatePath('src/repositories/index.ts'),
      this.destinationPath('src/repositories/index.ts'),
      this.answers,
    );

    this.fs.copyTpl(
      this.templatePath('src/repositories/BaseRepository.ts'),
      this.destinationPath('src/repositories/BaseRepository.ts'),
      this.answers,
    );

    this.fs.copyTpl(
      this.templatePath('src/repositories/ExampleRepository.ts'),
      this.destinationPath(`src/repositories/${title}Repository.ts`),
      this.answers,
    );
  }

  writing() {
    this.log(`Generating repository for ${this.answers.title}`);

    this._writeCode();
  }

  end() {
    this.log(`${this.answers.title}Repository has been generated`);
  }
}

module.exports = RepositoryGenerator;
