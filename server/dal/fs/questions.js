const fs = require("fs");
const path = "./db/questions.json";
const getQuestions = () => {
  const questionsJson = fs.readFileSync(path);
  const questionsArr = JSON.parse(questionsJson);
  return questionsArr;
};
const addQuestion = (question) => {
  const questions = getQuestions();
  questions.push(question);
  fs.writeFileSync(path, JSON.stringify(questions));
};
const deleteQuestion = (id) => {
  const questions = getQuestions();
  const updatedArr = questions.filter((q) => q.id != id);
  fs.writeFileSync(path, JSON.stringify(updatedArr));
  return updatedArr;
};
const editQuestion = (question) => {
  const questions = getQuestions();
  const index = questions.findIndex((q) => q.id === question.id);
  questions[index] = { ...question };
  fs.writeFileSync(path, JSON.stringify(questions));
  return questions;
};
const filterQuestions = (subject) => {
  const questions = getQuestions();
  return questions.filter((q) => q.subject == subject);
};

module.exports = {
  getQuestions,
  addQuestion,
  deleteQuestion,
  editQuestion,
  filterQuestions,
};
