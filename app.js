const express = require('express');
// const bodyParser = require('body-parser'); // to use with json files
const path = require('path');
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("./Jobs");

const app = express();

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// body parser middleware // to use with json files
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

// set static path
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
	db.all('select * from job', (err, rows) => {
		// console.log(rows);
		res.render('index', {
			top_title: "Check out available job offers! " + "Total(" + rows.length + ")",
			jobs: rows
		});
	});
});

app.get('/:tag', (req, res, next) => {
	const cond = req.params;
	// cond.search = cond.tag.toLowerCase();
	const sql_query = "SELECT * FROM job WHERE tags LIKE '%" + cond.tag 
		+ "%' OR title LIKE '%" 
		+ cond.tag 
		+ "%' OR description LIKE '%" 
		+ cond.tag 
		+ "%' OR email LIKE '%" 
		+ cond.tag 
		+ "%' OR address LIKE '%" 
		+ cond.tag 
		+ "%' OR phone LIKE '%" 
		+ Number(cond.tag) 
		+ "%'"
	db.all(sql_query, (err, rows) => {
		if(rows.length > 0){
			res.render('index', {
				top_title: "Check out available job offers! " + "Total(" + rows.length + ")",
				jobs: rows
			});
		}else{
			res.render('index', {
				top_title: "Sorry, your tag does not match any of the job offers. Please try another search.",
				jobs: rows
			});
		}
	});
});

app.listen(8000, () => {
	console.log('Server started on port 8000');
});	