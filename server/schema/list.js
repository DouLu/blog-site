const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
  id: String,
  title: String,
  profile: String,
  img: String,
  supports: Number,
  comments: Number
});

const List = mongoose.model('List', listSchema);
// init data
List.find(function (error, list) {
  if (list.length) return;
  for (let i = 0; i < 5; i++) {
    const item = {
      id: `itemID${i}`,
      title: `有什么视频是你看完之后，觉得人生没有什么过不去的坎？${i}`,
      profile: '有什么视频是你看完之后，觉得人生没有什么过不去的坎？有什么视频是你看完之后，觉得人生没有什么过不去的坎？有什么视频是你看完之后，觉得人生没有什么过不去的坎？',
      img: `http://localhost:3000/public/img/icon.png`,
      supports: 349 + i,
      comments: 200 + i,
    };
    new List(item).save();
  }
});
module.exports = List;