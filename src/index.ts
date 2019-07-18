#!/usr/bin/env node
/* eslint-disable */

import chalk from 'chalk';
const clear = require('clear');
const figlet = require('figlet');
// const path = require('path');
import program from 'commander';

clear();
console.log(
  chalk.red(
    figlet.textSync('node-ts-cli-template', { horizontalLayout: 'full' })
  )
);

program
	.version('0.0.1')
  .description("A CLI template project")
  .option('-l, --list', 'List items')
  .option('-i, --item <itemid>', 'Show item with id [itemid]')
	.parse(process.argv);
	
console.log('Here is what you did:');
if (program.list) console.log('Item list goes here');
if (program.item) console.log(`Item with id ${program.item} is shown here`);

if (!process.argv.slice(2).length) {
	program.outputHelp();
}
