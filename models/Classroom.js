import mongoose from "mongoose";
const periodSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  start_time: {
    type:Number,
    required: true,
  },
  end_time: {
    type:Number,
    required: true,
  },
});
const classroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  classroomId: { type: String, required: true },
  start_time: { type: Number, required: true },
  end_time: { type: Number, required: true },
  days: { type: [String], required: true },
  teacher: { type: String, ref: "User" },
  students: [{ type: String, ref: "User" }],
  timetable: [periodSchema],
});

export default mongoose.model("Classroom", classroomSchema);
