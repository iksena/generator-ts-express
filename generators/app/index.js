const Generator = require('yeoman-generator');

const dbPrompts = require('./dbPrompts');

class MicroserviceGenerator extends Generator {
  initializing() {
    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    this.defaultProps = {
      name: pkg.name || this.appname,
      description: pkg.description || '',
      version: pkg.version || '1.0.0',
      nodeVersion: (pkg.engines && pkg.engines.node) || 14,
      repository: false,
    };
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        name: 'name',
        type: 'input',
        default: this.defaultProps.name,
        message: 'What is the name of your microservice?',
      },
      {
        name: 'nodeVersion',
        type: 'input',
        default: this.defaultProps.nodeVersion,
        message: 'What version of node will you be using?',
      },
      {
        name: 'hasRoute',
        type: 'confirm',
        default: true,
        message: 'Would you like to generate a route?',
      },
      {
        name: 'hasDb',
        type: 'confirm',
        default: false,
        message: 'Would you like to initialize postgres database?',
      },
      ...dbPrompts,
    ]);

    if (this.answers.hasRoute) await this.composeWith(require.resolve('../route'));
    if (this.answers.repository) await this.composeWith(require.resolve('../repository'));
  }

  writing() {
    const templates = [
      '.dockerignore',
      '.env.example',
      '.eslintrc.yml',
      'Dockerfile',
      'jest.config.ts',
      'package.json',
      'tsconfig.json',
      'tslint.json',
      'config/index.ts',
      'src/index.ts',
      'src/routes/index.ts',
      'src/middlewares/index.ts',
      'src/middlewares/common/index.ts',
      'src/middlewares/common/error.ts',
      'src/middlewares/common/notFound.ts',
      'src/middlewares/common/validateSchema.ts',
    ];

    const options = {
      ...this.defaultProps,
      ...this.config.getAll(),
      ...this.answers,
    };
    templates.forEach((filePath) => {
      this.fs.copyTpl(
        this.templatePath(filePath),
        this.destinationPath(filePath),
        options,
      );
    });
  }

  installing() {
    const { hasDb } = this.answers;
    const devDependencies = [
      '@types/bunyan',
      '@types/cors',
      '@types/express',
      '@types/http-errors',
      '@types/jest',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'eslint',
      'eslint-config-airbnb-base',
      'eslint-plugin-import',
      'jest',
      'ts-jest',
      'ts-node',
      'tslint',
      'typescript',
      ...hasDb ? ['@types/pg'] : [],
    ];
    const dependencies = [
      'body-parser',
      'bunyan',
      'cors',
      'dotenv',
      'express',
      'http-errors',
      'joi',
      ...hasDb ? ['pg'] : [],
    ];

    this.npmInstall(devDependencies, { 'save-dev': true });
    this.npmInstall(dependencies);
  }

  end() {
    this.log('Your microservice is ready!');
  }
}

module.exports = MicroserviceGenerator;
