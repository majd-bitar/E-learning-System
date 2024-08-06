import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Class from "../models/classModel.js";
import Withdrawal from "../models/withdrawalModel.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to MongoDB at:", process.env.DATABASE_URL);

    // Clear existing data
    await User.deleteMany({});
    await Class.deleteMany({});
    await Withdrawal.deleteMany({});
    console.log("Existing data cleared");

    // Seed Users
    const passwordHash = await bcrypt.hash("password123", 10);
    const users = [
      { name: "Admin User", email: "admin@example.com", password: passwordHash, role: "admin" },
      { name: "Student User", email: "student@example.com", password: passwordHash, role: "student" },
    ];
    const createdUsers = await User.insertMany(users);
    console.log("Users seeded:", createdUsers);

    // Seed Classes
    const classes = [
      { name: "Math 101", description: "Basic Mathematics", files: [{ filename: "math101_syllabus.pdf", fileUrl: "/uploads/math101_syllabus.pdf" }], students: [createdUsers[1]._id] },
      { name: "History 101", description: "World History", files: [{ filename: "history101_syllabus.pdf", fileUrl: "/uploads/history101_syllabus.pdf" }], students: [] },
    ];
    const createdClasses = await Class.insertMany(classes);
    console.log("Classes seeded:", createdClasses);

    // Seed Withdrawals
    const withdrawals = [
      { user: createdUsers[1]._id, class: createdClasses[0]._id, status: "pending" },
    ];
    await Withdrawal.insertMany(withdrawals);
    console.log("Withdrawals seeded");

    console.log("Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedData();
