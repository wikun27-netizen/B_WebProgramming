const express = require('express');
const router = express.Router();

router.get('/', 
    async (req, res) => {
        res.render('pages/todo', { tasks: req.session.tasks});
    }
);

router.post('/add',
    async (req, res) => {
        //create session for tasks
        if (!req.session.tasks) {
            req.session.tasks = [];
        }

        //add the new task
        const newTask = req.body.taskNow;
        req.session.tasks.push(newTask);

        res.redirect('/todo');
    }
);

router.post('/done/:index',
    async (req, res) => {
        //get index
        index = req.params.index;
        //delete the tasks
        req.session.tasks.splice(index, 1);

        res.render('pages/todo', { tasks: req.session.tasks });
    }
);

module.exports = router;