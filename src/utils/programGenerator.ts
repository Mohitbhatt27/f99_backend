// src/utils/programGenerator.ts

export type Exercise = {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  progressionType: "linear" | "double";
};

export type WorkoutDay = {
  day: string;
  exercises: Exercise[];
};


//  Decide split based on frequency
export function getSplit(days: number): string {
  if (days === 2) return "Full Body";
  if (days === 3) return "Push Pull Legs";
  if (days === 4) return "Upper Lower";
  if (days === 5) return "Bro Split";
  if (days === 6) return "PPL x2";
  return "Custom";
}


// 🏋️ Generate workouts based on split
export function generateWorkouts(split: string): WorkoutDay[] {

  // 🔹 UPPER LOWER
  if (split === "Upper Lower") {
    return [
      {
        day: "Day 1 - Upper",
        exercises: [
          { name: "Bench Press", sets: 4, reps: "6-10", rest: "120s", progressionType: "double" },
          { name: "Barbell Row", sets: 3, reps: "8-12", rest: "90s", progressionType: "double" },
          { name: "Shoulder Press", sets: 3, reps: "8-12", rest: "90s", progressionType: "double" },
          { name: "Bicep Curl", sets: 3, reps: "10-15", rest: "60s", progressionType: "double" },
          { name: "Tricep Pushdown", sets: 3, reps: "10-15", rest: "60s", progressionType: "double" }
        ]
      },
      {
        day: "Day 2 - Lower",
        exercises: [
          { name: "Squat", sets: 4, reps: "6-10", rest: "120s", progressionType: "double" },
          { name: "Romanian Deadlift", sets: 3, reps: "8-12", rest: "90s", progressionType: "double" },
          { name: "Leg Press", sets: 3, reps: "10-15", rest: "90s", progressionType: "double" },
          { name: "Leg Curl", sets: 3, reps: "10-15", rest: "60s", progressionType: "double" },
          { name: "Calf Raises", sets: 4, reps: "12-20", rest: "45s", progressionType: "double" }
        ]
      }
    ];
  }


  // 🔹 PUSH PULL LEGS
  if (split === "Push Pull Legs") {
    return [
      {
        day: "Push",
        exercises: [
          { name: "Bench Press", sets: 4, reps: "6-10", rest: "120s", progressionType: "double" },
          { name: "Incline Dumbbell Press", sets: 3, reps: "8-12", rest: "90s", progressionType: "double" },
          { name: "Shoulder Press", sets: 3, reps: "8-12", rest: "90s", progressionType: "double" },
          { name: "Lateral Raises", sets: 3, reps: "12-15", rest: "60s", progressionType: "double" },
          { name: "Tricep Pushdown", sets: 3, reps: "10-15", rest: "60s", progressionType: "double" }
        ]
      },
      {
        day: "Pull",
        exercises: [
          { name: "Pull-ups", sets: 4, reps: "6-10", rest: "120s", progressionType: "double" },
          { name: "Barbell Row", sets: 3, reps: "8-12", rest: "90s", progressionType: "double" },
          { name: "Face Pull", sets: 3, reps: "12-15", rest: "60s", progressionType: "double" },
          { name: "Bicep Curl", sets: 3, reps: "10-15", rest: "60s", progressionType: "double" }
        ]
      },
      {
        day: "Legs",
        exercises: [
          { name: "Squat", sets: 4, reps: "6-10", rest: "120s", progressionType: "double" },
          { name: "Romanian Deadlift", sets: 3, reps: "8-12", rest: "90s", progressionType: "double" },
          { name: "Leg Extension", sets: 3, reps: "10-15", rest: "60s", progressionType: "double" },
          { name: "Calf Raises", sets: 4, reps: "12-20", rest: "45s", progressionType: "double" }
        ]
      }
    ];
  }


  // 🔹 DEFAULT FALLBACK
  return [
    {
      day: "Full Body",
      exercises: [
        { name: "Squat", sets: 3, reps: "8-12", rest: "90s", progressionType: "double" },
        { name: "Bench Press", sets: 3, reps: "8-12", rest: "90s", progressionType: "double" },
        { name: "Rows", sets: 3, reps: "8-12", rest: "90s", progressionType: "double" }
      ]
    }
  ];
}
