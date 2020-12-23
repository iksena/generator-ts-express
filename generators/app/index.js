const Generator = require('yeoman-generator');

class MicroserviceGenerator extends Generator {
  initializing() {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    this.defaultProps = {
      name: this.pkg.name || this.appname,
      description: this.pkg.description || '',
      version: this.pkg.version || '1.0.0',
      nodeVersion: (this.pkg.engines && this.pkg.engines.node) || 14,
    };
  }

  async prompting() {
    const validate = (input) => input.length > 0 || 'Please input a value';
    const shouldPromptDb = ({ postgres }) => postgres;

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
        name: 'healthcheck',
        type: 'confirm',
        default: true,
        message: 'Would you like to generate a health check route?',
      },
      {
        name: 'postgres',
        type: 'confirm',
        default: false,
        message: 'Would you like to initialize postgres database?',
      },
      {
        name: 'dbHost',
        type: 'input',
        when: shouldPromptDb,
        default: '',
        message: 'Input your database host',
        validate,
      },
      {
        name: 'dbPort',
        type: 'input',
        when: shouldPromptDb,
        default: '30023',
        message: 'Input your database port',
        validate,
      },
      {
        name: 'dbName',
        type: 'input',
        when: shouldPromptDb,
        default: '',
        message: 'Input your database name',
        validate,
      },
      {
        name: 'dbUser',
        type: 'input',
        when: shouldPromptDb,
        default: '',
        message: 'Input your database user',
        validate,
      },
      {
        name: 'dbPassword',
        type: 'input',
        when: shouldPromptDb,
        default: '',
        message: 'Input your database password',
      },
      {
        name: 'repository',
        type: 'confirm',
        when: shouldPromptDb,
        default: true,
        message: 'Would you like to generate an example repository for your database?',
      },
    ]);
  }

  default() {
    if (this.answers.healthcheck) {
      this.composeWith(
        require.resolve('../route'),
        {
          name: 'healthcheck',
          method: 'get',
          options: true,
        },
      );
    }
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
    ];
    const dependencies = ['body-parser', 'bunyan', 'cors', 'dotenv', 'express', 'http-errors', 'joi'];

    this.npmInstall(devDependencies, { 'save-dev': true });
    this.npmInstall(dependencies);
  }

  end() {
    this.log('Your microservice is ready!');
  }
}

module.exports = MicroserviceGenerator;
