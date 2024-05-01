import Message from "../models/message.model.js";
import createError from "../utils/createError.js";

//route handler functions

export const createMessage = async (req, res, next) => {
  const message = new Message(req.body);
  await message.save();
  res.status(201).send(message);
};

export const getMessage = async (req, res, next) => {
  const message = await Message.findById(req.params.id);
  res.status(200).send(message);
};

export const getMessages = async (req, res, next) => {
  const messages = await Message.find({});
  res.status(200).send(messages);
};

export const deleteMessage = async (req, res, next) => {
  const message = await Message.findById(req.params.id);

  if (req.userId !== message.author) {
    return next(createError(403, "You can delete only your messages!"));
  }
  await Message.findByIdAndDelete(req.params.id);
  res.status(200).send("deleted.");
};

export const upvoteMessage = async (req, res, next) => {
  const message = await Message.findById(req.params.id);

  if (!message.upvotes.includes(req.userId)) {
    await message.updateOne({ $push: { upvotes: req.userId } });
    res.status(200).send("Upvoted.");
  } else {
    res.status(403).send("You allready upvoted this message.");
  }
};

// remove_up_vote and remove_down_vote

export const downvoteMessage = async (req, res, next) => {
  const message = await Message.findById(req.params.id);

  if (message.downvotes.includes(req.userId)) {
    await message.updateOne({ $push: { downvotes: req.userId } });
    res.status(200).send("Downvoted.");
  } else {
    res.status(403).send("You allready downvoted this message.");
  }
};

export const replyMessage = async (req, res, next) => {
  const reply = new Message(req.body);
  reply.parentId = req.params.id;

  await reply.save();
  res.status(201).send(reply);
};

export const pinMessage = async (req, res, next) => {
  const message = await Message.findById(req.params.id);

  if (user.isExpert === false || user.isModerator === false) {
    return next(createError(403, "You can't pin messages!"));
  }

  message.pinned = true;
  await message.save();
  res.status(200).send("Message pinned.");
};

export const unpinMessage = async (req, res, next) => {
  const message = await Message.findById(req.params.id);

  if (user.isExpert === false || user.isModerator === false) {
    return next(createError(403, "You can't unpin messages!"));
  }

  message.pinned = false;
  await message.save();
  res.status(200).send("Message unpinned.");
};
