const mongodb = require('../model/index')
async function addApi(api) {
    console.log('aaaa')
    let result =  await mongodb.Api.create(api);
    return result
}
module.exports = {
    addApi
}