const Generator = require('yeoman-generator');

class RouteGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.config.defaults({
      route: {
        name: 'healthcheck',
        method: 'get',
      },
    });
  }

  async prompting() {
    const route = this.config.get('route');
    this.answers = await this.prompt([
      {
        name: 'name',
        type: 'input',
        default: route.name,
        message: 'What is the name of the route?',
      },
      {
        name: 'method',
        type: 'list',
        choices: ['get', 'post', 'delete', 'patch', 'put'],
        default: route.method,
        message: 'What is the method of the route?',
      },
    ]);
  }

  default() {
    const { method, name } = this.answers;
    const title = `${method.toUpperCase()} /${name}`;
    const moduleName = `${method}${name.charAt(0).toUpperCase()}${name.substring(1)}`;

    this.answers = {
      ...this.answers,
      title,
      moduleName,
    };
    this.config.set('route', this.answers);
  }

  _writeCode() {
    const { method, name } = this.answers;

    this.fs.copyTpl(
      this.templatePath('src/routes/name/index.ts'),
      this.destinationPath(`src/routes/${name}/index.ts`),
      this.answers,
    );

    this.fs.copyTpl(
      this.templatePath('src/routes/name/method/index.ts'),
      this.destinationPath(`src/routes/${name}/${method}/index.ts`),
      this.answers,
    );

    this.fs.copyTpl(
      this.templatePath('src/routes/name/method/handler.ts'),
      this.destinationPath(`src/routes/${name}/${method}/handler.ts`),
      this.answers,
    );
  }

  _writeTest() {
    const { method, name } = this.answers;

    this.fs.copyTpl(
      this.templatePath('test/routes/name/method/handler.test.ts'),
      this.destinationPath(`test/routes/${name}/${method}/handler.test.ts`),
      this.answers,
    );
  }

  writing() {
    this.log(`Generating route for ${this.answers.title}`);

    this._writeCode();
    this._writeTest();
  }

  end() {
    this.log(`Route ${this.answers.title} has been generated`);
  }
}

module.exports = RouteGenerator;
