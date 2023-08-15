const bodyParser = require('body-parser');
const department = require('./departmentRoute');
const courses = require('./coursesRoute');
const professor = require('./professorRoute');
const allocation = require('./allocationRoute');

module.exports = app => {

    app.use(bodyParser.json());
    app.use(department);
    app.use( courses);
    app.use(professor);
    app.use(allocation);
}
