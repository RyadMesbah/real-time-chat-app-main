import Topic from "../models/topic.model.js";
import createError from "../utils/createError.js";
import User from "../models/user.model.js";

export const createTopic = async (req, res, next) => {
  const topic = new Topic(req.body);

  const user_subscription = req.user.topic_subscribed_at.find(
    (subscription) => subscription.topic_id === topic.id
  );

  if (!user_subscription || !user_subscription.isExpert) {
    return next(createError(403, "Only subscribed experts can ceate a topic!"));
  }
  await topic.save();
  res.status(201).send(topic);
};

export const deleteTopic = async (req, res, next) => {
  const topic = await Topic.findById(req.params.id);

  const user_subscription = req.user.topic_subscribed_at.find(
    (subscription) => subscription.topic_id === topic.id
  );

  if (!user_subscription || !user_subscription.isExpert) {
    return next(
      createError(403, "Only subscribed experts can delete a topic!")
    );
  }

  await Topic.findByIdAndDelete(req.params.id);
  res.status(200).send("Topic deleted.");
};

export const getTopic = async (req, res, next) => {
  const topic = await Topic.findById(req.params.id);
  res.status(200).send(topic);
};

export const getTopics = async (req, res, next) => {
  const topics = await Topic.find({});
  res.status(200).send(topics);
};

js;
export const updateTopic = async (req, res, next) => {
  const topic = await Topic.findById(req.params.id);

  if (!topic) {
    return next(createError(404, "Topic not found!"));
  }

  const user_subscription = req.user.topic_subscribed_at.find(
    (subscription) => subscription.topic_id === topic.id
  );

  if (!user_subscription || !user_subscription.isExpert) {
    return next(
      createError(403, "Only subscribed experts can update a topic!")
    );
  }

  const updatedTopic = await Topic.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).send(updatedTopic);
};
