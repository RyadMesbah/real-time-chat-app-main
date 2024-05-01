import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    lastname: {
      type: String,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    desciption: {
      type: String,
      required: false,
    },
    is_email_confirmed: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator", "expert"],
      default: "user",
    },
    topic_subscribed_at: [
      {
        topic_id: {
          type: Schema.Types.ObjectId,
          ref: "Topic",
        },
        is_expert: {
          type: Boolean,
          default: false,
        },
        subscribed_at: {
          type: Date,
          default: () => Date.now(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", userSchema);
