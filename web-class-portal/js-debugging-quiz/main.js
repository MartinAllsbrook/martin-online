alert("Ready for a quiz?");
quiz();

function quiz(){
	let score = 0;
	let num;

	let quiz_questions = [
	  'How many moons does Earth have?',
	  'How many moons does Saturn have?',
	  'How many moons does Venus have?'
	];

	let quiz_answers = [1, 82, 0];
	
	//get total number of questions
	let totalQuestion = quiz_questions.length;
	
	//generate random number for question
	let = Math.floor(Math.random() * 3);
		
	for(num = 0; num < totalQuestion; num++) {
		const question = quiz_questions[num];
		const answer = prompt(question);
		if (answer == quiz_answers[num]) {
			score++;
			alert("Correct!");
		} else {
			alert("Wrong");
		}
	}

  	document.write(`<p>You got ${score} out of ${totalQuestion} questions correct.</p>`);
}