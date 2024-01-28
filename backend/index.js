const express = require("express");
const app = express();

const { createTodo, updateTodo } = require("./types");
const { todos } = require("./db/Todo");

app.use(express.json());

app.post("/api/addTodo", async function (req, res, next) {
  const parse = createTodo.safeParse(req.body);

  if (!parse["success"]) {
    return res.status(411).json({
      message: "You send the wrong input",
    });
  }
  const todo = await todos.create({
    title: req.body.title,
    description: req.body.description,
    completed: false,
  });

  res.status(200).json({
    msg: "Todo created",
    todo,
  });
});

app.get("/api/getTodo", async function (req, res, next) {
  const todo = await todos.find();
  res.status(200).json({
    todo,
  });
});

app.put("/api/updateTodo", async function (req, res, next) {
  const parse = updateTodo.safeParse(req.body);
  if (!parse.success) {
    return res.status(411).json({
      message: "You sent the wrong input",
    });
  }

  await todos.updateOne(
    {
      _id: req.body.id,
    },
    {
      completed: true,
    }
  );

  res.status(200).json({
    message: "Mark as Completed",
  });
});

app.listen(8000);
