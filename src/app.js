const express = require('express');
const app = express();
const path = require('path');
const port = 7000;
const con = require('../connection');
const bodyParser = require('body-parser');
// const mysql = require('mysql');
const hbs = require('hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//middleware for static files.......
const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));

//setting the template engine   
app.set("view engine", "hbs");
app.set("views", '../views'); //providing path of views directory

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.get('/delete', (req, res) => {
  res.render('delete');
});

app.get('/update', (req, res) => {
  res.render('update');
});

app.get('/search', (req, res) => {
  res.render('search');
});

app.post('/addapointment', (req, res) => {

  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const gender = req.body.gender;
  const phone = req.body.phone;
  const dob = req.body.dob;
  const streetaddress1 = req.body.streetaddress1;
  const streetaddress2 = req.body.streetaddress2;
  const city = req.body.city;
  const postal = req.body.postal;
  const country = req.body.country;
  const appointment = req.body.appointment;

  // const {firstname, lastname, email,gender,phone,dob,streetaddress1, streetaddress2, city, postal, country, appointment} = req.query

  // con.connect((error)=>{
  //   if (error) throw error;

  const sql = "INSERT INTO `patient_appointment` (`Id`, `firstname`, `lastname`, `email`, `gender`, `phone`, `dob`, `streetaddress1`, `streetaddress2`, `city`, `postal`, `country`, `appointment`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  con.query(sql, [firstname, lastname, email, gender, phone, dob, streetaddress1, streetaddress2, city, postal, country, appointment], (err, result) => {
    if (err) throw err;
    res.send("Appointment sheduled successfully");
  });
});
//  });

app.get('/displayappointment', (req, res) => {
  const sql = "SELECT * FROM patient_appointment";
  con.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.render('index', { title: 'Curd Operation using Nodejs', action: 'list', data: result });
      // console.log(result.firstname);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
});
