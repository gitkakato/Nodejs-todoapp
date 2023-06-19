const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "タスク名を入力してください。"],
        trim: true,
        maxlength: [20, "タスク名は20文字以内にしてください。"],
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Task", taskSchema);