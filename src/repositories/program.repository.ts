import Program from "../models/program.model";
import { IProgram } from "../models/program.model";

// ➕ Create Program
export const createProgram = async (data: Partial<IProgram>) => {
  return await Program.create(data);
};

// 🔍 Get Program by ID
export const getProgramById = async (programId: string) => {
  return await Program.findById(programId);
};

// 🔁 Update Program (used for weekly progression)
export const updateProgram = async (
  programId: string,
  updateData: Partial<IProgram>
) => {
  return await Program.findByIdAndUpdate(programId, updateData, {
    new: true
  });
};

// 📥 Get User's Active Program
export const getUserProgram = async (userId: string) => {
  return await Program.findOne({ userId }).sort({ createdAt: -1 });
};

// ❌ Delete Program (optional)
export const deleteProgram = async (programId: string) => {
  return await Program.findByIdAndDelete(programId);
};
