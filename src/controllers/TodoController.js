const Op = require("sequelize").Op;

module.exports = {
    async TodoGET(req, res) {
        try {
            let todos = await req.psql.todos.findAll({
                raw: true
            });
            res.status(200).json({
                ok: true,
                todos
            });
        } catch (err) {
            res.status(400).json({
                ok: false,
                message: err.message
            });
        }
    },
    async TodoPOST(req, res) {
        try {
            let { text } = req.body;
            let todo = await req.psql.todos.create({
                text
            })
            res.status(201).json({
                ok: true,
                message: "Todo Created successfully!",
                todo: {
                    id: todo.dataValues.id,
                    text: todo.dataValues.text,
                    completed: todo.dataValues.completed,
                }
            });
        } catch (err) {
            res.status(400).json({
                ok: false,
                message: err.message
            });
        }
    },
    async TodoComCompletedPUT(req, res) {
        try {
            let { id, completed } = req.body;
            console.log("Body ", req.body);
            let updated = await req.psql.todos.update({
                completed
            }, {
                where: {
                    id: { [Op.eq]: id }
                },
            });

            res.status(200).json({
                ok: true,
                message: "todo completed updated!"
            })
        } catch (err) {
            res.status(400).json({
                ok: false,
                message: err.message
            })
        }
    },
    async TodoDELETE(req, res) {
        try {
            let id = req.params.id;
            let destroyed = await req.psql.todos.destroy({
                where: {
                    id: {
                        [Op.eq]: id
                    }
                }
            })
            console.log(destroyed);
            res.status(200).json({
                ok: true,
                message: `${destroyed} element deleted!`
            })
        } catch (err) {
            res.status(400).json({
                ok: false,
                message: err.message
            })
        }
    }
}