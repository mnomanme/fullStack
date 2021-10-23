import React, { useRef } from 'react';

export const AddUser = () => {
	const nameRef = useRef();
	const emailRef = useRef();

	const handleAddUser = (e) => {
		const name = nameRef.current.value;
		const email = emailRef.current.value;

		const newUser = { name, email };

		fetch('http://localhost:5000/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newUser),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.insertedId) {
					alert('Successfully added user');
					e.target.reset();
				}
			});

		e.preventDefault();
	};

	return (
		<section className="d-flex  justify-content-center my-5">
			<section className="row w-25">
				<form onSubmit={handleAddUser}>
					<div className="form-group">
						<label>Name</label>
						<input type="text" name="name" ref={nameRef} className="form-control" placeholder="Enter Name" />
					</div>
					<div className="form-group">
						<label>Email address</label>
						<input type="email" name="email" ref={emailRef} className="form-control" placeholder="Enter email" />
					</div>
					<div className="form-group">
						<input type="submit" value="Add User" className="form-control btn btn-success" />
					</div>
				</form>
			</section>
		</section>
	);
};
