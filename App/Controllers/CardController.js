const { Todo, Card } = model;

class CardController {
  //-------------------------------------------------------------------------------
  async index(req, res) {
    const cards = await Card.find({ owner: req.user.id }).sort({
      sortValue: 1
    });

    return res.json({ cards });
  }

  //-------------------------------------------------------------------------------
  async store(req, res) {
    const { name, parentBoard, sortValue } = req.body;

    if (!name || !parentBoard || !sortValue) {
      return res.status(401).json({ msg: 'All fields are required' });
    }

    var card = new Card();

    card.unix = new Date().getTime();
    card.name = name;
    card.sortValue = sortValue;
    card.owner = req.user.id;
    card.parentBoard = parentBoard;

    await card.save();

    return res.json({ card });
  }

  //-------------------------------------------------------------------------------
  async update(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ msg: 'The name is required' });
    }

    const card = await Card.findOne({ _id: req.params.id });

    card.name = name;

    card.save();

    return res.json({ card });
  }

  //-------------------------------------------------------------------------------
  async delete(req, res) {
    await Card.deleteOne({ _id: req.params.id });

    await Todo.deleteMany({ parentCard: req.params._id });

    return res.json({ msg: 'Card deleted' });
  }
}

module.exports = CardController;
