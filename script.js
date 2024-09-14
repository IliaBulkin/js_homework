moment = require('moment')

function getDate() {
    const date = moment().format('L LTS')
    console.log(`${date}`)
}

getDate()