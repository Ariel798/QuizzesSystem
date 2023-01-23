import axios from "axios";


export function QuizzesService() {
    //const url = process.env.REACT_APP_SERVER_URL+"quizzes";
    //CHANGE TO ALL
    const getQuizzes = async () => {
        try {
          const response = await axios.get('http://localhost:3001/quizzes/');
          return response.data;
        } catch (error) {
          console.error(error);
        }
     }

     const showQuiz = async (_id) => {
      try {
        const response = await axios.get('http://localhost:3001/quizzes/'+_id);
        return response.data;
      } catch (error) {
        console.error(error);
      }
     }

     const loadQuiz = async (_id) => {
        try {
            const response = await axios.get('http://localhost:3001/quizzes'+_id);
            return response.data;
          } catch (error) {
            console.error(error);
          }
     };

     const getQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:3001/quizzes/new');
            return response.data;
          } catch (error) {
            console.error(error);
          }
     };

     const addQuiz = async () => {
        try {
            const response = await axios.post('http://localhost:3001/quizzes');
            return response.data;
          } catch (error) {
            console.error(error);
          }
     }

     const deleteQuiz = async (_id) => {
        try {
            const response = await axios.delete('http://localhost:3001/quizzes/'+_id);
            return response.data;
          } catch (error) {
            console.error(error);
          }
     }

     const editQuiz = async (_id) => {
        try {
            const response = await axios.put('http://localhost:3001/quizzes/'+_id);
            return response.data;
          } catch (error) {
            console.error(error);
          }
     }

    return{getQuizzes, showQuiz,loadQuiz,getQuestions,addQuiz, deleteQuiz, editQuiz};
}