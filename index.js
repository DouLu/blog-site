const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogSite', { useNewUrlParser: true }, function (err) {
  if (err) {
    console.log('Connection Error:' + err)
  } else {
    console.log('Connection success!')
  }
});
const bodyParser = require('body-parser');
const views = require('express3-handlebars');

app.set('port', process.env.PORT || 5050);
app.listen(app.get('port'), function () {
  console.log('Express started in ' + app.get('env') + ' mode on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

app.use(express.static(__dirname + '/public'));

const handlebars = views.create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser());
app.get('/', function (req, res) {
  res.send('hello world');
});
app.get('/test', function (req, res) {
  res.render('home');
});