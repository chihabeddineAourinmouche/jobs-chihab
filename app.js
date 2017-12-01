const express = require('express');
const path = require('path');
const json_file = require('fs');
const json_file_data = json_file.readFileSync('Jobs.json');
const db = JSON.parse(json_file_data);

const app = express();

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// set static path
app.use(express.static(path.join(__dirname, 'public')));

// show all job-offers
app.get('/', (req, res) => {
	res.render('index', {
		top_title: 'Check out available job offers! Total(' + db.length + ')',
		jobs: db
	});
});

// show job-offers corresponding to a tag
app.get('/:tag', (req, res) => {
	const cond = req.params;
	console.log(cond);
	const docs = [];
	db.forEach(function(collection) {
		if(collection["tags"].includes(cond.tag)){
			docs.push(collection);
		}
	});
	if(docs.length > 0){
		res.render('index', {
			top_title: 'Check out available job offers! Total(' + db.length + ')',
			jobs: docs
		});
	}else{
		res.render('index', {
			top_title: 'Sorry, your tag does not match any of the job offers. Please try another search.',
			jobs: docs
		});
	}
});

// app.listen(8000, '0.0.0.0');
app.listen(process.env.PORT || 8000);
