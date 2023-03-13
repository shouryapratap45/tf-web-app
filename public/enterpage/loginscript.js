let submit=document.getElementById('subbtn');
let eml=document.getElementById('email');
let password=document.getElementById('pswd');
let eye=document.getElementById('eye');
eye.addEventListener('click',showPassword);
eml.addEventListener('keyup',submitColor);
password.addEventListener('keyup',submitColor);
let http;

submit.addEventListener('click',login);

function submitColor(){
  if(eml.value!='' && password.value!='')
  {
      submit.style.backgroundColor='#007BFF';
      submit.style.color='white';
  }  
  else
  {
      submit.style.backgroundColor='#F0F0F0';
      submit.style.color='black';
  }
}

function showPassword(){
  if(password.type==='password')
  {
    password.type='text';
    eye.className=eye.className.replace("-slash","");
  }
  else
  {
    eye.className+="-slash";
    password.type='password';
  }
}

function login(){
  if(eml.value=='' || password.value=='')
    return;

  http=new XMLHttpRequest();
  http.open('GET',"/login?email="+eml.value+"&password="+password.value);
  http.addEventListener('load',showHomepage);
  http.send(); 
}
function showHomepage(){
    if(http.responseText=="Login error")
      alert(http.responseText);
    else  
      document.documentElement.innerHTML=http.responseText;
}