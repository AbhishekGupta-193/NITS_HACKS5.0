const express = require('express');
const {GetTask,createTask,deleteTask} = require('./Controller.js')

const router = express.Router();


router.route('/').get(GetTask).post(createTask)
router.route('/:id').delete(deleteTask)

module.exports =  router