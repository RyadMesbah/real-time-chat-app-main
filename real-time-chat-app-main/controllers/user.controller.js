import User from "../models/user.model.js";
import createError from "../utils/createError.js";

//route handler functions

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can delete only your account!"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("deleted.");
};

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).send(user);
};

export const getUsers = async (req, res, next) => {
  const users = await User.find({});

  res.status(200).send(users);
};

export const updateUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can update only your account!"));
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  });
  res.status(200).send(updatedUser);
};

export const followUser = async (req, res, next) => {
  if (req.userId !== req.params.id) {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.userId);

    if (!user.followers.includes(req.userId)) {
      await user.updateOne({ $push: { followers: req.userId } });
      await currentUser.updateOne({ $push: { following: req.params.id } });
      res.status(200).send("User has been followed.");
    } else {
      res.status(403).send("You allready follow this user.");
    }
  } else {
    res.status(403).send("You can't follow yourself.");
  }
};

export const unfollowUser = async (req, res, next) => {
  if (req.userId !== req.params.id) {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.userId);
    if (user.followers.includes(req.userId)) {
      await user.updateOne({ $pull: { followers: req.userId } });
      await currentUser.updateOne({ $pull: { following: req.params.id } });
      res.status(200).send("User has been unfollowed.");
    } else {
      res.status(403).send("You don't follow this user.");
    }
  } else {
    res.status(403).send("You can't unfollow yourself.");
  }
};

export const getFollowers = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const followers = await Promise.all(
    user.followers.map((followerId) => {
      return User.findById(followerId);
    })
  );
  res.status(200).send(followers);
};

export const getFollowing = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const following = await Promise.all(
    user.following.map((followingId) => {
      return User.findById(followingId);
    })
  );
  res.status(200).send(following);
};

export const add_expert = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user.role === "user") {
    await user.updateOne({ role: "expert" });
    res.status(200).send("User has been added to experts.");
  } else {
    res.status(403).send("User is already an expert.");
  }
};

export const remove_expert = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user.role === "expert") {
    await user.updateOne({ role: "user" });
    res.status(200).send("User has been removed from experts.");
  } else {
    res.status(403).send("User is not an expert.");
  }
};

export const add_moderator = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user.role === "moderator") {
    await user.updateOne({ role: "moderator" });
    res.status(200).send("User has been added to moderators.");
  } else {
    res.status(403).send("User is already a moderator.");
  }
};

export const remove_moderator = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user.role === "moderator") {
    await user.updateOne({ role: "user" });
    res.status(200).send("User has been removed from moderators.");
  } else {
    res.status(403).send("User is not a moderator.");
  }
};

export const bloquer_user = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  {
    await user.updateOne({ isBlocked: true });
    res.status(200).send("User has been blocked.");
  }
};

export const debloquer_user = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  {
    await user.updateOne({ isBlocked: false });
    res.status(200).send("User has been unblocked.");
  }
};
