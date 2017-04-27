#!/usr/bin/env node
'use strict';

const chalk = require('chalk');
const replace = require('replace-in-file');
const options = {
  //Multiple files
  files: [
    'dist/errno-404',
    'tools/test.txt',
  ],

  //Glob(s)
  // files: [
  //   'path/to/files/*.html',
  //   'another/**/*.path',
  // ],

  //Replacement to make (string or regex)
  // from: /DOMAIN/g,
  // to: 'bar',

  //Multiple replacements with the same string (replaced sequentially)
  // from: [/SECURE/g, /DOMAIN/g],
  // to: 'bar',

  //Multiple replacements with different strings (replaced sequentially)
  from: [/SECURE/g, /DOMAIN/g],
  to: [process.env.SECURE ? 's' : '', process.argv[2]],

  //Specify if empty/invalid file paths are allowed (defaults to false)
  //If set to true these paths will fail silently and no error will be thrown.
  allowEmptyPaths: true,

  //Character encoding for reading/writing files (defaults to utf-8)
  encoding: 'utf8',
};

//Replace
try {
  const changedFiles = replace.sync(options);
  if (changedFiles.length > 0) {
    console.log(chalk.green(changedFiles.length, 'file(s) were changed'));
    changedFiles.forEach(file => console.log(chalk.grey('-', file)));
  }
  else {
    console.log(chalk.yellow('No files were changed'));
  }
}
catch (error) {
  console.errir(chalk.red('Error making replacements:'));
  console.error(error);
}
