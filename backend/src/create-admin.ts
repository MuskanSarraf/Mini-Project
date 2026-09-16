import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { connectDatabase } from "./config/database.js";
import { User } from "./models/user.model.js";

dotenv.config();

const createAdmin = async (): Promise<void> => {
    try {
        await connectDatabase();

        const email = "admin@moviehub.com";

        const existingAdmin = await User.findOne({ email });

        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(
            "admin123",
            10
        );

        await User.create({
            name: "MovieHub Admin",
            email,
            password: hashedPassword,
            role: "admin",
        });

        console.log("Admin created successfully");

        process.exit(0);
    } catch (error) {
        console.error("Failed to create admin:", error);
        process.exit(1);
    }
};

createAdmin();