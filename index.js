
```javascript
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Quiz questions database
const quizQuestions = [
  {
    id: 1,
    question: '¿Cuál es la capital de Francia?',
    options: ['Londres', 'Berlín', 'París', 'Madrid'],
    correctAnswer: 2
  },
  {
    id: 2,
    question: '¿En qué año llegó el hombre a la luna?',
    options: ['1965', '1969', '1972', '1975'],
    correctAnswer: 1
  },
  {
    id: 3,
    question: '¿Cuál es el planeta más grande del sistema solar?',
    options: ['Saturno', 'Neptuno', 'Júpiter', 'Urano'],
    correctAnswer: 2
  },
  {
    id: 4,
    question: '¿Quién escribió "Don Quijote"?',
    options: ['García Lorca', 'Miguel de Cervantes', 'Lope de Vega', 'Calderón'],
    correctAnswer: 1
  },
  {
    id: 5,
    question: '¿Cuál es el océano más grande del mundo?',
    options: ['Atlántico', 'Índico', 'Ártico', 'Pacífico'],
    correctAnswer: 3
  },
  {
    id: 6,
    question: '¿Cuántos continentes hay?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 2
  },
  {
    id: 7,
    question: '¿Cuál es la moneda de Japón?',
    options: ['Won', 'Yuan', 'Yen', 'Baht'],
    correctAnswer: 2
  },
  {
    id: 8,
    question: '¿En qué país está la Estatua de la Libertad?',
    options: ['Canadá', 'Estados Unidos', 'México', 'Francia'],
    correctAnswer: 1
  },
  {
    id: 9,
    question: '¿Cuál es el río más largo del mundo?',
    options: ['Amazonas', 'Nilo', 'Yangtsé', 'Misisipi'],
    correctAnswer: 1
  },
  {
    id: 10,
    question: '¿En qué año comenzó la Segunda Guerra Mundial?',
    options: ['1937', '1939', '1941', '1945'],
    correctAnswer: 1
  }
];

class QuizGame {
  constructor() {
    this.currentQuestion = 0;
    this.score = 0;
    this.userAnswers = [];
    this.totalQuestions = quizQuestions.length;
  }

  start() {
    console.clear();
    console.log('╔════════════════════════════════════════════╗');
    console.log('║     QUIZ DE CONOCIMIENTOS GENERALES         ║');
    console.log('╚════════════════════════════════════════════╝\n');
    console.log(`Total de preguntas: ${this.totalQuestions}`);
    console.log('Responde correctamente para obtener puntos.\n');
    console.log('Presiona Enter para comenzar...');
    
    rl.once('line', () => {
      this.askQuestion();
    });
  }

  askQuestion() {
    if (this.currentQuestion >= this.totalQuestions) {
      this.endQuiz();
      return;
    }

    const question = quizQuestions[this.currentQuestion];
    console.clear();
    console.log(`\nPregunta ${this.currentQuestion + 1}/${this.totalQuestions}`);
    console.log('─'.repeat(50));
    console.log(`\n${question.question}\n`);

    question.options.forEach((option, index) => {
      console.log(`  ${index + 1}. ${option}`);
    });

    console.log('\nIngresa el número de tu respuesta (1-' + question.options.length + '): ');

    rl.once('line', (answer) => {
      this.processAnswer(answer, question);
    });
  }

  processAnswer(answer, question) {
    const answerIndex = parseInt(answer) - 1;

    if (isNaN(answerIndex) || answerIndex < 0 || answerIndex >= question.options.length) {
      console.log('\n❌ Respuesta inválida. Intenta de nuevo.\n');
      rl.once('line', () => {
        this.currentQuestion--;
        this.askQuestion();
      });
      return;
    }

    const isCorrect = answerIndex === question.correctAnswer;
    this.userAnswers.push({
      questionId: question.id,
      userAnswer: answerIndex,
      correctAnswer: question.correctAnswer,
      isCorrect: isCorrect
    });

    if (isCorrect) {
      this.score++;
      console.log('\n✅ ¡Correcto! +10 puntos');
    } else {
      console.log('\n❌ Incorrecto.');
      console.log(`   Respuesta correcta: ${question.options[question.correctAnswer]}`);
    }

    console.log(`\nPuntuación actual: ${this.score}/${this.totalQuestions}\n`);

    this.currentQuestion++;
    
    rl.once('line', () => {
      this.askQuestion();
    });
  }

  endQuiz() {
    console.clear();
    console.log('╔════════════════════════════════════════════╗');
    console.log('║         QUIZ FINALIZADO                