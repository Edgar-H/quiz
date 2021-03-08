let typeAnswer = '';
let answerCorrect= [];
let totalAnswer = [];
let checkAnswer = [];

function printCategory(data) {
  let contentCategory = document.getElementById('categoryQuestions');
  let html = '';
  data.forEach(element => {
  html += `<option value="${element.id}">${element.name}</option>`
  });
  contentCategory.innerHTML += html;
}

function printData(data){
  let containerData = document.getElementById('quizContent');
  // Generar los datos
  if (typeAnswer == 'multiple') {
      let html = '';
      let x = 0+1;
      let z = 0;
  data.forEach(element => {
let answersOptions = [element.correct_answer, element.incorrect_answers[0], element.incorrect_answers[1], element.incorrect_answers[2]];
let random = answersOptions.sort();
answerCorrect.push(element.correct_answer);
totalAnswer.push(element.correct_answer, element.incorrect_answers[0], element.incorrect_answers[1], element.incorrect_answers[2])
    html +=`
          <div class="question-content">
            <p>No.${[x]} ${element.question}</p>
            <div class="answer-content">
              <div class="answer">
                <input type="radio" name="p${[x]}" id="id${[z]}" value="${random[0]}" required><label for="id${[z++]}">${random[0]}</label >
              </div>
              <div class="answer">
                <input type="radio" name="p${[x]}" id="id${[z]}" value="${random[1]}" required><label for="id${[z++]}">${random[1]}</label>
              </div>
              <div class="answer">
                <input type="radio" name="p${[x]}" id="id${[z]}" value="${random[2]}" required><label for="id${[z++]}">${random[2]}</label>
              </div>
              <div class="answer">
                <input type="radio" name="p${[x]}" id="id${[z]}" value="${random[3]}" required><label for="id${[z++]}">${random[3]}</label>
              </div>
            </div>
          </div>`
          x++;
  });
html+=  `
        <div class="submit">
          <input type="submit" value="Submit" onclick="serchAnswerChecked()">
        </div>`
  containerData.innerHTML = html;
  } else {
      let html = '';
      let x = 0+1;
      let z = 0;
  data.forEach(element => {
let answersOptions = [element.correct_answer, element.incorrect_answers[0]];
let random = answersOptions.sort();
answerCorrect.push(element.correct_answer);
totalAnswer.push(element.correct_answer, element.incorrect_answers[0]);
    html +=`
          <div class="question-content">
            <p>No.${[x]} ${element.question}</p>
            <div class="answer-content">
              <div class="answer">
                <input type="radio" name="p${[x]}" id="id${[z]}" value="${random[0]}" required ><label for="id${[z++]}">${random[0]}</label >
              </div>
              <div class="answer">
                <input type="radio" name="p${[x]}" id="id${[z]}" value="${random[1]}" required><label for="id${[z++]}">${random[1]}</label>
              </div>
            </div>
          </div>`
          x++;
  });
  html+= `
        <div class="submit">
          <input type="submit" value="Submit" onclick="serchAnswerChecked()">
        </div>`
  containerData.innerHTML = html;
  }
}

function getQuestions(){
  const totalQuestions = document.getElementById('totalQuestions').value;
  const categoryQuestions = document.getElementById('categoryQuestions').value;
  const difficultyQuestions = document.getElementById('difficultyQuestions').value;
  const typeQuestions = document.getElementById('typeQuestions').value;
  typeAnswer = typeQuestions;
const urlQuiz = `https://opentdb.com/api.php?amount=${totalQuestions}&category=${categoryQuestions}&difficulty=${difficultyQuestions}&type=${typeQuestions}`;
fetch(urlQuiz)
  .then((response) => response.json())
  .then((data) => printData(data.results));
}

function getCategories(){
  const urlCatgories = 'https://opentdb.com/api_category.php'
  fetch(urlCatgories)
  .then((response) => response.json())
  .then((data) => printCategory(data.trivia_categories));
}
getCategories();

const answerForm = document.getElementById('answerForm');
answerForm.addEventListener('submit', (e) => {
  e.preventDefault();
});



function serchAnswerChecked(){
  for (let i = 0; i < totalAnswer.length; i++) {
    console.log(totalAnswer);
    if (document.querySelector(`#id${i}`).checked== true) {
      checkAnswer.push(document.querySelector(`#id${i}`).value)
    }
  }
  let score = 0;
  for (let i = 0; i < answerCorrect.length; i++) {
    if (checkAnswer[i] == answerCorrect[i]) {
      score++;
    }
  }

  localStorage.setItem("score", score);
  localStorage.setItem("incorect", answerCorrect.length);
  window.location.replace("./score.html");
}
