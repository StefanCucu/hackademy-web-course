document.addEventListener('DOMContentLoaded', function() {
    alert("Welcome to the page!");
})

let header = document.getElementById("header1");

header.textContent = "Hello, World!";

let button = document.getElementById("clicky_btn");
let toggle = false;

button.addEventListener("click", function(){
    if(!toggle){
        let para = document.createElement("p");
        let node = document.createTextNode("Hello!");
        para.appendChild(node);
        para.classList.add('box')
        para.id = "button-box"
        
        let body = document.querySelector("body")
        console.log(body)
        body.appendChild(para)
        toggle = true;
    }
    else {
        let para = document.getElementById("button-box")
        para.remove()
        toggle = false;
    }
})
