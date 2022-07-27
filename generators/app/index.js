"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
// Allocating path module
const path = require("path");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Hi!. You will get a\n${chalk.red("Sass project")}\nby\nDigitalWriters.art!`
      )
    );

    // Ask for proyect directory name
    const prompts = [
      {
        type: "input",
        name: "directoryName",
        message: "Add your project name?",
        default: "dwart-sass"
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  configuring() {
    // Destination folder
    this.destinationRoot(
      path.join(this.destinationPath(), this.props.directoryName)
    );
    this.log("Destination project folder: " + this.destinationPath());
    this.log(`Setting up ${chalk.green(this.destinationPath())} as project folder.`);

    // Package.json
    this.copyTemplate("package.json", "package.json");
    this.log(`${chalk.green("package.json")} file added!`);

    // Yarn.lock
    this.copyTemplate("yarn.lock", "yarn.lock");
    this.log(`${chalk.green("yarn.lock")} file added!`);

    // Gitignore
    this.copyTemplate(".gitignore", ".gitignore");
    this.log(`${chalk.green(".gitignore")} file added!`);

    // Setting environment path
    this.env.cwd = this.destinationPath()
    this.log("Setting environment path");
  }

  writing() {
    this.copyTemplate("src", "src");
  }

  /*
  outputLog() {
    this.log(this.props);
    this.log(this.templatePath());
    this.log(this.destinationPath());
    this.log(this.env);
  }
  */

  /*
  install() {
    this.addDevDependencies(["jest"]);
  }
  */

};
