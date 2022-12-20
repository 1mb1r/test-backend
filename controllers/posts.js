const { Post, User } = require('../models');
const { ERROR_STATUS, OK } = require('../constants/constants');

const { SERVER_ERROR } = ERROR_STATUS;

module.exports = {
  async getAllPosts(req, res) {
    try {
      const posts = await Post
        .findAll({
          order: [
            ['id', 'ASC'],
          ],
          include: {
            model: User,
            as: 'user',
            attributes: ['username', 'id'],
          },
        });
      await res.status(OK).send(posts);
    } catch (error) {
      await res.status(SERVER_ERROR).send(error);
    }
  },
};
