const Task = require("../models/Task");

//すべてのタスクを取得する
const getAllTasks = async (req, res) => {
    try {
        const getAllTasks = await Task.find({});
        res.status(200).json(getAllTasks);
    } catch (err) {
        res.status(500).json(err);
    }
};

//タスクを新規作成する
const createTask = async (req, res) => {
    try {
        const createTask = await Task.create(req.body);
        res.status(200).json(createTask);
    } catch(err) {
        res.status(500).json(err);
    }
};

//ある特定のタスクを取得する
const getSingleTask = async (req, res) => {
    try {
        const getSingleTask = await Task.findOne({_id: req.params.id});
        if(!getSingleTask) {
            res.status(404).json(`_id${req.params.id}は存在しません。`);
        }
        res.status(200).json(getSingleTask);
    } catch (err) {
        res.status(500).json(err);
    }
};

//ある特定のタスクを更新する
const updateTask = async (req, res) => {
    const updateTask = await Task.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true},
        );
    if(!updateTask) {
        res.status(404).json(`_id${req.params.id}は存在しません。`);
    }
    res.status(200).json(updateTask);
};

//ある特定のタスクを削除する
const deleteTask = async (req, res) => {
    try {
        const deleteTask = await Task.findOneAndDelete({_id: req.params.id});
        res.status(200).json("削除に成功しました。");
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
};