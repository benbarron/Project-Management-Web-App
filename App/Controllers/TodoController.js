const { Todo } = model;

class TodoController {
  //-------------------------------------------------------------------------------
  async index(req, res) {
    const todos = await Todo.find({ owner: req.user.id });

    return res.json({ todos });
  }

  //-------------------------------------------------------------------------------
  async store(req, res) {
    const { name, parentCard, sortValue } = req.body;

    if (!name || !parentCard || !sortValue) {
      return res.status(401).json({ msg: 'All fields are required' });
    }

    var todo = new Todo();

    todo.unix = new Date().getTime();
    todo.name = name;
    todo.sortValue = sortValue;
    todo.parentCard = parentCard;
    todo.owner = req.user.id;

    await todo.save();

    return res.json({ todo });
  }

  //-------------------------------------------------------------------------------
  async update(req, res) {
    const { name, dueDate, label, dueDateInstance } = req.body;

    if (!name) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    var todo = await Todo.findOne({ _id: req.params.id });

    if (!todo) {
      return res.status(400);
    }

    if (todo.owner != req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    todo.name = name;
    todo.label = label;
    todo.dueDate = dueDate;
    todo.dueDateInstance = dueDateInstance;

    await todo.save();

    return res.json({ todo });
  }

  //-------------------------------------------------------------------------------
  async delete(req, res) {
    await Todo.deleteOne({ _id: req.params.id });

    return res.json({ msg: 'Todo Deleted' });
  }
}

module.exports = TodoController;
