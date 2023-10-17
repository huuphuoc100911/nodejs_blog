module.exports = {
    multipleMongooseToObject(mongooseArray) {
        return mongooseArray.map((mongooseArray) => mongooseArray.toObject());
    },
    mongooseToObject(mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
