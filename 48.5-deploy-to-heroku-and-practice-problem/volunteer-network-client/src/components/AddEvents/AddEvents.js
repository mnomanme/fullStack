import React from 'react';
import { useForm } from 'react-hook-form';

export const AddEvents = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => console.log(data);

	console.log(watch('example')); // watch input value by passing the name of it

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input defaultValue="test" {...register('example')} />
			<br />
			<input {...register('exampleRequired', { required: true })} />
			{errors.exampleRequired && <span>This field is required</span>}
			<br />
			<input type="submit" />
		</form>
	);
};
