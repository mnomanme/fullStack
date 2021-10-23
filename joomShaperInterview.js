var x = 100;
console.log(x);

const str = 'hello';
const arr = [...str];
console.log(arr);

var fullMoon = true;
var species = 'human';

if (fullMoon) {
	var species = 'werewolf';
	console.log(species);
}
console.log(species);

function multiply(n1, n2, ...others) {
	console.log(n1, n2, others);
}
multiply(2, 3, 5, 6);

class MyClass extends (String, Array) {
	construct() {}
}
const a = new MyClass();
console.log(a instanceof Array);

function run() {
	const promise = new Promise((resolve) => {
		resolve('promise');
	});

	setTimeout(() => console.log('setTimeOut'));

	promise.then((res) => console.log(res));
	console.log('log');
}
run();

var x = 5(function () {
	console.log(x);
})();

function Counter() {
	const [count, setCount] = useState(0);
	const updateCounttoFive = () => {
		let i = 0;
		while (i < 5) {
			setCount(count + 1);
			i++;
		}
	};

	return <button onClick={updateCounttoFive}> {count}</button>;
}
export default Counter;

const circle = {
	radius: 10,
	area() {
		return Math.round(Math.PI * this.radius * this.radius);
	},
	perimeter: () => Math.round(2 * Math.PI * this.radius),
};
console.log(circle.area(), circle.perimeter());

function getDays(isLeapYear) {
	switch (isLeapYear) {
		case true:
			const days = 29;
			return days;
		case false:
			const days = 28;
			return days;
		default:
			return undefined;
	}
}

console.log(getDays(true));
