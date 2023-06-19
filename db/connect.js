const mongoose = require("mongoose");

const connectDB = async (url) => {
    try {
        await mongoose.connect(url);
        console.log("サーバーに接続中・・・");
    } catch (err) {
        console.log(err);
    }
};

module.exports = connectDB;
