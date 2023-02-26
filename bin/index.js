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
const minimist = require('minimist')

program
    .name('ljc-cli')
    .version(require('../package.json').version)
    .usage('<command> [option]')

program
    .command('create <name>')
    .description('create a new project powered by ljc-cli')
    .option('-f, --force', 'overwrite target directory if it exists')
    .option('-g, --git [message]', 'Force git initialization with initial commit message')
    .action((name, opts) => {
        const options = cleanArgs(opts)
        if (minimist(process.argv.slice(3))._.length > 1) {
            console.log(chalk.yellow('\n Info: You provided more than one argument. The first one will be used as the app\'s name, the rest are ignored.'))
        }
        if (process.argv.includes('-g') || process.argv.includes('--git')) {
            options.forceGit = true
        }
        require('../lib/create.js')(name, options)
    })

program.parse(process.argv)

function camelize(str) {
    return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}
// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs(cmd) {
    const args = {}
    cmd.options.forEach(o => {
        const key = camelize(o.long.replace(/^--/, ''))
        // if an option is not present and Command has a method with the same name
        // it should not be copied
        if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
            args[key] = cmd[key]
        }
    })
    return args
}