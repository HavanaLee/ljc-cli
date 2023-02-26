#! /usr/bin/env node

const { program } = require('commander')
const chalk = require('chalk')




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
    .option('-f, --force', 'overwrite target directory if it exists')
    .action((name, options) => {
        require('./create.js')(name, options)
    })

program.parse(process.argv)