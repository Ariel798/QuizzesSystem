import axios from "axios";

export function QuizzesService() {
  const getQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/quizzes");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const loadQuiz = async (id) => {
    try {
      const response = await axios.get("http://localhost:3001/quizzes/" + id);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const addQuiz = async (quiz) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/quizzes",
        JSON.stringify(quiz),
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteQuiz = async (_id) => {
    try {
      const response = await axios.delete(
        "http://localhost:3001/quizzes/" + _id
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const editQuiz = async (quiz) => {
    try {
      const response = await axios.put("http://localhost:3001/quizzes/", {
        quiz: JSON.stringify(quiz),
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getQuizzes,
    loadQuiz,
    addQuiz,
    deleteQuiz,
    editQuiz,
  };
}
