'use strict';

const CORRECT_RADIO_CHOICE = 'the_xx',
	  CORRECT_TEXT_CHOICE = 'coexist',
	  CORRECT_ANSWER_MESSAGE = 'Well done!',
	  WRONG_ANSWER_MESSAGE = 'Try again!';

var parentFieldSet = document.getElementsByTagName('fieldset')[0],
	sendButton = document.querySelector('#quiz input[type="submit"]'),
	isButtonClicked = false;

// Обработчик события нажатия ЛКМ на кнопке
sendButton.onclick = checkAnswers;

function checkAnswers() {
	
	// Проверяем, первый ли раз нажимают кнопку "Next Question",
	// и если нет, то удаляем предыдущее сообщение о правильности ответа
	if (isButtonClicked)
		parentFieldSet.removeChild(document.getElementsByClassName('message')[0]);
	
	var radioChoicesCollection = document.querySelectorAll('#quiz input[type="radio"]'),
		inputTextField = document.getElementsByName('album')[0],
		isCorrectOptionSelected = false, isCorrectTextEntered = false;
	
	// Проверяем, правильный ли текст ввел пользователь
	if (inputTextField.value.toString().toLowerCase().trim() == CORRECT_TEXT_CHOICE)
		isCorrectTextEntered = true;
	
	// Проверяем, правильный ли вариант ответа выбран
	for (let i = 0; i < radioChoicesCollection.length; i++) {
		if (radioChoicesCollection[i].value == CORRECT_RADIO_CHOICE && 
			radioChoicesCollection[i].checked == true)
			isCorrectOptionSelected = true;
	}
	
	// Показываем пользователю сообщение об ошибке / поздравление
	if (isCorrectOptionSelected && isCorrectTextEntered) createResultMessage(true);
	else createResultMessage(false);
	
	isButtonClicked = true;
	
}

// Функция, добавляющая на страницу блок с сообщением пользователю
function createResultMessage(result) {
	
	var message = document.createElement('div');
	message.classList.add('message');
	
	if (!result) {
		message.innerText = WRONG_ANSWER_MESSAGE;
		message.classList.add('incorrect');
	} else {
		message.innerText = CORRECT_ANSWER_MESSAGE;
		message.classList.add('correct');
	}
	
	parentFieldSet.appendChild(message);
	
}
