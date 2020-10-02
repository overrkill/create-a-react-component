#!/usr/bin/env node


//
//
//
//
//
// 

// no colors no fun on fs
const chalk = require('chalk');
const fs = require('fs');
const help = "\n\ncreate-react-component  ComponentName  [extension] [style]\n\n \t - extension -- js(default)/ts/tsx/jsx\n\t - style -- css(default)/scss/sass\n\n follows npm convention for naming folders\n\n";
const msg = " invalid Options Please try create-react-component --help or -h ";
//



console.log(`Create ${chalk.cyan('React Component')}`);


//getting the args
const args= process.argv.slice(2);


// check valid args
if(args.length<1 || args.length>3){
	
	console.log(msg);
	return;
}



if(args.length===1 && (args[0]==="--help" ||args[0]==="-h")){
	console.log(help);
	return;
}

if(args.length>=2 && (args[1]!=="js"  && args[1]!=="ts" && args[1]!=="jsx" && args[1]!=="tsx")){
	console.log(msg);
	return;
}
if(args.length===3 && (args[2]!=="css"  && args[2]!=="scss" && args[2]!=="sass" )){
	console.log(msg);
	return;
}


//get the name of component to create 
const fname=args[0];

//does all the job of creating component
function makeComponent(name , type = "js" , style = "css" ) {
	if(fs.existsSync(`./components/${name.toLowerCase()}`)){
		console.log(chalk.red(`${chalk.bold(name.toLowerCase())} component already exists`));
		return ;
	}
	else{
		fs.mkdirSync(`./components/${name.toLowerCase()}`);
		const component = fs.openSync(`./components/${name.toLowerCase()}/${name}.${type.toLowerCase()}`,'w');
		fs.closeSync(component);
		const componentStyle = fs.openSync(`./components/${name.toLowerCase()}/${name}.${style.toLowerCase()}`,'w');
		fs.closeSync(componentStyle);
		console.log(chalk.green(`${name.toLowerCase()} component created Successfully`));
	}
}

//
//
//call with sufficient args
//


function countOptions(params , name) {
	if(params===1){
		makeComponent(name);
	}
	else if(params===2){
		makeComponent(name,args[1]);
		
	}
	else if(params===3){
		makeComponent(name,args[1],args[2]);
	}
	else{
		console.log(chalk.bgRed("invalid options entered"));
		return;
	}
}


//check for component folder if not create !!


if(fs.existsSync('./components')){
	countOptions(args.length,fname);
}
else{
	console.log(chalk.yellow.underline("Creating components folder\n"));
	fs.mkdirSync("./components");
	countOptions(args.length,fname);
}


// not so necessary stuff
