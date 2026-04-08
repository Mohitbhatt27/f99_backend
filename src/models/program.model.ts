const mongoose = require("mongoose");

// USER
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  currentProgram: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program"
  }
});

// PROGRAM
const programSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  daysPerWeek: Number,
  goal: String,
  location: String,
  split: String,
  duration: Number,

  workouts: [
    {
      day: String,
      exercises: [
        {
          name: String,
          sets: Number,
          reps: String,
          rest: String,
          progressionType: String
        }
      ]
    }
  ],

  currentWeek: { type: Number, default: 1 },
  startedAt: Date
});

// EXERCISE LOG
const exerciseLogSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  programId: mongoose.Schema.Types.ObjectId,
  exerciseName: String,
  date: Date,
  sets: [{ weight: Number, reps: Number }]
});

module.exports = {
  User: mongoose.model("User", userSchema),
  Program: mongoose.model("Program", programSchema),
  ExerciseLog: mongoose.model("ExerciseLog", exerciseLogSchema)
};
