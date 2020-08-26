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
	panel=document.getElementById("panel"),
	gameScore=document.getElementById("score"),
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
	if(qNo==questions.length-1){
		next.classList.toggle('hide')
	}
	else{
		next.classList.remove('hide');
	}
	if(qNo==0){
	prev.classList.toggle('hide')
	}
	else{
		prev.classList.remove('hide');
	}

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
			button.style.cursor="not-allowed";
		}
		else{
			button.addEventListener('click',checkAnswer)
		}
	}
	else{
		button.dataset.value="false";
		if(status==1){
			button.style.backgroundColor="red";
			button.style.cursor="not-allowed";
		}
		else{
			button.addEventListener('click',checkAnswer);
		}
	}
	
	answers.appendChild(button);

})
choices=document.querySelectorAll(".choice");
}
function checkAnswer(e){
	console.log("clicked");
	questions[qNo].status=1;
	var opted=e.target;
	if(opted.getAttribute("data-value")=="true"){
		score+=1;
	}
		choices.forEach((choice)=>{
			var value=choice.getAttribute("data-value")
			if(value=="true"){
				choice.style.backgroundColor="green";
				choice.style.cursor="not-allowed";
				choice.removeEventListener('click',checkAnswer);
			}
			else{
				choice.style.backgroundColor="red";
				choice.style.cursor="not-allowed";
				choice.removeEventListener('click',checkAnswer);
			}
		})

	completionCheck();
	}

function completionCheck(){
	var flag=0;
	for(var l=0;l<questions.length;l++){
		if(questions[l].status==0){
			flag=1;
		}
	}
	if(flag==0){
		setTimeout(function(){
			entireQue.classList.add("hide");
		prev.classList.add("hide");
		next.classList.add("hide");
		gameScore.classList.remove('hide');
		gameScore.textContent="Your Score is: "+score;
	},800)
		
	}
}

var questions=[{
	query:"How many countries, areas or territories are suffering from novel coronavirus outbreak in the World?",
	options:[
	{value:'More than 50',isTrue: false},
	{value:'More than 100',isTrue: false},
	{value:'More than 150',isTrue: false},
	{value:'More than 200',isTrue: true}],
	status:0,
	seen:0,
	img:""
},
{
	query:"Thailand announced that it has proceeded to test its novel coronavirus vaccine on which animal/bird?",
	options:[
	{value:'Monkeys',isTrue: true},
	{value:'Lizards',isTrue: false},
	{value:'Hens',isTrue: false},
	{value:'Kites',isTrue: false}],
	status:0,
	seen:0,
	img:""
},
{
	query:" Mild Symptoms of Novel coronavirus are:",
	options:[
	{value:'Fever',isTrue: false},
	{value:'Cough',isTrue: false},
	{value:'Shortness of breath',isTrue: false},
	{value:'All the above',isTrue: true}],
	status:0,
	seen:0,
	img:""
},
{
	query:"From where coronavirus got its name?",
	options:[
	{value:'Due to their crown-like projections.',isTrue: true},
	{value:'Due to their leaf-like projections.',isTrue: false},
	{value:'Due to their surface structure of bricks.',isTrue: false},
	{value:'None of the above',isTrue: false}],
	status:0,
	seen:0,
	img:""
}

	]

