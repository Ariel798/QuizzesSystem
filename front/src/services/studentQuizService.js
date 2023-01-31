import axios from "axios";

export function StudentQuizService() {
  const getStudents = async () => {
    try {
      const response = await axios.get("http://localhost:3001/students");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const getStudentById = async (id) => {
    try {
      const response = await axios.get("http://localhost:3001/students/" + id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getStudentQuizzes = async (_id) => {
    try {
      const response = await axios.get("http://localhost:3001/students/" + _id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const checkAddStudent = async (student) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/students",
        JSON.stringify(student),
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const postSubmittedQuiz = async (subQuiz) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/submittedquizzes",
        JSON.stringify(subQuiz),
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  return {
    getStudents,
    getStudentById,
    getStudentQuizzes,
    checkAddStudent,
    postSubmittedQuiz,
  };
}
