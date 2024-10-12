let Quiz = require('../models/quizModel');

let createQuiz = async (req,res) =>{
    let {title , description , questions} = req.body

    if(req.user.role !== 'admin'){
        return res.status(400).json({message : "Only admins can create quizzes."})
    }
    if(!title  || !description || !questions){
        return res.status(400).json({message : "Please fill all the fields."})  
    }
    try {
        const quiz = new Quiz({ title, description, questions });
        await quiz.save();
        res.status(201).json(quiz);
    } catch (error) {
        res.status(500).json({ message: 'Error creating quiz', error });
    }
}
let  getQuiz = async (req,res) =>{
    try {
        const quiz = await Quiz.find();
        res.json({quiz});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quiz', error });
    }
}
let  getQuizById = async (req,res) =>{
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json({quiz});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quiz', error });
    }
}
let submitQuiz = async (req, res) => {
    let { quizId, answers } = req.body;
    if (!quizId || !answers) {
        return res.status(400).json({ message: "Please fill all the fields." });
    }
    try {
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        
        let score = 0;
        let outof = quiz.questions.length;
        let incorrectAnswers = [];

        for (let index = 0; index < quiz.questions.length; index++) {
            const question = quiz.questions[index];
            const answer = answers[index];

            if (answer === question.correctAnswer) {
                score++;
            } else {
                incorrectAnswers.push({
                    questionId: question._id,
                    question: question.text,
                    correctAnswer: question.correctAnswer,
                    givenAnswer: answer
                });
            }
        }

        res.json({ outof, score, incorrectAnswers });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting quiz', error });
    }
}


module.exports = {
    createQuiz ,
    getQuiz ,
    getQuizById ,
    submitQuiz
}