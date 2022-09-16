const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    name: { type: String, trim: true },
    isGroup: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chat", chatSchema);
