import axios from "axios";

export function SubmittedQuizService() {
    

    const getSubmittedQuizzes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/submittedquizzes');
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
    const getAllSubmittedQuiz = async (_id) => {
        try{
            const response = await axios.get('http://localhost:3001/submittedquizzes/'+ _id);
            return response.data;
        } catch(error){
            console.error(error);
        }
    }

    const addSubmittedQuiz = async (subQuiz) => {
        try {
            const response = await axios.post('http://localhost:3001/submittedquizzes',
            JSON.stringify(subQuiz),
            { headers: { "Content-Type": "application/json" } });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    return {
        getSubmittedQuizzes,
        addSubmittedQuiz,
        getAllSubmittedQuiz
    };
}