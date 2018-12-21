# 背景

スプラトゥーン2のプレイデータを分析して，何に気をつけたら勝ち数が増えそうか予測したいよ！
ぐぐっても，CSV対応だとかJSONで吐き出せだとか出てくるんだけど，2018/12/21時点の
とりあえず，プレイデータのうち試合番号と勝敗でソートしてテーブルに出力するところまで．

最終的には試合成績を予測する学習器を実装したり因子分析したりして何を向上すれば勝率が上がるかのヒントとしたい．

ちなみに，筆者は普段はpython使いでjavascriptの経験は非常に浅く，間違えや適切ではない使い方もあるかも知れない．
詳細な情報は，ぜひ公式ドキュメント[1]で確認されたし．

# 環境構築

1.  Node.js[2]をインストールする
1.  作業ディレクトリに入って，プロジェクトを初期化
    回答はpackage.jsonに保存され，後から編集したりnpm initし直したりできるので，適当に．

    ```sh
    npm init
    ```

1. Realm Academyのチュートリアル[3] に従い npm でパッケージをインストールインストール

    ```sh
    npm install --save express
    npm install --save realm
    npm install --save ejs
    npm install --save body-parser
    npm install --save-dev nodemon
    ```

1.  実行にnodemonを使うようpackage.jsonを修正．
    scriptsの要素へ，以下を追加．デフォで入っているtestは消してもいいかも．

    ```json
    "scripts": {
        "serve": "nodemon index.js",
    },
    ```

# データ構造の取得

直接，公式サーバを叩いてデータを取得する方法もあるらしいが，最近50試合しか取れないので，既に溜めてあるikaWidget2のデータを抜き取ることにする．

## データのエクスポート

ikaWidget2 のエクスポートによりikaxファイルが取得できる．
こいつをzipとして解凍すると，info.jsonとstats.realmを取得できる．
stats.realmが，RealmというNoSQL DBなのでこいつからデータを取得したい．

## テーブル構造の取得

1. 色々調べたけどよく分からんのでRealm Studio[4]を入れる．
1. こいつを起動すると「Open Realm file」なる選択肢があるので，上で入手したstats.realmを選択し開く．
1. File > Save model definitions > JavaScript

じゃぁこのツールでいいじゃんと思いきや，どうにもデータの出力機構を備えてないっぽい．（Cloud版は有償らしいので試してない）

# 可視化

## データ構造の把握

上で出力したjsを開き，スキーマを確認する．
今回はResultを開きたいので，Resultを確認するとこんな風になっている．

```javascript:stats-model.js
exports.Result = {
  name: 'Result',
  primaryKey: 'no',
  properties: {
    no: 'int',
    stage: 'Stage',
    game: 'Game',
    player: 'Player',
    startTime: { type: 'date?', indexed: true },
    elapsedTime: 'float',
    win: { type: 'bool', indexed: true },
    udemae: 'int',
    udemaeName: 'string?',
    udemaeIsX: 'bool',
    udemaeIsReached: 'bool',
    sPlusNumber: 'int',
    xRanking: 'int',
    xPower: 'float',
    myCount: 'float',
    otherCount: 'float',
    winMeter: 'float',
    weaponPaintPoint: 'int',
    myMembers: 'Player[]',
    otherMembers: 'Player[]',
    leaguePoint: 'float',
    leagueMaxPoint: 'float',
    leagueTeamEstimatePoint: 'float',
    leagueOtherEstimatePoint: 'float',
    gachiEstimatePower: 'float',
    gachiEstimateXPower: 'float',
    fesPoint: 'int',
    fesPower: 'float',
    fesMaxPower: 'float',
    fesTeamEstimatePower: 'float',
    fesOtherEstimatePower: 'float',
    fes: 'Fes',
    skillLogs: 'SkillLog[]',
    version: 'int',
    rank: 'int',
    starRank: 'int',
    fesGrade: 'int',
    fesGradeName: 'string?'
  }
}
```

## 可視化テンプレートの作成

とりあえず試合番号と試合結果をテーブルで表示することにする．
上のスキーマファイルから，試合番号はno，勝敗はwinっぽいと分かるので以下のように記述してみる．
ループの終了条件に出てくるresultsというのは，後でこのテンプレに渡すところで書く変数名．

```javascript:views/index.ejs
<h2>Results</h2>
<table>
<% for(var i=0; i<results.length; i++) {%>
<tr><th><%= results[i].no%></th><td><%= results[i].win%></td></tr>
<% } %>
</table>
```

## main

packages.jsonで指定されているmainと同名のjsファイルを実装する．

```javascript:index.js
'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    Realm = require('realm'),
    sm = require('./stats-model.js');  // Realm studioで出力したスキーマ

var app = express();

const currentVer = Realm.schemaVersion('stats.realm');  // スキーマのバージョン取得

// スキーマ（必要なもののみ）
var ikaRealm = new Realm({
    path: 'stats.realm',
    schema: [sm.Result, sm.Stage, sm.Game, sm.Player, sm.Weapon, sm.Gear,
             sm.Brand, sm.Skill, sm.Skills, sm.Fes, sm.SkillLog,
             sm.Special, sm.SubWeapon],
    schemaVersion: currentVer
});

// 可視化機能
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

app.listen(3000, function() {
  console.log("Now, you can access http://localhost:3000");
});
```

# 実行

```sh
npm run surve
```

# 実行結果

![ika_result.jpg](https://qiita-image-store.s3.amazonaws.com/0/210798/ec167d5f-b1e6-8f57-e82b-88e958b83519.jpeg)

今のところ，以上

[1]: [Docs \| Node\.js](https://nodejs.org/en/docs/)
[2]: [Node\.js](https://nodejs.org/en/)
[3]: [Realm Node\.jsとExpressでブログを作成](https://academy.realm.io/jp/posts/realm-node-js-express-blog-tutorial/)
[4]: [Realm Studio: open, edit, and manage your Realm data](https://realm.io/jp/products/realm-studio/)
