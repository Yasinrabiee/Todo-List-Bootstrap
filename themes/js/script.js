const input = $(`#text`);
const btn = $(`#btn`);
const todo = $(`#todos`);
let bgc;

let todos = localStorage.getItem(`todos`) === null ? [] :
JSON.parse(localStorage.getItem(`todos`));
let numberTodo = localStorage.getItem(`todos`) === null ? -1 :
JSON.parse(localStorage.getItem(`todos`)).length;

function removeItem(ar, ele) {
    ar.forEach((item, index) => {
        if (item.text == ele) {
        	ar.splice(index, 1);
        }
    });
    return ar;
}

btn.click(function() {
	numberTodo++;
	localStorage.setItem(`lastNumber`, numberTodo);
	const text = input.val();
	input.val(``);
	todo.append(`
		<li class="items list-group-item" id="item-${numberTodo}" style="background-color: ${bgc}">${text}</li>
	`);
	input.focus();
	let newObject = {
		number: numberTodo,
		text: text,
		color: bgc
	}
	todos.push(newObject);
	localStorage.setItem(`todos`, JSON.stringify(todos));
});

window.addEventListener(`load`, function(e) {
	let lastTodos = JSON.parse(localStorage.getItem(`todos`));
	if (lastTodos !== null) {
		const l = lastTodos.length;
		for (let i = 0; i < l; i++) {
			todo.append(`
				<li class="items list-group-item" id="item-${lastTodos[i].number}" style="background-color: ${lastTodos[i].color}">
					${lastTodos[i].text}
				</li>
			`);			
		}
	}
});

todo.on('click', 'li', function() {
	$(this).fadeOut();

	let item = $(this).html();
	item = item.replaceAll(/\s/g, ``);
	todos = removeItem(todos, item);
	localStorage.setItem(`todos`, JSON.stringify(todos));
});

$(`.color`).click(function() {
	bgc = $(this).css(`background-color`);
	$(`#preview li`).css(`background-color`, bgc);
});