// Create web server with Node.js
// Run with: node comments.js

var http = require('http');
var url = require('url');
var qs = require('querystring');

var comments = [];

var server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    var body = '';
    req.on('data', function (chunk) {
      body += chunk.toString();
    });
    req.on('end', function () {
      var query = qs.parse(body);
      comments.push(query.comment);
      showList(res);
    });
  } else {
    showForm(res);
  }
}).listen(3000);

function showForm(res) {
  res.setHeader('Content-Type', 'text/html');
  res.write('<!DOCTYPE html><html lang="ja">');
  res.write('<head><meta charset="utf-8">');
  res.write('<title>コメント</title></head>');
  res.write('<body><h1>コメント</h1>');
  res.write('<form method="POST" action="/">');
  res.write('<textarea name="comment"></textarea><br>');
  res.write('<input type="submit" value="送信">');
  res.write('</form>');
  res.write('</body></html>');
  res.end();
}

function showList(res) {
  res.setHeader('Content-Type', 'text/html');
  res.write('<!DOCTYPE html><html lang="ja">');
  res.write('<head><meta charset="utf-8">');
  res.write('<title>コメント</title></head>');
  res.write('<body><h1>コメント</h1>');
  res.write('<ul>');
  comments.forEach(function (comment) {
    res.write('<li>' + comment + '</li>');
  });
  res.write('</ul>');
  res.write('<a href="/">戻る</a>');
  res.write('</body></html>');
  res.end();
}