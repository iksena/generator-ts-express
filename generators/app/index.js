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
        message: 'Would you like to to generate a health check route?',
      },
      {
        name: 'postgres',
        type: 'confirm',
        default: false,
        message: 'Would you like to to initialize postgres database?',
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
      this.log(filePath);
      this.fs.copyTpl(
        this.templatePath(filePath),
        this.destinationPath(filePath),
        options,
      );
    });
  }

  installing() {
    const devDependencies = ['@types/bunyan', '@types/cors', '@types/express', '@types/http-errors',
      '@typescript-eslint/eslint-plugin', '@typescript-eslint/parser', 'eslint', 'eslint-config-airbnb-base',
      'eslint-plugin-import', 'tslint', 'typescript'];
    const dependencies = ['body-parser', 'bunyan', 'cors', 'dotenv', 'express', 'http-errors', 'joi'];

    this.npmInstall(devDependencies, { 'save-dev': true });
    this.npmInstall(dependencies);
  }

  end() {
    this.log('Your microservice is ready!');
  }
}

module.exports = MicroserviceGenerator;
