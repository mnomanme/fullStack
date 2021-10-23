const userName = document.getElementById('userId');
const user = document.getElementById('user');
const addUser = document.getElementById('addUser');

fetch('http://localhost:5000/users/0')
	.then((res) => res.json())
	.then((data) => {
		userName.innerHTML = `<li>${data.name}</li>`;
		console.log(data);
	});

addUser.addEventListener('click', () => {
	const name = user.value;
	const userName = { name };
	// console.log(name, userName);
	fetch('http://localhost:5000/addUser', {
		method: 'POST',
		body: JSON.stringify(userName),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	})
		.then((res) => res.json())
		.then((data) => {
			updateUser(data);
			console.log(data, 'POST done');
		});
});

const updateUser = (user) => {
	userName.innerText = user.name;
};
