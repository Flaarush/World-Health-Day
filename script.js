const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Which is the vegtable?',
    answers: [
      { text: 'Tomato', correct: true },
      { text: 'Apple', correct: false }]
  },
  {
    question: 'Which of the following is not an exercise?',
    answers: [
      { text: 'Eating', correct: true },
      { text: 'Swimming', correct: false },
      { text: 'Running', correct: false },
      { text: 'Thinking', correct: false }]
  },
  {
    question: 'Which foods are healthy?',
    answers: [
      { text: 'A Hot Dog', correct: false },
      { text: 'Pizza', correct: false },
      { text: 'Fish n chips', correct: false },
      { text: 'Stew', correct: true }]
  },
  {
    question: 'Which is better?',
    answers: [
      { text: 'British Football', correct: true },
      { text: 'American Football', correct: true }]
     },
     {
         question: 'Now sleep is important for good health. What time do you sleep',
    answers: [
      { text: '9 o clock <', correct: false },
      { text: '9 o clock >', correct: true }]
      },
  {
    question: 'Sure it is ok to have a treat once in a while. But not every day. Pick the healthier dish',
    answers: [
      { text: '5 waffles with nuttela and whipped cream on it.', correct: false },
      { text: '5 oat pancakes with nutella and no whipped cream on it.', correct: true }]
     },
        { question: 'If you eat vanilla ice cream only as desert forever. Howmany days will you save?',
    answers: [
      { text: '1 Day', correct: true },
      { text: '5 Days', correct: false },
      { text: '3 days', correct: false },
      { text: '8 months', correct: false }]
    }
]