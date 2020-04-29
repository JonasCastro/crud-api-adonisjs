"use strict";

const Post = use("App/Models/Post");

class PostController {
  async index() {
    const posts = await Post.query().with("user").fetch();

    return posts;
  }

  async store({ request, auth }) {
    const data = request.only(["title", "text"]);
    const post = await Post.create({ user_id: auth.user.id, ...data });

    return post;
  }

  async show({ params }) {
    const post = await Post.findOrFail(params.id);

    return post;
  }

  async destroy({ response, params, auth }) {
    const post = await Post.findOrFail(params.id);

    if (post.user_id !== auth.user.id) {
      return response
        .status(401)
        .json({ error: "User is not allowed to delete" });
    }

    await post.delete();
  }
}

module.exports = PostController;
