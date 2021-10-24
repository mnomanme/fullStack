import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export const AddService = () => {
	const { register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		console.log(data);

		axios.post();
	};

	return (
		<section className="d-flex  justify-content-center my-5">
			<section className="row w-25">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="form-group ">
						<input {...register('name', { required: true, maxLength: 20 })} className="form-control " placeholder="name" />
					</div>
					<div className="form-group">
						<input {...register('description')} className="form-control" placeholder="description" />
					</div>
					<div className="form-group">
						<input type="number" {...register('price')} className="form-control" placeholder="price" />
					</div>
					<div className="form-group">
						<input {...register('img')} className="form-control" placeholder="img url" />
					</div>
					<div className="form-group">
						<input type="submit" value="Submit" className="form-control btn btn-success" />
					</div>
				</form>
			</section>
		</section>
	);
};
