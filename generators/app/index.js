const Generator = require('yeoman-generator');

class MicroserviceGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.log('hello world');
  }
}

module.exports = MicroserviceGenerator;
