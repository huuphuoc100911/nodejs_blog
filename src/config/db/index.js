const mongoose = require("mongoose");

async function connect() {
    try {
        console.log(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`);
        await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`, {
            useNewUrlParser: true,
            useNewUrlParser: true,
        });
        console.log("Connect Succesfully");
    } catch (error) {
        console.log("Connect Failed");
    }
}

module.exports = { connect };
