const axios = require('axios');
const redis = require('redis');

const client = redis.createClient(env('redisPort', 6379));

const { User } = model;

class SearchController {
  async photos(req, res) {
    const { keyword } = req.params;

    const access = env('unsplashAccessKey', '');
    const numberOfPhotos = env('photosPerSearch', '');

    try {
      const result = await axios.get(
        `https://api.unsplash.com/search/photos?page=1&per_page=${numberOfPhotos}&query=${keyword}&client_id=${access}`
      );

      client.setex(
        keyword,
        env('cacheLifeTime', 3600),
        JSON.stringify(result.data)
      );

      return res.json(result.data);
    } catch (e) {
      console.log(e);
      return res.status(501).json({ msg: 'Internal server error' });
    }
  }

  async users(req, res) {
    const { query } = req.params;

    if (!query) {
      return res.status(400).json({ msg: 'Enter search criteria' });
    }

    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ]
    }).select(['-password', '-passwordReset']);

    return res.json({ users });
  }
}

module.exports = SearchController;
