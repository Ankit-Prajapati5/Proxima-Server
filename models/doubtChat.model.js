import mongoose from "mongoose"

const doubtChatSchema = new mongoose.Schema({

 student:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User",
  required:true
 },

 course:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Course",
  required:true
 },

 lecture:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Lecture"
 },

 status:{
  type:String,
  enum:["open","resolved"],
  default:"open"
 }

},{timestamps:true})

export const DoubtChat = mongoose.model("DoubtChat",doubtChatSchema)