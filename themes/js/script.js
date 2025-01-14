const input = $(`#text`);
const btn = $(`#btn`);
const todo = $(`#todos`);
let bgc;

let todos = localStorage.getItem(`todos`) === null ? [] :
JSON.parse(localStorage.getItem(`todos`));
let numberTodo = localStorage.getItem(`todos`) === null ? -1 :
JSON.parse(localStorage.getItem(`todos`)).length;

function addTodo() {
	numberTodo++;
	localStorage.setItem(`lastNumber`, numberTodo);
	const text = input.val();
	let dir = undefined;
	if (checkDir(text))
		dir = `ltr`;
	else
		dir = `rtl`;
	input.val(``);
	todo.append(`
		<li class="items list-group-item" id="item-${numberTodo}"
		style="background-color: ${bgc}; direction: ${dir};">
			${text}
		</li>
	`);
	input.focus();
	let newObject = {
		number: numberTodo,
		text: text,
		color: bgc,
		direction: dir
	}
	todos.push(newObject);
	localStorage.setItem(`todos`, JSON.stringify(todos));
}

function removeItem(ar, ele) {
    ar.forEach((item, index) => {
        if (item.number == ele) {
        	ar.splice(index, 1);
        }
    });
    return ar;
}

function checkDir(text) {
	const ch = text.charCodeAt(0);
	if (ch >= 65 && ch <= 122)
		return true;
	return false;
}

btn.click(function() {
	if (input.val() !== ``)
		addTodo();
});

input.keydown(function(e) {
	if (input.val() !== ``) {
		if (e.key === `Enter`)
			addTodo();
	}
});

window.addEventListener(`load`, function(e) {
	let lastTodos = JSON.parse(localStorage.getItem(`todos`));
	if (lastTodos !== null) {
		const l = lastTodos.length;
		for (let i = 0; i < l; i++) {
			todo.append(`
				<li class="items list-group-item" id="item-${lastTodos[i].number}"
				style="background-color: ${lastTodos[i].color};
				direction: ${lastTodos[i].direction};">
					${lastTodos[i].text}
				</li>
			`);			
		}
	}
});

todo.on('click', 'li', function() {
	$(this).fadeOut();

	// let item = $(this).html();
	// item = item.replaceAll(/\s/g, ``);
	let item = $(this).attr(`id`);
	item = item.replaceAll(`item-`, ``);
	todos = removeItem(todos, item);
	localStorage.setItem(`todos`, JSON.stringify(todos));
});

$(`.color`).click(function() {
	bgc = $(this).css(`background-color`);
	$(`#preview li`).css(`background-color`, bgc);
});

input.on(`input`, function() {
	if (checkDir($(this).val()))
		$(this).css(`direction`, `ltr`);
	else
		$(this).css(`direction`, `rtl`);
});