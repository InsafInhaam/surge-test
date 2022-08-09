const mongoose = require('mongoose');

const coonnectDB = async()=>{
    try {
        await mongoose.connect("mongodb+srv://InsafInhaam:Insaf1234@cluster0.9c3bovy.mongodb.net/?retryWrites=true&w=majority",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to Database successfully');
    } catch (err) {
        console.log(err);
    }
};

module.exports = coonnectDB;