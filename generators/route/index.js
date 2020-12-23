const Generator = require('yeoman-generator');

class RouteGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('method', {
      alias: 'm',
      type: String,
      required: true,
      defaults: 'get',
      desc: 'Route method',
    });

    this.option('name', {
      alias: 'n',
      type: String,
      required: true,
      defaults: 'healthcheck',
      desc: 'Route name',
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
          default: this.options.name || 'healthcheck',
          message: 'What is the name of the route?',
        },
        {
          name: 'method',
          type: 'list',
          choices: ['get', 'post', 'delete', 'patch', 'put'],
          default: this.options.method || 'get',
          message: 'What is the method of the route?',
        },
      ]);

      this.options = { ...this.options, ...answers };
    }
  }

  default() {
    const { method, name } = this.options;
    const title = `${method.toUpperCase()} /${name}`;
    const moduleName = `${method}${name.charAt(0).toUpperCase()}${name.substring(1)}`;

    this.options = {
      ...this.options,
      title,
      moduleName,
    };
  }

  _writeCode() {
    const { method, name } = this.options;

    this.fs.copyTpl(
      this.templatePath('src/routes/name/index.ts'),
      this.destinationPath(`src/routes/${name}/index.ts`),
      this.options,
    );

    this.fs.copyTpl(
      this.templatePath('src/routes/name/method/index.ts'),
      this.destinationPath(`src/routes/${name}/${method}/index.ts`),
      this.options,
    );

    this.fs.copyTpl(
      this.templatePath('src/routes/name/method/handler.ts'),
      this.destinationPath(`src/routes/${name}/${method}/handler.ts`),
      this.options,
    );
  }

  _writeTest() {
    const { method, name } = this.options;

    this.fs.copyTpl(
      this.templatePath('test/routes/name/method/handler.test.ts'),
      this.destinationPath(`test/routes/${name}/${method}/handler.test.ts`),
      this.options,
    );
  }

  writing() {
    this.log(`Generating route for ${this.options.title}`);

    this._writeCode();
    this._writeTest();
  }

  end() {
    this.log(`Route ${this.options.title} has been generated`);
  }
}

module.exports = RouteGenerator;
