window.onload=loadData;
var obj={},xhr,user={};
var list=document.getElementById('list');
var logout=document.getElementById('logout');

logout.addEventListener('click',logoutUser);

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
    document.documentElement.innerHTML=log.responseText;
  }
}  

function loadData(){
  const http=new XMLHttpRequest();
  http.open('GET','/loginuser');
  http.setRequestHeader('content-type','application/json');
  http.addEventListener('load',()=>{
    console.log(http.responseType);
    user=JSON.parse(http.responseText);
  });

  xhr=new XMLHttpRequest();
  xhr.open('GET','/getinitialdata');
  xhr.setRequestHeader('content-type','application/json');
  xhr.addEventListener('load',showInitialData);
  http.send();
  xhr.send();
}
function showInitialData(){ 
  obj=JSON.parse(xhr.responseText);
  document.getElementById('user').innerHTML="Welcome "+user.name+" ...🎉";
  createProductList();
}
function createProductList(){
  let listing=document.createElement('div');
  listing.setAttribute('class','listing');
  for(prop in obj)
  {
    let listitems=document.createElement('div');
    listitems.setAttribute('class','listitems');
    let img=document.createElement('img');
    img.src=obj[prop].imageUrl;
    img.alt=obj[prop].imageUrl;
    let h4=document.createElement('h4');
    h4.innerHTML=obj[prop].name;
    let span=document.createElement('span');
    span.innerHTML="Price: "+obj[prop].price;
    let addbutton=document.createElement('button');
    addbutton.addEventListener('click',AddToCart);
    addbutton.name=prop;
    addbutton.setAttribute('class','cart');
    addbutton.innerHTML="Add To Cart";
    let viewbutton=document.createElement('button');
    viewbutton.addEventListener('click',popup);
    viewbutton.name=prop;
    viewbutton.setAttribute('class','desc');
    viewbutton.innerHTML="View Desc";
    listitems.append(img,document.createElement('br'),h4,span,document.createElement('br'),document.createElement('br'),addbutton,viewbutton);
    listing.appendChild(listitems);
  }
  list.appendChild(listing);
}

function popup(){
  Swal.fire({
    title: obj[this.name].name,
    imageUrl: obj[this.name].imageUrl,
    text: obj[this.name].text
  });
}
function AddToCart(){
  var http=new XMLHttpRequest();
  http.open("post","/addcart")
  http.setRequestHeader('content-type','application/json');
  http.send(JSON.stringify(obj[this.name]));
  Swal.fire("Added item in Cart");
}