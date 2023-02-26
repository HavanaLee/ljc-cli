#! /usr/bin/env node

const { program } = require('commander')
const chalk = require('chalk')
const inquirer = require('inquirer')
const questionList = require('./question.js')


program
    .name('ljc-cli')
    .version(require('../package.json').version)
    .usage('<command> [option]')

program
    .command('clone <source> [destination]')
    .description('clone a repository into a newly created directory')
program
    .command('create <name>')
    .description('create a new project powered by ljc-cli')
    .action((name) => {
        inquirer.prompt(questionList).then(res => {
            console.log(res);
            const sipner = require('./loading.js')
        })
    })

program.parse(process.argv)