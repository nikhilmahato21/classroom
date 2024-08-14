import User from "../models/User.js";

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: "Teacher" });
    res.status(200).json(teachers);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    // Find the user by ID
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.status(200).json({ message: "User updated", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "Student" });
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    // Find the user by ID
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.status(200).json({ message: "User updated", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const currentUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching classrooms:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
