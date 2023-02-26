const { stopSpinner } = require('./spinner.js')

const error = (msg, tag = null) => {
    stopSpinner()
    console.error(format(chalk.bgRed(' ERROR ') + (tag ? chalkTag(tag) : ''), chalk.red(msg)))
    _log('error', tag, msg)
    if (msg instanceof Error) {
        console.error(msg.stack)
        _log('error', tag, msg.stack)
    }
}

module.exports = { error }