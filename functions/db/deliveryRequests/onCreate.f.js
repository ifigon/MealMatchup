const functions = require('firebase-functions')

exports = module.exports = functions.database.ref('/delivery_requests/{pushId}').onCreate(event => {
    console.log("test")
});