const express = require('express');
const path = require('path');
const mongojs = require('mongojs');
const db = mongojs('Job');
const job_collection = db.collection('job')

const app = express();

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// set static path
app.use(express.static(path.join(__dirname, 'public')));

app.get('/:tag', (req, res, next) => {
	const cond = req.params;
	job_collection.find({"tags": {$regex: ".*" + cond.tag + ".*"}}).sort({date: -1}, (err, docs) => {
		res.render('index', {
			top_title: 'Check out available job offers! Total(' + docs.length + ')',
			jobs: docs
		});
	})
});

app.get('/', (req, res, next) => {
	job_collection.find().sort({date: -1}, (err, docs) => {
		res.render('index', {
			top_title: 'Check out available job offers! Total(' + docs.length + ')',
			jobs: docs
		});
	})
});

app.listen(8000, '0.0.0.0');
