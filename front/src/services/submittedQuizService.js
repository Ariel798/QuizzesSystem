import axios from "axios";

export function SubmittedQuizService() {
  const getSubmittedQuizzes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/submittedquizzes"
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const getAllSubmittedQuiz = async (_id) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/submittedquizzes/" + _id
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getSubmittedQuizzes,
    getAllSubmittedQuiz,
  };
}
