const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/e-commerce');
mongoose.connect('mongodb+srv://amitpatel12:amitpatel12@amit.rjihs9m.mongodb.net/E-commerece?retryWrites=true&w=majority',{useNewUrlParser: true});
// mongoose.set('strictQuery', false);