import mongoose from "mongoose";
const { Schema } = mongoose;
const messageSchema = new Schema(
  {
    messageId: {
      type: String,
      required: true,
    },
    contenu: {
      type: String,
      required: true,
    },

    date_heure_envoie: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    roomID: {
      type: String,
      required: true,
    },
    is_message_pinned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Message", RoomSchema);
