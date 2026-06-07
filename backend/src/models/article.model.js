const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
{
title: {
type: String,
required: true,
},

description: {
type: String,
required: true,
},

content: {
type: String,
required: true,
},

image: {
type: String,
default:
"https://images.unsplash.com/photo-1504711434969-e33886168f5c",
},

author: {
type: String,
required: true,
},

userId: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
},

likes: [
{
type: mongoose.Schema.Types.ObjectId,
ref: "User",
},
],

bookmarks: [
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

module.exports = mongoose.model("Article", articleSchema);
