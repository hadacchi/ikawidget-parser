'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    Realm = require('realm'),
    sm = require('./stats-model.js');  // Realm studioで出力したスキーマ

var app = express();

// スキーマのバージョン取得
const currentVer = Realm.schemaVersion('stats.realm');

var ikaRealm = new Realm({
    path: 'stats.realm',
    schema: [sm.Result, sm.Stage, sm.Game, sm.Player, sm.Weapon, sm.Gear,
             sm.Brand, sm.Skill, sm.Skills, sm.Fes, sm.SkillLog,
             sm.Special, sm.SubWeapon],
    schemaVersion: currentVer
});

//可視化機能
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs')

// GETで/にアクセスされた場合の処理
app.get('/', function(req, res) {
  /* スキーマのnameを指定するぽい
   * noでソートしてテンプレートに渡す
   */
  let results = ikaRealm.objects('Result').sorted('no', true);
  res.render('index.ejs', {results: results});
});

/*
app.get('/write', function(req, res) {
    res.sendFile(__dirname + "/write.html");
});

app.post('/write', function(req, res) {
    let title = req.body['title'],
        content = req.body['content'],
        timestamp = new Date();
    blogRealm.write(() => {
        blogRealm.create('Post',{title: title, content: content, timestamp: timestamp});
    });
    res.sendFile(__dirname + "/write-complete.html");
});
*/

app.listen(3000, function() {
  console.log("Go!");
});
