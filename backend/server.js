const express = require("express");
const bodyParser = require("body-parser");

const db = require('./db');
const { debugPort } = require("process");

// Express 서버 생성
const app = express();

// json 형태로 오는 요청의 본문을 해석해 줄 수 있게 등록
app.use(bodyParser.json());

// DB lists 테이블에 있는 모든 데이터를 프론트 서버에 전송
app.get('/api/values', function(req, res) {
    db.pool.query('SELECT * FROM lists;',
    (err, results, fields) => {
        if (err)
            return res.status(500).send(err)
        else
            return res.json(results)
    })
})

app.post('/api/value', function(req, res, next) {
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}");`,
    (err, results, fields) => {
        if(err)
            return res.status(500).send(err)
        else
            return res.json({success: true, value: req.body.value})
    })
})


app.listen(5000, () => {
    console.log("run application / port 5000")
})