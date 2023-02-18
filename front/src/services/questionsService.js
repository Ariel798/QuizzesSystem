import axios from "axios";

export function QuestionService() {
  const getQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:3001/questions");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const showQuestion = async (_id) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/questions/" + _id
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const filterBySubject = async (subject) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/questions/filter",
        { headers: { subject: subject } }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const addQuestion = async (question) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/questions",
        JSON.stringify(question),
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteQuestion = async (_id) => {
    try {
      const response = await axios.delete(
        "http://localhost:3001/questions/" + _id
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const editQuestion = async (question) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/questions/" + question._id,
        {
          question: JSON.stringify(question),
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getQuestions,
    showQuestion,
    filterBySubject,
    addQuestion,
    deleteQuestion,
    editQuestion,
  };
}
