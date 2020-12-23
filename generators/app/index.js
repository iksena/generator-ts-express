const Generator = require('yeoman-generator');

class MicroserviceGenerator extends Generator {
  initializing() {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    this.defaultProps = {
      name: this.pkg.name || this.appname,
      description: this.pkg.description || '',
      version: this.pkg.version || '1.0.0',
      engines: {
        node: this.pkg.engines.node || 14,
      },
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
        name: 'node',
        type: 'input',
        default: this.defaultProps.engines.node,
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
}

module.exports = MicroserviceGenerator;
