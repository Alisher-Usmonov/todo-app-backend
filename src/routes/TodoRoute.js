const { TodoGET, TodoPOST, TodoComCompletedPUT, TodoDELETE } = require("../controllers/TodoController");
const router = require("express").Router();

router.get("/todos", TodoGET);
router.post("/todos", TodoPOST);
router.put("/todos/completed", TodoComCompletedPUT);
router.delete("/todos/:id", TodoDELETE);

module.exports = {
    path: "/",
    router
}