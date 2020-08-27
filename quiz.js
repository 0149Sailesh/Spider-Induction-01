	if (localStorage.getItem("hasCodeRunBefore") === null) {
		var person={
			name:"Hello",
			date:"2020/08/27",
			time:"20:12",
			score:-1

		}
        localStorage.setItem('highScore',JSON.stringify(person));
        localStorage.setItem("hasCodeRunBefore", true);
    }


	//Start Button variable
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
	//Prev Next Start Panel
	panel=document.getElementById("panel"),
	//Score DOM variable
	gameScore=document.getElementById("score"),
	//Sid nav container variable
	side_nav=document.getElementById("side-nav"),
	username=document.getElementById("username"),
	textbox=document.querySelectorAll(".textbox"),
	//Which question number
    qNo=0,
    //Final Score
    score=0,
    //Options variable
    choices=document.querySelector(".choice"),
    //correct memes
    correct=document.getElementById("correct"),
    //Wrong memes
    wrong=document.getElementById("wrong"),
    //Nav Elements
    elems=document.querySelectorAll(".nav-elem");
    //Current playerName
    var player;


var container=document.querySelectorAll(".container");
var container2=document.querySelectorAll(".container2");
console.log(container[0].offsetTop);

var correctImg=["correct.jpg","correct1.jpg","correct2.png"];
var wrongImg=["wrong.png","wrong1.jpg","wrong2.jpg"];


next.addEventListener('click',()=>{
	qNo+=1;
	displayQuestion(questions[qNo]);
})
prev.addEventListener('click',()=>{
	qNo-=1;
	displayQuestion(questions[qNo]);
})
start.addEventListener('click',()=>{
	console.log(username.value);
	if(username.value==""){
		player="Anonymous";
	}
	else{
		player=username.value;
		console.log(player);
	}
	questions.sort(() => Math.random() - 0.5);
	entireQue.classList.remove("hide");
	textbox[0].classList.add("hide");
	start.classList.add("hide");
	side_nav.classList.remove("hide");
	displayQuestion(questions[qNo]);
})
function displayQuestion(question){
	if(qNo==questions.length-1){
		next.classList.add('hide')
	}
	else{
		next.classList.remove('hide');
	}
	if(qNo==0){
	prev.classList.add('hide')
	}
	else{
		prev.classList.remove('hide');
	}

//Setting options to be 0
answers.innerHTML="";
//Question status
var status=question.status;
//If asnwered correctly or not
var right=question.right;
//Setting question
var img='';
if(question.img!==""){
	img='<div class="image"><img style="width:100px;height:100px;" src="'+question.img+'"></div>';
}

asked.innerHTML='<p>'+question.query+'</p>'+img;
if(right===1){
	elems[qNo].style.backgroundColor="green";
}
else if(right===0){
	elems[qNo].style.backgroundColor="red";
}
else{
	elems[qNo].style.backgroundColor="orange";
}


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
container=document.querySelectorAll(".container");
}
function checkAnswer(e){
	console.log("clicked");
	questions[qNo].status=1;
	var opted=e.target;
	if(opted.getAttribute("data-value")=="true"){
		//Incrementing score
		score+=1;
		//Setting right variable to 1
		questions[qNo].right=1;
		//Setting side elem to green
		elems[qNo].style.backgroundColor="green";
		//For meme
		let foo = Math.floor(Math.random() * 3);
		correct.setAttribute("src",correctImg[foo]);
		correct.style.height=container[0].offsetHeight+"px";
		correct.style.left=container[0].offsetLeft+"px";
		correct.style.top=container[0].offsetTop+"px";
		correct.style.width=container[0].offsetWidth+"px";
		correct.classList.toggle("hide");
		setTimeout(function(){
					correct.classList.add("hide");
				},3000)
		
	}
	else{
		questions[qNo].right=0;
		let foo = Math.floor(Math.random() * 3);
		elems[qNo].style.backgroundColor="red";
		wrong.setAttribute("src",wrongImg[foo]);
		wrong.style.height=container[0].offsetHeight+"px";
		wrong.style.left=container[0].offsetLeft+"px";
		wrong.style.top=container[0].offsetTop+"px";
		wrong.style.width=container[0].offsetWidth+"px";
		wrong.classList.toggle("hide");
		setTimeout(function(){
					wrong.classList.add("hide");
				},3000)
		

	}
		choices.forEach((choice)=>{
			console.log(container[0].offsetTop);
			var value=choice.getAttribute("data-value");
			console.log(value);
			if(value==="true"){
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
		var person=JSON.parse(localStorage.getItem("highScore"));
		var today= new Date();
		var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
		var time = today.toLocaleTimeString();
		if(score>=person.score){
			var newP={
				name:player,
				date:date,
				time:time,
				score:score

			}
			localStorage.setItem("highScore",JSON.stringify(newP));
		}
		setTimeout(function(){
			entireQue.classList.add("hide");
		prev.classList.add("hide");
		side_nav.classList.add("hide");
		next.classList.add("hide");
		gameScore.classList.remove('hide');
		var high=JSON.parse(localStorage.getItem("highScore"));
		gameScore.innerHTML=player+', your Score is: '+score;
		container2[0].classList.remove("hide");
		container2[0].innerHTML='<div class="font"><p style="font-family: Arial;font-size: 25px;color: gold;"">High Score Details</p><ul><li>Name: '+high.name+'</li><li>Score: '+high.score+'</li><li>Date: '+high.date+'</li><li>Time: '+high.time+'</li></ul></div>'	
	},800)
		
	}
}
function navigate(val){
	qNo=val;
	displayQuestion(questions[qNo]);
}

var questions=[{
	query:" What is Coronavirus?",
	options:[
	{value:'It is a large family of viruses.',isTrue: false},
	{value:' It belongs to the family of Nidovirus.',isTrue: false},
	{value:'Both A and B are correct',isTrue: true},
	{value:'Only A is correct.',isTrue: false}],
	status:0,
	seen:0,
	img:"",
	right:5
},

	{query:"How many countries, areas or territories are suffering from novel coronavirus outbreak in the World?",
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
},
{
	query:" Name a clinical trial in which blood is transfused from recovered COVID-19 patients to a coronavirus patient who is in critical condition?",
	options:[
	{value:' Plasma Therapy',isTrue: true},
	{value:'Solidarity',isTrue: false},
	{value:'Remdesivir',isTrue: false},
	{value:'Hydroxychloroquine',isTrue: false}],
	status:0,
	seen:0,
	img:""
},
{
	query:" Which of the following diseases are related to coronavirus?",
	options:[
	{value:'MERS',isTrue: false},
	{value:'SARS',isTrue: false},
	{value:'Both A and B',isTrue: true},
	{value:'Neither A nor B',isTrue: false}],
	status:0,
	seen:0,
	img:""
},

{
	query:"The first case of novel coronavirus was identified in .....",
	options:[
	{value:'Beijing',isTrue: false},
	{value:'Shanghai',isTrue: false},
	{value:'Wuhan, Hubei ',isTrue: true},
	{value:'Tianjin',isTrue: false}],
	status:0,
	seen:0,
	img:""
},
{
	query:"In a study, which cells are found in COVID-19 patients 'bode well' for long term immunity?",
	options:[
	{value:'P-cell',isTrue: false},
	{value:'D-Cell',isTrue: false},
	{value:'T-Cell',isTrue: true},
	{value:'Endothelial Cells',isTrue: false}],
	status:0,
	seen:0,
	img:""
},
{
	query:" Name the vaccine that is jointly developed by the German company BioNTech and US pharma giant Pfizer for COVID-19?",
	options:[
	{value:'BNT162',isTrue: true},
	{value:'PICOVACC',isTrue: false},
	{value:'Both A and B',isTrue: false},
	{value:'Neither A nor B',isTrue: false}],
	status:0,
	seen:0,
	img:""
},
{
	query:"What are the precautions that need to be taken to protect from the coronavirus?",
	options:[
	{value:'Cover your nose and mouth when sneezing.',isTrue: true},
	{value:'Add more garlic into your diet.',isTrue: false},
	{value:'Visit your doctor for antibiotics treatment',isTrue: false},
	{value:'Wash your hands after every hour.',isTrue: false}],
	status:0,
	seen:0,
	img:""
}

	

	]
