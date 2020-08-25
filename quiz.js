var start=document.getElementById("start"),
	//Question along with answers asked
	entireQue=document.getElementById("question"),
	//Options
	answers=document.getElementById("answers"),
	//Question asked
	asked=document.getElementById("asked"),
	//Previous button
	prev=document.getElementById("prev"),
	//Next Button
	next=document.getElementById("next"),
	//Which question number
    qNo=0,
    score=0,

     choices=document.querySelectorAll(".choice");




next.addEventListener('click',()=>{
	qNo+=1;
	displayQuestion(questions[qNo]);
})
prev.addEventListener('click',()=>{
	qNo-=1;
	displayQuestion(questions[qNo]);
})
start.addEventListener('click',()=>{
	entireQue.classList.remove("hide");
	prev.classList.remove("hide");
	next.classList.remove("hide");
	start.classList.add("hide");
	displayQuestion(questions[qNo]);
})
function displayQuestion(question){
//Setting options to be 0
answers.innerHTML="";
//Question status
var status=question.status;
//Setting question
var img='';
if(question.img!==""){
	img='<div class="image"><img style="width:100px;height:100px;" src="'+question.img+'"></div>';
}

asked.innerHTML='<p>'+question.query+'</p>'+img;



//Creating options
question.options.forEach((option)=>{
	var button=document.createElement('button');
	button.textContent=option.value;
	button.classList.add('choice');
	if(option.isTrue){
		button.dataset.value="true";
		if(status==1){
			button.style.backgroundColor="green";
		}
	}
	else{
		button.dataset.value="false";
		if(status==1){
			button.style.backgroundColor="red";
		}
	}
	button.addEventListener('click',checkAnswer)
	answers.appendChild(button);

})
choices=document.querySelectorAll(".choice");
}
function checkAnswer(e){
	questions[qNo].status=1;
	var opted=e.target;
	if(opted.getAttribute("data-value")=="true"){
		score+=1;
	}
		choices.forEach((choice)=>{
			var value=choice.getAttribute("data-value")
			console.log(value)
			if(value=="true"){
				choice.style.backgroundColor="green";
			}
			else{
				choice.style.backgroundColor="red";
			}
		})

	}


var questions=[{
	query:"How to greet people",
	options:[
	{value:'hi',isTrue: true},
	{value:'bye',isTrue: false},
	{value:'poda',isTrue: false},
	{value:'va',isTrue: false}],
	status:0,
	seen:0,
	img:"boy.jpg"
},
{
	query:"How are you?",
	options:[
	{value:'ok',isTrue: true},
	{value:'bad',isTrue: false},
	{value:'poda',isTrue: false},
	{value:'va',isTrue: false}],
	status:0,
	seen:0,
	img:""
}
	]

