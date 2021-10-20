let todos = [];
let counter = 0;
let all_selector = false, active_selector = false, completed_selector = false;

function render_html()
{
    let footer = document.getElementById('container-footer');
    let counter_text = document.getElementById('footer_counter');

    document.querySelectorAll('.child').forEach(e => e.remove());

    for(let i = 0; i < counter; i++){
        if(active_selector === true && todos[i].completed === true) continue;
        if(completed_selector === true && todos[i].completed === false) continue;

        let new_child = document.createElement("div");
        new_child.classList += "child";
        new_child.id = "child" + i;

        let new_checkbox = document.createElement('input');
        new_checkbox.setAttribute('type', 'checkbox');
        new_checkbox.setAttribute('onchange', 'on_check(this)')
        new_checkbox.classList += "child_checkbox";
        new_checkbox.id = "checkbox"+i;
        new_checkbox.checked = todos[i].completed;
        new_child.appendChild(new_checkbox);
        
        let new_input = document.createElement('p');
        new_input.setAttribute('contentEditable', 'true');
        new_input.innerHTML += todos[i].name;
        new_input.classList += "child_text";
        new_input.id = "child_text"+i;
        new_input.addEventListener('input', ()=>{
            todos[i].name = new_input.innerHTML;
        })

        if(todos[i].completed === true)
            new_input.classList.add('striked');
        else
            new_input.classList.remove('striked');
        new_child.appendChild(new_input);

        let new_button = document.createElement('input');
        new_button.setAttribute('type', 'button');
        new_button.setAttribute('value', 'x');
        new_button.classList += "child_remove_btn";
        new_button.id = 'child_remove_btn'+i;
        new_button.addEventListener("click", remove)
        new_child.appendChild(new_button);

        footer.insertAdjacentElement('beforebegin', new_child);
    }



    counter_text.innerHTML = counter + " items left";
}

function add_to_list()
{
    counter += 1;
    let todo = {
        name : document.getElementById('input_text').value,
        completed : false
    }

    todos.push(todo);
    document.getElementById('input_text').value = '';

    render_html();
}

function on_check(checked_element)
{
    let len = checked_element.id.length;
    let id = parseInt(checked_element.id.slice(8, len));
    todos[id].completed = checked_element.checked;
    render_html();
}

function remove(event)
{
    counter -= 1;

    let len = event.target.id.length;
    let id = parseInt(event.target.id.slice(16, len));
    todos.splice(id, 1);
    console.log(todos);

    render_html();
}

function check_everything()
{
    let everything_checked = true;
    for(let i = 0; i < counter; i++){
        if(todos[i].completed === false){
            everything_checked = false;
            break;
        }
    }
    if(everything_checked)
        for(let i = 0; i < counter; i++)
            todos[i].completed = false;
    else
        for(let i = 0; i < counter; i++)
            todos[i].completed = true;
    render_html();
}

function delete_all_checked()
{
    for(let i = 0; i < counter; i++){
        console.log(todos + i);
        if(todos[i].completed === true){
            todos.splice(i, 1);
            i--;
            counter--;
        }
    }
    console.log(todos);
    render_html();
}

let form = document.querySelector('form');
form.addEventListener('submit', (event)=>{
    event.preventDefault(); 
    add_to_list();
})

let checker = document.getElementById('input_button');
checker.addEventListener('click', check_everything);

let footer_btn1 = document.getElementById('footer_button1');
let footer_btn2 = document.getElementById('footer_button2');
let footer_btn3 = document.getElementById('footer_button3');

footer_btn1.addEventListener("click", ()=>{
    all_selector = true;
    active_selector = false;
    completed_selector = false;
    footer_btn1.classList.add("selected");
    footer_btn2.classList.remove("selected");
    footer_btn3.classList.remove("selected");
    render_html();
})

footer_btn2.addEventListener("click", ()=>{
    all_selector = false;
    active_selector = true;
    completed_selector = false;
    footer_btn1.classList.remove("selected");
    footer_btn2.classList.add("selected");
    footer_btn3.classList.remove("selected");
    render_html();
})

footer_btn3.addEventListener("click", ()=>{
    all_selector = false;
    active_selector = false;
    completed_selector = true;
    footer_btn1.classList.remove("selected");
    footer_btn2.classList.remove("selected");
    footer_btn3.classList.add("selected");
    render_html();
})

let footer_btn4 = document.getElementById('footer_button4');
footer_btn4.addEventListener('click', delete_all_checked);
