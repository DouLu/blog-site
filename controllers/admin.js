const Admin = require('./schema/admin');
Admin.find({ name: 'admin' }, function (error, admin) {
  if (error) console.log('error_____', error);
  console.log('admin data ________', admin);
});