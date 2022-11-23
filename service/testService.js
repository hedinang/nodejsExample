const mongodb = require('../model/index')
function testAsync() {
    console.log('aaaa')
    mongodb.Student.find().
        then(r => {
            console.log('aaaa')
        }).catch(e => {
            console.log('aaaa')
        })
    console.log('aaaa')
    console.log('aaaa')
    return 'result'
}
module.exports = {
    testAsync
}