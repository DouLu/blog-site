const getList = require('./controllers/list');
const getItem = require('./controllers/list');
module.exports = function apiMid(req, res, next) {
  const apiFn = req.path.split('/')[1];
  switch (apiFn) {
    case 'list':
      getList().then((data) => {
        const responseData = {
          code: 200,
          msg: 'success',
          data: data,
        };
        res.json(responseData);
      }).catch((err) => {
        const responseData = {
          code: 500,
          msg: 'fail',
          data: []
        };
        res.json(responseData);
      });
      break;
    default:
      const responseData = {
        code: 500,
        msg: 'fail',
        data: null
      };
      res.json(responseData);
      break;
  }
}