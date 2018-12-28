
module.exports = function (app) {
    app.use('/', require('./router'));
    app.use('/api', require('../api'));
};
