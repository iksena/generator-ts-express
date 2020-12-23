const Generator = require('yeoman-generator');

class RouteGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('method', {
      type: String,
      required: true,
      defaults: 'get',
      desc: 'Route method',
    });

    this.option('name', {
      type: String,
      required: true,
      defaults: 'healthcheck',
      desc: 'Route name',
    });
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
    this.log(`Route ${this.options.method} /${this.options.name} has been generated`);
  }
}

module.exports = RouteGenerator;
