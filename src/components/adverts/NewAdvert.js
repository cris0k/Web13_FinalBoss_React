// Imports goes here
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Page from '../layout/Page';
import { setAd } from '../auth/service';
import { useForm } from 'react-hook-form';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import '../../style/form.css';

const NewAdvert = (props) => {
	const [t, i18n] = useTranslation('translation');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		const files = document.getElementById('photo');
		// console.log(files);
		const formData = new FormData();
		formData.append('photo', data.photo[0].name);
		formData.append('category', data.category.types);
		formData.append('name', data.name);
		formData.append('price', data.price);
		formData.append('userOwner', data.userOwner);
		formData.append('company', data.company);
		formData.append('sale', data.sale);
		formData.append('PGI', data.pgi);
		formData.append('description', data.description)

		for (let i = 0; i < files.files.length; i++) {
			formData.append('photo', files.files[i]);
		}

		console.log(data);
		setAd(formData);
	};

	return (
		<Page {...props}>
			<h2>Create a new Advert</h2>
			<section>
				<form onSubmit={handleSubmit(onSubmit)}>
					<br></br>
					<label>Name:</label>

					<input
						id='name'
						type='text'
						placeholder='Write your name'
						{...register('name', { required: true })}></input>
					<br></br>
					<label>User:</label>

					<input
						type='text'
						placeholder='User name'
						{...register('userOwner', { required: true })}></input>

					<br></br>
					<label>Company:</label>

					<input
						type='text'
						placeholder='Write your company name'
						{...register('company', { required: true })}></input>

					<br></br>
					<br></br>
					<h3>¿Is for buy or sale?</h3>
					<label>Buy:</label>

					<input type='radio' value='buy' {...register('sale')}></input>

					<label>Sale:</label>

					<input type='radio' value='sale' {...register('sale')}></input>

					<br></br>
					<br></br>
					<br></br>
					<label>PEGI:</label>

					<select {...register('pgi')}>
						<option value='3'>3</option>
						<option value='7'>7</option>
						<option value='12'>12</option>
						<option value='16'>16</option>
						<option value='18'>18</option>
					</select>
					<br></br>
					<br></br>
					<label>Price:</label>

					<input
						type='number'
						step='0.01'
						{...register('price', { required: true })}></input>

					<br></br>
					<br></br>
					<label>
						<h3>Upload your photo:</h3>
					</label>

					<input
						id='photo'
						name='photo'
						type='file'
						// accept="image/png, image/jpeg"
						{...register('photo')}
						// multiple
					></input>

					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<label style={{ verticalAlign: 'top' }}>Choose your category:</label>
		
					<select {...register('category.types')} multiple>
						<option value='fantasy'>Fantasy</option>
						<option value='rpg'>RPG</option>
						<option value='shooter'>Shooter</option>
						<option value='arcade'>Arcade</option>
					</select>

					<br></br>
					<br></br>
					<br></br>
					<br></br>

					<label>Description:</label>

					<br></br>
					<textarea
						{...register('description')}
						style={{
							maxWidth: '100%',
							width: '475px',
							height: '150px',
						}}></textarea>

					<br></br>
					<br></br>
					{/* Para el select hay que asociar un estado*/}

					<button
						type='submit'
						className='button-log'
						// disabled={!isEnabled()}
					>
						Create advert
					</button>
				</form>
			</section>
		</Page>
	);
};

export default NewAdvert;
