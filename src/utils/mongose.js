module.exports = {
    multipleMongooseToObject(mongooseArray) {
        return mongooseArray.map((mongooseArray) => mongooseArray.toObject());
    },
    mongooseToObject(mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },

    convertDatetimeToDateTime(datetimeString) {
        const date = new Date(datetimeString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    },
};
