const express = require('express');
const router = express.Router();
const getList = require('./controllers/list');
const User = require('./schema/user');

const dbError = {
  code: 500,
  msg: '数据库报错',
};
const dbSuccess = {
  code: 200,
  msg: '成功',
};
const noData = {
  code: 300,
  msg: '没有数据',
};
router.post('/login', function (req, res) {
  const { data: { nickname, password } } = req.body;
  User.findOne({ nickname }).exec(function (err, user) {
    if (err) res.json(dbError);
    if (!user || user.password !== password) {
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

router.post('/register', function (req, res) {
  const { data } = req.body;
  const { email } = data;
  if (!data) res.json(noData);

  User.findOne({ email: email }).exec(function (err, user) {
    if (err) res.json(dbError);
    if (user) {
      res.json({
        code: 400,
        msg: '邮箱已注册',
      });
    } else {
      User.create(data, function (err) {
        if (err) res.json(dbError);
        res.json(dbSuccess);
      });
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