let password = document.getElementById("password");
let bar = document.getElementById("strength-bar");
let text = document.getElementById("strength-text");
let entropyText = document.getElementById("entropy");
let crackTime = document.getElementById("crack-time");
let suggestions = document.getElementById("suggestions");
let toggle = document.getElementById("toggle");
let themeBtn = document.getElementById("theme-toggle");
let generateBtn = document.getElementById("generate");
let generatedPass = document.getElementById("generated-pass");

let commonPasswords = ["123456","password","12345678","qwerty","abc123","111111"];

/* show hide password */

toggle.onclick=function(){

if(password.type==="password"){
password.type="text";
}
else{
password.type="password";
}

};

/* theme toggle */

themeBtn.onclick=function(){

document.body.classList.toggle("light-mode");

};

/* password strength */

password.addEventListener("input",function(){

let pass=password.value;
let score=0;

suggestions.innerHTML="";

if(commonPasswords.includes(pass)){
text.innerHTML="Very Weak Password ❌ (Common Password)";
bar.style.width="100%";
bar.style.background="red";
return;
}

if(pass.length>=8){
score++;
}else{
suggestions.innerHTML+="<li>Use at least 8 characters</li>";
}

if(/[A-Z]/.test(pass)){
score++;
}else{
suggestions.innerHTML+="<li>Add uppercase letter</li>";
}

if(/[a-z]/.test(pass)){
score++;
}else{
suggestions.innerHTML+="<li>Add lowercase letter</li>";
}

if(/[0-9]/.test(pass)){
score++;
}else{
suggestions.innerHTML+="<li>Add numbers</li>";
}

if(/[!@#$%^&*]/.test(pass)){
score++;
}else{
suggestions.innerHTML+="<li>Add special characters</li>";
}

let percent=(score/5)*100;
bar.style.width=percent+"%";

if(score<=2){
bar.style.background="red";
text.innerHTML="Weak Password ❌";
}
else if(score==3 || score==4){
bar.style.background="orange";
text.innerHTML="Medium Password ⚠️";
}
else{
bar.style.background="green";
text.innerHTML="Strong Password ✅";
}

calculateEntropy(pass);

});

/* entropy calculation */

function calculateEntropy(password){

let charset=0;

if(/[a-z]/.test(password)) charset+=26;
if(/[A-Z]/.test(password)) charset+=26;
if(/[0-9]/.test(password)) charset+=10;
if(/[!@#$%^&*]/.test(password)) charset+=32;

let entropy=password.length*Math.log2(charset || 1);

entropyText.innerHTML="Entropy: "+entropy.toFixed(2)+" bits";

estimateCrackTime(entropy);

}

/* crack time estimation */

function estimateCrackTime(entropy){

let guesses=Math.pow(2,entropy);
let guessesPerSecond=1000000000;

let seconds=guesses/guessesPerSecond;

if(seconds<60)
crackTime.innerHTML="Crack Time: Seconds";

else if(seconds<3600)
crackTime.innerHTML="Crack Time: Minutes";

else if(seconds<86400)
crackTime.innerHTML="Crack Time: Hours";

else if(seconds<31536000)
crackTime.innerHTML="Crack Time: Days";

else
crackTime.innerHTML="Crack Time: Years";

}

/* password generator */

generateBtn.onclick=function(){

let chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

let pass="";

for(let i=0;i<12;i++){

let random=Math.floor(Math.random()*chars.length);

pass+=chars[random];

}

generatedPass.innerHTML="Suggested Password: "+pass;

};