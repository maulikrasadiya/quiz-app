let express = require('express');
let route = express();
let controller = require('../controllers/quizController')
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

route.post('/',authenticateUser , authorizeRoles('admin'),controller.createQuiz);
route.get('/',authenticateUser ,controller.getQuiz);
route.get('/:id',authenticateUser ,controller.getQuizById);
route.post('/submit',authenticateUser, authorizeRoles('user') ,controller.submitQuiz);

module.exports = route