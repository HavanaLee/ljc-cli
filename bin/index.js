#! /usr/bin/env node

const chalk = require('chalk')
const semver = require('semver')
const requiredVersion = require('../package.json').engines.node // node最低要求

// 检查node版本是否符合脚手架要求
function checkNodeVersion(wanted, id) {
    if (!semver.satisfies(process.version, wanted, { includePrerelease: true })) {
        console.log(chalk.red(
            'You are using Node ' + process.version + ', but this version of ' + id +
            ' requires Node ' + wanted + '.\nPlease upgrade your Node version.'
        ));
        process.exit(1)
    }
}

checkNodeVersion(requiredVersion, 'ljc-cli')


const { program } = require('commander')
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