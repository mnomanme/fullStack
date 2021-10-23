import React, { useRef } from 'react';

export const AddUser = () => {
	const nameRef = useRef();
	const emailRef = useRef();

	const handleAddUser = (e) => {
		const name = nameRef.current.value;
		const email = emailRef.current.value;

		const newUser = { name, email };
		fetch('https://localhost:2000/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newUser),
		});

		e.preventDefault();
	};

	return (
		<>
			<form onSubmit={handleAddUser} className="w-50">
				<div className="form-group">
					<label>Name</label>
					<input type="text" name="name" ref={nameRef} className="form-control" placeholder="Enter Name" />
				</div>
				<div className="form-group">
					<label>Email address</label>
					<input type="email" name="email" ref={emailRef} className="form-control" placeholder="Enter email" />
				</div>
				<div className="form-group">
					<input type="submit" value="Submit" className="form-control btn btn-success" />
				</div>
			</form>
		</>
	);
};
