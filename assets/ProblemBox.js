function initBox (questions) {

	var MQ = MathQuill.getInterface(2);

	let probBox = document.currentScript.parentElement;
	let qBox = probBox.querySelector(".question-field");

	let answerSpan = probBox.querySelector(".answer");
	let answerButton = probBox.querySelector(".submit");
	let resultBox = probBox.querySelector(".result-box");
	
	let counter = probBox.querySelector(".counter");

	let buttonPrev = probBox.querySelector(".prev");
	let buttonNext = probBox.querySelector(".next");

	let index = 0;
	setQuestion(index);


	let answerMathField = MQ.MathField(answerSpan, {
		spaceBehavesLikeTab: true,
		handlers: {
			edit : styleReset,
			enter: function() {
				checkAnswer();
			}
		}
	});

	answerButton.onclick = function () {
		checkAnswer();
	};

	function checkAnswer() {
		let input = answerMathField.latex();
		try {
			fn = evaluatex(input, {}, {latex: true});
			let result = fn();
			if (result == questions[index].a) {
				styleCorrect();
			} else {
				styleIncorrect();
			}
			console.log("Result: " + result);
		} catch (e) {
			styleIncorrect("Syntax Error");
			console.error("Error evaluating expression: " + e.message);
		}
	};
		
	buttonPrev.onclick = function () {
		if (index > 0) {
			setQuestion(--index);
		}
	};
	buttonNext.onclick = function () {
		if (index < questions.length - 1) {
			setQuestion(++index);
		}
	};
		
	// Begin helper functions
	function setQuestion(i) {
		qBox.innerHTML = questions[index].q;
		// MathJax may not be loaded when populating the initial question.
		// In this case, the question will be typeset along with the rest of the page
		if (typeof MathJax !== "undefined") {
			MathJax.typesetPromise([qBox]);
		}
		counter.innerHTML = `${index+1}/${questions.length}`
		styleReset();
	}

	function styleCorrect() {
		answerSpan.style.background = "#CCFFCC";
		resultBox.innerHTML = "Correct!";
	}

	function styleIncorrect(msg = "Incorrect") {
		answerSpan.style.background = "#FFDDDD";
		resultBox.innerHTML = msg;
	}

	function styleReset() {
		resultBox.innerHTML = "";

		answerSpan.style.background = "";
		answerSpan.style.borderColor = "";
	}
}