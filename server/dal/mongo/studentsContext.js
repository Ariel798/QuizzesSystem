const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const { Student } = require("../../schemes/models");

const checkAddStudent = async (student) => {
  try {
    const studentModel = new Student(student);
    const data = await Student.findOne({ email: student.email });
    if (data) {
      return data;
    } else {
      return await studentModel.save();
    }
  } catch (err) {
    console.log(err);
  }
};

const getStudents = () => {
  return Student.find({});
};

const getStudentQuizzes = (id) => {
  return Student.find({ _id: id }).populate("submittedQuizzes");
};

module.exports = {
  checkAddStudent,
  getStudents,
  getStudentQuizzes,
};
