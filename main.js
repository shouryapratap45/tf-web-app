const express = require('express');
const localhost = "localhost";
const app = express();
const port = 3000;
const bodyParser=require('body-parser');
const session=require('express-session');
const cookieParser = require('cookie-parser');
const startDb=require('./database/init');
const userModel=require('./database/models/users');
const getAllProductsControllers= require('./controllers/products/getAllProducts');

startDb();

var userid=1;
var user={};
var loggedInSessionIds = {};

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.get('/',function(req,res){
	if(req.session.is_logged_in)
		res.sendFile(__dirname+"/public/homepage/index.html");
	else	
	{
		res.responseType="html";
		res.sendFile(__dirname+"/public/enterpage/login.html");
	}	
});


app.get('/sid', (req, res) => {
	res.json({ss: req.session.id});
})

app.get('/login',function(req,res){
	userModel.find({email: req.query.email, password: req.query.password})
	.then(function(data){
		if(data.length)
		{
			req.session.is_logged_in=true;
			loggedInSessionIds[req.session.id]={};
			loggedInSessionIds[req.session.id].obj={};
			loggedInSessionIds[req.session.id].cart={};
			loggedInSessionIds[req.session.id].obj=data[0];
			res.sendFile(__dirname+"/public/homepage/index.html");
		}
		else
		{
			res.end("Login error");
		}
	})
	.catch(function(){
		console.log('Error ocured while finding user in DB');
	})
});

app.get('/loginuser',function(req,res){
	if(req.session.is_logged_in)
	{
		res.responseType="json";
		res.send(JSON.stringify(loggedInSessionIds[req.session.id].obj));
	}
	else
	{
		req.url="/";
		next();
	}	
});

app.post('/signing',function(req,res){
	userModel.find({email: req.query.email})
	.then(function(data){
		if(data.length)
		{
			res.send('User exist');
			return;
		}
		userModel.create({name: req.query.name, email: req.query.email, password: req.query.password})
		.then(function(){
			req.session.counter=1;
			loggedInSessionIds[req.session.id]={};
			loggedInSessionIds[req.session.id].obj={};
			loggedInSessionIds[req.session.id].cart={};
			res.sendFile(__dirname+"/public/enterpage/login.html");
		})
		.catch(function(){
			console.log("can't add user into database");
		})
	})
	.catch(function(){
		console.log('Error ocured while finding user in DB');
	})
});

app.post('/signingout',function(req,res){
	if(req.query.password===loggedInSessionIds[req.session.id].obj.password)
	{
		req.session.is_logged_in=false;
		res.sendFile(__dirname+"/public/enterpage/login.html");
	}
	else
		res.send('Wrong Password');	
});

app.route('/product').get(getAllProductsControllers);

app.get('/getinitialdata',function(req,res){
	res.redirect('/product');
});
app.post('/addcart',function(req,res){
	for(prop in loggedInSessionIds[req.session.id].cart)
		if(JSON.stringify(loggedInSessionIds[req.session.id].cart[prop])===JSON.stringify(req.body))
			return;		
	loggedInSessionIds[req.session.id].cart[req.session.counter]=req.body;
	req.session.counter++;
	res.end();
});

app.get('/getdata',function(req,res){
	if(req.session.is_logged_in)
		res.json(loggedInSessionIds[req.session.id].cart);
	else
		res.end('login.html');
});
app.post(`/updatedata`,function(req,res){
	delete loggedInSessionIds[req.session.id].cart[req.query.id];
	res.end();
});
app.post('/clearcart',function(req,res){
	loggedInSessionIds[req.session.id].cart={};
	res.end();	
});

app.listen(port, () => {
	console.log(`Example app listening at http://${localhost}:${port}`)
})
