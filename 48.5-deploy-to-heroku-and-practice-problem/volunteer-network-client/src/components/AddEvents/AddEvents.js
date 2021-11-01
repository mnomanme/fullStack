import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export const AddEvents = () => {
	const [imgUrl, setImgUrl] = useState(null);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		const eventData = {
			name: data.name,
			imageUrl: imgUrl,
		};
		const url = `http://localhost:5000/addEvent`;
		console.log(eventData);
		fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(eventData),
		}).then((res) => {
			console.log('server site response', res);
		});
	};

	const handleImageUpload = (e) => {
		// console.log(e.target.files[0]);
		const imgData = new FormData();
		imgData.set('key', '6bc6ba0d735eda3fbf193407b965ff2b');
		imgData.append('image', e.target.files[0]);

		axios
			.post('https://api.imgbb.com/1/upload', imgData)
			.then((res) => {
				console.log(res.data.data.display_url);
				setImgUrl(res.data.data.display_url);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	console.log(watch('example')); // watch input value by passing the name of it

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input name="name" defaultValue="New Event" {...register('example')} />
			<br />
			<input name="File" type="file" onChange={handleImageUpload} />
			<br />
			<input type="submit" />
		</form>
	);
};
