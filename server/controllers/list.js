const List = require('../schema/list');
/* List.find({ name: 'list' }, function (error, list) {
  if (error) console.log('error_____', error);
  console.log('list data ________', list);
}); */

module.exports = function getList() {
  return List.find({}).exec();
}

/* module.exports = function getItem() {
  return List.find({ id: 'itemID0' }).exec();
} */