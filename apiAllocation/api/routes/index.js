const bodyParser = require('body-parser');
const departaments = require('./departamentRoute');


module.exports = app => {

    app.use(bodyParser.json());
    app.use(departaments);
}