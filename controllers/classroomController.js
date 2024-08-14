import Classroom from "../models/Classroom.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
export const createClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.create(req.body);

    res.status(201).json({ message: "Classroom created", classroom });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const createTeacher = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "Teacher",
    });

    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const createStudent = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "Student",
    });

    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Assign a teacher to a classroom
export const assignTeacher = async (req, res) => {
  const { classroomId, email } = req.body;

  try {
    const classroom = await Classroom.findOne({ classroomId });
    const teacher = await User.findOne({ email });

    if (!classroom || !teacher || teacher.role !== "Teacher") {
      return res.status(400).json({ message: "Invalid classroom or teacher" });
    }

    if (classroom.teacher) {
      return res
        .status(400)
        .json({ message: "Classroom already has a teacher assigned" });
    }

    classroom.teacher = teacher.email;
    await classroom.save();

    res
      .status(200)
      .json({ message: "Teacher assigned to classroom", classroom });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// Assign a student to a classroom
export const assignStudent = async (req, res) => {
  const { classroomId, email } = req.body;

  try {
    const classroom = await Classroom.findOne({ classroomId });
    const student = await User.findOne({ email });

    if (!classroom || !student || student.role !== "Student") {
      return res.status(400).json({ message: "Invalid classroom or student" });
    }

    classroom.students.push(student.email);
    await classroom.save();

    res
      .status(200)
      .json({ message: "Student assigned to classroom", classroom });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Create a timetable for the classroom
export const createTimetable = async (req, res) => {
  const { classroomId, timetable } = req.body;
  console.log(timetable);

  

  try {
    const classroom = await Classroom.findOne({ classroomId });
    console.log(classroom);

    if (!classroom) {
      return res.status(400).json({ message: "Classroom not found" });
    }

    // Check if the periods in the timetable are within the classroom's start and end time
    for (const period of timetable) {
      if (
        period.start_time < classroom.start_time ||
        period.end_time > classroom.end_time
      ) {
        return res
          .status(400)
          .json({ message: "Period is outside classroom hours" });
      }
    }

    // Add timetable to the classroom
    classroom.timetable = timetable;
    await classroom.save();

    res.status(200).json({ message: "Timetable created", timetable: classroom.timetable });


  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const getMyClassrooms = async (req, res) => {
    const userId = req.user.id;
    const userRole = req.user.role;
    
    const user = await User.findById(userId)
    console.log(user);
    

    try {
        let classrooms;

        if (userRole === 'Teacher') {
            // If the user is a teacher, find classrooms where they are assigned
            classrooms = await Classroom.find({ teacher: user.email });
        } else if (userRole === 'Student') {
            // If the user is a student, find classrooms where they are enrolled
            classrooms = await Classroom.find({ students: userId });
        } else {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.status(200).json({ classrooms });
    } catch (error) {
        console.error('Error fetching classrooms:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};