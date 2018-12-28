const express = require('express');
const router = express.Router();
const getList = require('./controllers/list');
const Admin = require('./schema/admin');

router.post('/login', function (req, res) {
  const { userName, password } = req.body;
  Admin.findOne({ name: userName }).exec(function (err, user) {
    if (err) {
      const responseData = {
        code: 500,
        msg: '数据库报错',
      };
      res.json(responseData);
    }
    if (!user || user.pwd !== password) {
      const responseData = {
        code: 400,
        msg: '验证失败，用户名或者密码错误',
      };
      res.json(responseData);
    } else {
      const responseData = {
        code: 200,
        msg: '验证成功',
      };
      res.json(responseData);
    }
  });
});

router.get('/list', function (req, res) {
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
});

module.exports = router;