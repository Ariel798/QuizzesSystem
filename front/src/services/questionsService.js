import axios from "axios";

export function QuestionService() {

   const getQuestions = async () => {
        try {
          const response = await axios.get('http://localhost:3001/questions');
          return response.data;
        } catch (error) {
          console.error(error);
        }
     }

     const showQuestion = async (_id) => {
      try {
        const response = await axios.get('http://localhost:3001/questions/'+ _id);
        return response.data;
      } catch (error) {
        console.error(error);
      }
   }

     const filterBySubject = async () => {
      try {
        const response = await axios.get('http://localhost:3001/questions/filter');
        return response.data;
      } catch (error) {
        console.error(error);
      }
     };

     const addQuestion = async () => {
      try {
        const response = await axios.post('http://localhost:3001/questions');
        return response.data;
      } catch (error) {
        console.error(error);
      }
     };

     const deleteQuestion = async (_id) => {
       try {
        const response = await axios.delete('http://localhost:3001/questions/'+_id);
        return response.data;
      } catch (error) {
        console.error(error);
      }
     };

     const editQuestion = async (_id) => {
      try {
        const response = await axios.put('http://localhost:3001/questions/'+_id);
        return response.data;
      } catch (error) {
        console.error(error);
      }
     };


    return {
      getQuestions,
        showQuestion,

        addQuestion,
        deleteQuestion,
        editQuestion
     };
}


