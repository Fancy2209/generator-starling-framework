'use strict';
const Generator = require ("yeoman-generator");

module.exports = class extends Generator {
	
	prompting () {
		
		this.log (chalk.bold.red ("Generator for Starling Framework NPM projects"));
		
		this.log ("");
		// LogHelper.println ("\x1b[1mOpenFL Command-Line Tools\x1b[0;1m (" + getToolsVersion () + ")\x1b[0m");
			
		
		
		// this.log (
		//   chalk.cyan('OpenFL') + ' NPM project generator'
		// );
		
		const prompts = [{
			type: "input",
			name: "name",
			message: "Your project name",
			default: this.appname
		},
		{
			type: "list",
			name: "language",
			message: "Source language",
			choices: [ "TypeScript", "Haxe", "ES6/JavaScript", "ES5/JavaScript", "AS3/Royale" ],
			default: "TypeScript"
		}];
		
		return this.prompt (prompts).then (props => {
			
			this.props = props;
			this.packageName = this.props.name.replace (" ", "").toLowerCase ();
			
		});
		
	}

	writing () {
		
		var templateContext = {
			name: this.props.name,
			packageName: this.packageName
		}
		
		switch (this.props.language) {
			
			case "ES5/JavaScript":
				this.fs.copyTpl (
					this.templatePath ("es5/**/*"),
					this.destinationRoot (),
					templateContext
				)
			
			case "ES6/JavaScript":
				this.fs.copyTpl (
					this.templatePath ("es6/**/*"),
					this.destinationRoot (),
					templateContext
				)
				break;
				
			case "AS3/Royale":
				this.fs.copyTpl (
					this.templatePath ("as3/**/*"),
					this.destinationRoot (),
					templateContext
				)
				break;
			
			case "Haxe":
				this.fs.copyTpl (
					this.templatePath ("haxe/**/*"),
					this.destinationRoot (),
					templateContext
				)
				break;
			
			case "TypeScript":
				this.fs.copyTpl (
					this.templatePath ("typescript/**/*"),
					this.destinationRoot (),
					templateContext
				)
				break;
			
		}
		
	}
	
	install () {
		
		const packageJson = {}
		this.fs.extendJSON(this.destinationPath('package.json'), packageJson)
		this.spawnCommand('npm', 'install')
	}
};
