window.onload=callData;
var qnumber,user={};
const localhost="localhost";
var listing=document.getElementById('listing');
var check=document.getElementById('check');
var logout=document.getElementById('logout');

logout.addEventListener('click',logoutUser);
check.addEventListener('click',checkout);
var http,obj={};

function logoutUser(){
  let text=prompt("Enter Your Password");
  
  if(!text)
    return;
  let log=new XMLHttpRequest();
  log.open('POST',"/signingout?&password="+text);
  log.addEventListener('load',checkLogout);
  log.send();

  function checkLogout(){
    if(log.responseText=='Wrong Password')
      alert(log.responseText);  
    else
      document.documentElement.innerHTML=log.responseText;;
  }
}

function callData(){
  const xhr=new XMLHttpRequest();
  xhr.open('GET','/loginuser');
  xhr.setRequestHeader('content-type','application/json');
  xhr.addEventListener('load',()=>{
    user=JSON.parse(xhr.responseText);
  });

  http=new XMLHttpRequest();
  http.open('get','/getdata');
  http.setRequestHeader('content-type','application/json');
  http.addEventListener('load',showData);
  xhr.send();
  http.send();
}

function showData(){
  if(http.responseText=='login.html')
  {
    alert('Login error');
    window.location.href=`http://${localhost}:3000/enterpage/`+http.responseText;
  }
  obj=JSON.parse(http.responseText);
  document.getElementById('user').innerHTML="Welcome "+user.name+" ...🎉";
  if(!(JSON.stringify(obj)==='{}'))
    addElementToList();
  else
    showEmpty();
}
function showEmpty(){
    let h2=document.createElement('h2');
    h2.innerHTML="Cart is Empty!";
    listing.appendChild(h2); 
}
function addElementToList(){
  for(prop in obj)
  {
    let div=document.createElement('div');
    div.name=prop;
    div.setAttribute('class','listitems');
    let img=document.createElement('img');
    img.src=obj[prop].imageUrl;
    img.alt=obj[prop].imageUrl;
    let h4=document.createElement('h4');
    h4.innerText=obj[prop].name;
    let pspan=document.createElement('span');
    pspan.setAttribute('id',prop*10);
    pspan.innerHTML="Price: "+obj[prop].price;
    let qspan=document.createElement('span');
    qspan.setAttribute('id',prop);
    obj[prop].qvalue=1;
    qspan.innerHTML="Quantity: 1";
    let plus=document.createElement('button');
    plus.name=prop;
    plus.setAttribute('class','quantbutton');
    plus.addEventListener('click',changeQuantity);
    plus.innerHTML="+";
    let minus=document.createElement('button');
    minus.name=prop;
    minus.addEventListener('click',changeQuantity);
    minus.setAttribute('class','quantbutton');
    minus.innerHTML="-";
    let del=document.createElement('button');
    del.name=prop;
    del.addEventListener('click',removeItem);
    del.setAttribute('class','cart');
    del.innerHTML="Delete";
    let view=document.createElement('button');
    view.name=prop;
    view.addEventListener('click',popup);
    view.setAttribute('class','desc');
    view.innerHTML="View Desc";
    div.append(img,h4,pspan,document.createElement('br'),qspan,minus,plus,document.createElement('br'),document.createElement('br'),del,view);
    listing.appendChild(div);
  }
}
function changeQuantity(){
  let price;
  qnumber=document.getElementById(this.name);
  let pspan=document.getElementById(this.name*10);
  if(this.innerHTML=="+" && obj[this.name].qvalue<5)
  {
    obj[this.name].qvalue++;
    price=(obj[this.name].price*obj[this.name].qvalue);
    qnumber.innerHTML="Quantity: "+(obj[this.name].qvalue);
    pspan.innerHTML="Price: "+price;
  }
  else if(this.innerHTML=='-' && obj[this.name].qvalue!=1)
  {
    obj[this.name].qvalue--;
    price=obj[this.name].price*obj[this.name].qvalue;
    qnumber.innerHTML="Quantity: "+obj[this.name].qvalue;
    pspan.innerHTML="Price: "+price;
  }
}
function popup(){
  Swal.fire({
    title: obj[this.name].name,
    imageUrl: obj[this.name].imageUrl,
    text: obj[this.name].text
  });  
}
function removeItem(){
  let div=document.getElementsByClassName('listitems');
  for(let i=0;i<div.length;i++)
  {
    if(div[i].name==this.name)
    {
      listing.removeChild(div[i]);
      break;
    }
  }
  delete obj[this.name];
  updataData(this.name);
  if(JSON.stringify(obj)==='{}')
    showEmpty();
}
function updataData(id){
   let http=new XMLHttpRequest();
   http.open('post',"/updatedata?id="+id);
   http.send();
}
function checkout(){
    if(!(JSON.stringify(obj)==='{}'))
    {
      while(listing.lastChild)
        listing.removeChild(listing.firstChild);
      
      let h2=document.createElement('h2');
      h2.innerHTML="Congratulations 🎉 ! Your order has been placed & will be delivered to you soon.";
      listing.appendChild(h2);    
      obj={};
      let http=new XMLHttpRequest();
      http.open('post',"/clearcart");
      http.send();
    }
}