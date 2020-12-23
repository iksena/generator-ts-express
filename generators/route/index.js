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
      this.answers = await this.prompt([
        {
          name: 'name',
          type: 'input',
          default: 'healthcheck',
          message: 'What is the name of the route?',
        },
        {
          name: 'method',
          type: 'list',
          choices: ['get', 'post', 'delete', 'patch', 'put'],
          default: 'get',
          message: 'What is the method of the route?',
        },
      ]);

      this.options = { ...this.options, ...this.answers };
    }
  }

  writing() {
    const { method, name } = this.options;
    this.log(`Generating route for ${method.toUpperCase()} /${name}`);

    const options = {
      ...this.options,
      moduleName: `${method}${name.charAt(0).toUpperCase()}${name.substring(1)}`,
    };

    this.fs.copyTpl(
      this.templatePath('src/routes/name/index.ts'),
      this.destinationPath(`src/routes/${name}/index.ts`),
      options,
    );

    this.fs.copyTpl(
      this.templatePath('src/routes/name/method/index.ts'),
      this.destinationPath(`src/routes/${name}/${method}/index.ts`),
      options,
    );

    this.fs.copyTpl(
      this.templatePath('src/routes/name/method/handler.ts'),
      this.destinationPath(`src/routes/${name}/${method}/handler.ts`),
      options,
    );
  }

  end() {
    this.log(`Route ${this.options.method.toUpperCase()} /${this.options.name} has been generated`);
  }
}

module.exports = RouteGenerator;
