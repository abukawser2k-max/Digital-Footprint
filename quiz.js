
// Author: Kawser

// ---------- 1. Questions ----------
// "image" is the picture file for the question (kept in the images folder)
// "correct" is the number of the right answer: 0 = first, 1 = second, 2 = third, 3 = fourth
var questions = [
	{
		question: "What is a digital footprint?",
		image: "images/q1_KAW.svg",
		options: ["The trail of data you leave online", "A shoe print on a keyboard", "A computer virus", "A type of phone"],
		correct: 0
	},
	{
		question: "Which one adds to your digital footprint?",
		image: "images/q2_KAW.svg",
		options: ["Reading a paper book", "Walking in a park", "Posting a photo online", "Drinking water"],
		correct: 2
	},
	{
		question: "Where are your online files stored?",
		image: "images/q3_KAW.svg",
		options: ["In data centres", "In the air", "Inside your screen", "In your pocket"],
		correct: 0
	},
	{
		question: "What should you do with an old phone?",
		image: "images/q4_KAW.svg",
		options: ["Throw it in the bin", "Bury it in the garden", "Recycle it", "Leave it on the street"],
		correct: 2
	},
	{
		question: "Which of these is renewable energy?",
		image: "images/q5_KAW.svg",
		options: ["Coal", "Solar power", "Oil", "Petrol"],
		correct: 1
	},
	{
		question: "How can you save energy at home?",
		image: "images/q6_KAW.svg",
		options: ["Leave all lights on", "Turn off devices you are not using", "Keep the TV on all night", "Open the fridge often"],
		correct: 1
	},
	{
		question: "What is e-waste?",
		image: "images/q7_KAW.svg",
		options: ["Old electronic devices we throw away", "Waste from a farm", "Food waste", "Paper waste"],
		correct: 0
	},
	{
		question: "How can you reduce your digital footprint?",
		image: "images/q8_KAW.svg",
		options: ["Make more accounts", "Delete old files and emails", "Post everything online", "Download lots of apps"],
		correct: 1
	},
	{
		question: "Do data centres use electricity?",
		image: "images/q9_KAW.svg",
		options: ["No, never", "Only on Sundays", "Yes, a lot", "Only in winter"],
		correct: 2
	},
	{
		question: "What should you do before you share a photo online?",
		image: "images/q10_KAW.svg",
		options: ["Think about who can see it", "Share it with everyone", "Nothing", "Share your password too"],
		correct: 0
	}
];

// ---------- 2. Variables ----------
var currentQuestion = 0;   // which question we are on
var score = 0;             // how many answers are correct

// ---------- 3. Get the page parts ----------
var progressText = document.getElementById("quiz-progress");
var questionText = document.getElementById("quiz-question");
var imageBox = document.querySelector(".question-image");

// Make the picture box match the picture colour, so there are no white gaps
imageBox.style.backgroundColor = "#EFFCD9";
imageBox.style.padding = "10px";
var optionsBox = document.getElementById("quiz-options");
var errorText = document.getElementById("quiz-error");
var nextButton = document.getElementById("quiz-next");
var restartButton = document.getElementById("quiz-restart");
var questionArea = document.getElementById("quiz-question-area");
var resultArea = document.getElementById("quiz-result");
var scoreText = document.getElementById("quiz-score");
var messageText = document.getElementById("quiz-message");

// ---------- 4. Show a question ----------
function showQuestion() {
	var q = questions[currentQuestion];

	// Show question number and question
	progressText.textContent = "Question " + (currentQuestion + 1) + " / " + questions.length;
	questionText.textContent = q.question;

	// Show the picture (if the picture is missing, show the text "Question Image")
	imageBox.innerHTML =
		'<img src="' + q.image + '" alt="Picture for question ' + (currentQuestion + 1) + '" ' +
		'style="display: block; margin: 0 auto; max-width: 100%; max-height: 240px;" ' +
		'onerror="this.outerHTML = \'<p>Question Image</p>\'">';

	// Clear old options, then add the 4 new ones
	optionsBox.innerHTML = "";
	for (var i = 0; i < q.options.length; i++) {
		optionsBox.innerHTML +=
			'<label class="option d-block">' +
			'<input type="radio" name="answer" value="' + i + '"> ' + q.options[i] +
			'</label>';
	}

	// Hide the error message
	errorText.hidden = true;

	// On the last question the button says Finish
	if (currentQuestion === questions.length - 1) {
		nextButton.textContent = "Finish";
	} else {
		nextButton.textContent = "Next";
	}
}

// ---------- 5. When the Next button is clicked ----------
function clickNext() {
	// Find the answer the user picked
	var picked = document.querySelector('input[name="answer"]:checked');

	// VALIDATION: if nothing is picked, show the error and stop
	if (picked === null) {
		errorText.hidden = false;
		return;
	}

	// Check if the answer is correct
	if (Number(picked.value) === questions[currentQuestion].correct) {
		score = score + 1;
	}

	// Go to the next question, or show the result
	currentQuestion = currentQuestion + 1;
	if (currentQuestion < questions.length) {
		showQuestion();
	} else {
		showResult();
	}
}

// ---------- 6. Show the final score ----------
function showResult() {
	questionArea.hidden = true;
	resultArea.hidden = false;
	scoreText.textContent = "You scored " + score + " out of " + questions.length;

	if (score >= 8) {
		messageText.textContent = "Great job!";
	} else if (score >= 5) {
		messageText.textContent = "Good try! Keep learning.";
	} else {
		messageText.textContent = "Try again to get a better score.";
	}
}

// ---------- 7. Start again ----------
function restartQuiz() {
	currentQuestion = 0;
	score = 0;
	resultArea.hidden = true;
	questionArea.hidden = false;
	showQuestion();
}

// ---------- 8. Connect the buttons ----------
nextButton.addEventListener("click", clickNext);
restartButton.addEventListener("click", restartQuiz);

// ---------- 9. Start the quiz ----------
showQuestion();
