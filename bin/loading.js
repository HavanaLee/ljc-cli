const ora = require('ora')
const sipner = ora('Loading Start...')

sipner.start()
setTimeout(() => {
    sipner.color = 'blue'
    sipner.text = 'Waiting for completion...'
}, 1000);


module.exports = sipner