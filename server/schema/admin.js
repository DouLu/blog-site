const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  name: String,
  pwd: String
});

const Admin = mongoose.model('Admin', adminSchema);
// init data
Admin.find(function (error, admin) {
  if (admin.length) return;
  new Admin({
    name: 'admin',
    pwd: 'admin'
  }).save();
});
module.exports = Admin;