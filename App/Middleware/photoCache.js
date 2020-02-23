const redis = require('redis');

const client = redis.createClient(env('redisPort', 6379));

module.exports = function(req, res, next) {
  const { keyword } = req.params;

  client.get(keyword, (err, data) => {
    if (err) {
      return res.status(501).json({ msg: 'Internal server error' });
    }

    if (data !== null) {
      try {
        const response = JSON.parse(data);
        return res.json(response);
      } catch (e) {
        next();
      }
    }

    next();
  });
};
