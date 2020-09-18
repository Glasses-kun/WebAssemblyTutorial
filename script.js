let add;
let subtract;
let divide;
let multiply;

function loadWasm(filename)
{
	return fetch(filename)
	.then(response => response.arrayBuffer())
	.then(bits => WebAssembly.compile(bits))
	.then(module => new WebAssembly.Instance(module));
}

loadWasm('arithmetic.wasm')
.then(instance => {
	add = instance.exports.add;
	subtract = instance.exports.subtract;
	divide = instance.exports.divide;
	multiply = instance.exports.multiply;
});

function solve()
{
	let operation = document.getElementById("selectOperation").value;
	let value1 = document.getElementById('value1').value;
	let value2 = document.getElementById('value2').value;
	let result;

	switch(operation) {
		case 'Add':
			result = add(value1, value2);
			break;
		case 'Subtract':
			result = subtract(value1, value2);
			break;
		case 'Divide':
			result = divide(value1, value2);
			break;
		case 'Multiply':
			result = multiply(value1, value2);
			break;
		default:
			console.log('nani?! o.O');
	}

	document.getElementById('displayLabel').innerHTML = 'Result is: ' + result;
}