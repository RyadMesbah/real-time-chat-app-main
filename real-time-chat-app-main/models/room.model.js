import mongoose from "mongoose";
const { Schema } = mongoose;
const RoomSchema = new Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

    initialProblem: {
      type: String,
      required: true,
    },
    roomCreator: {
      type: String,
      required: true,
    },
    topicId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", RoomSchema);
