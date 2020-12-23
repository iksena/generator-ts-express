const Generator = require('yeoman-generator');

class RepositoryGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('name', {
      alias: 'n',
      type: String,
      required: true,
      defaults: 'example',
      desc: 'Repository name',
    });

    this.option('table', {
      alias: 't',
      type: String,
      required: true,
      defaults: 'examples',
      desc: 'Repository database table',
    });

    this.option('options', {
      alias: 'o',
      type: Boolean,
      required: false,
      defaults: false,
      desc: 'Should generate with options',
    });
  }

  async prompting() {
    if (!this.options.options) {
      const answers = await this.prompt([
        {
          name: 'name',
          type: 'input',
          default: this.options.name || 'example',
          message: 'What is the name of the repository?',
        },
        {
          name: 'table',
          type: 'input',
          default: this.options.table || 'examples',
          message: 'What is the name of the table in database?',
        },
      ]);

      this.options = { ...this.options, ...answers };
    }
  }

  default() {
    const { name, table } = this.options;

    this.options = {
      ...this.options,
      name: `${name.charAt(0).toUpperCase()}${name.substring(1)}`,
      table: table.toUpperCase(),
    };
  }

  _writeCode() {
    const { name } = this.options;

    this.fs.copyTpl(
      this.templatePath('src/repositories/index.ts'),
      this.destinationPath('src/repositories/index.ts'),
      this.options,
    );

    this.fs.copyTpl(
      this.templatePath('src/repositories/BaseRepository.ts'),
      this.destinationPath('src/repositories/BaseRepository.ts'),
      this.options,
    );

    this.fs.copyTpl(
      this.templatePath('src/repositories/ExampleRepository.ts'),
      this.destinationPath(`src/repositories/${name}Repository.ts`),
      this.options,
    );
  }

  writing() {
    this.log(`Generating repository for ${this.options.name}`);

    this._writeCode();
  }

  end() {
    this.log(`${this.options.name}Repository has been generated`);
  }
}

module.exports = RepositoryGenerator;
