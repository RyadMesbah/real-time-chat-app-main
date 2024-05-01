import Room from "../models/room.model.js";
import createError from "../utils/createError.js";
import User from "../models/user.model.js";

//route handler functions

export const deleteRoom = async (req, res, next) => {
  const room = await Room.findById(req.params.id);

  if (req.roomId !== room._id.toString()) {
    return next(createError(403, "You can delete only your room!"));
  }
  await Room.findByIdAndDelete(req.params.id);
  res.status(200).send("deleted.");
};

export const getRoom = async (req, res, next) => {
  const room = await Room.findById(req.params.id);
  res.status(200).send(room);
};

export const getRooms = async (req, res, next) => {
  const rooms = await Room.find();
  res.status(200).send(rooms);
};

export const updateRoom = async (req, res, next) => {
  const room = await Room.findById(req.params.id);

  if (req.roomId !== room._id.toString()) {
    return next(createError(403, "You can only modify your own room!"));
  }

  const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  });

  res.status(200).send(updatedRoom);
};

export const requestCreateRoom = async (req, res, next) => {
  const room = new Room({
    ...req.body,
    approved: false, // room is not approved when created
  });
  await room.save();
  res.status(201).send(room);
};

export const approveRoom = async (req, res, next) => {
  // only an expert user can approve a room
  if (
    req.user.role !== "expert" ||
    !req.user.topic_subscribed_at.includes(req.params.id)
  ) {
    return next(createError(403, "Only expert users can approve rooms!"));
  }

  const room = await Room.findById(req.params.id);
  if (!room) {
    return next(createError(404, "Room not found!"));
  }

  room.approved = true;
  await room.save();
  res.status(200).send(room);
};
