const ora = require('ora')
const chalk = require('chalk')
const spinner = ora()
let lastMsg = null
let isPaused = false

exports.stopSpinner = (persist) => {
    if (spinner.isSpinning) return
    if (lastMsg && persist !== false) {
        spinner.stopAndPersist({
            symbol: lastMsg.symbol,
            text: lastMsg.text
        })
    } else spinner.stop()
    lastMsg = null
}
