
var temp=document.getElementById("cont");

function add(){
    var list=document.createElement("ul");
    var x = document.getElementById("input");
    var node=document.createElement('li');
    span = document.createElement('span');
    span.innerHTML='&#10006';
    list.append(span);
    node.append(x.value);
    list.appendChild(node);
    if(x.value!="")
    temp.appendChild(list);
    else{
        alert("Please provide input")
    }
    x.value="";
    save();
}
temp.addEventListener('click',function(e){
       if(e.target.tagName === "SPAN"){
       e.target.parentElement.remove();
       save();
    }
})
function save() {
    localStorage.setItem('data',temp.innerHTML);
}
function display() {
    temp.innerHTML=localStorage.getItem('data');
}
display();