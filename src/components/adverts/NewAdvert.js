// Imports goes here
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Page from '../layout/Page';
import { setAd } from '../auth/service';
import { useForm } from 'react-hook-form';
import { newAdvertSlice } from '../../store/slices/newAdvert';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

import '../../style/form.css';

const NewAdvert = (props) => {
	const [t, i18n] = useTranslation('translation');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const [name, setName] = useState("");
	// const [sale, setSale] = useState("");
	// let [tags, setTags] = useState("");
	// const [price, setPrice] = useState("");
	// const [photo, setPhoto] = useState("");
	// const [description, setDescription] = useState("");

	//const [error, setError] = useState(null);
	// const location = useLocation();
	//const navigate = useNavigate();

	// const handleChangeUsername = (event) => setName(event.target.value);
	// const handleChangeSale = (event) => setSale(event.target.value);
	// const handleChangeTags = (event) => setTags(event.target.value);
	// const handleChangePrice = (event) => setPrice(event.target.value);
	// // const handleChangePhoto = (event) => setPhoto(event.target.files[0]);
	// const handleChangePhoto = (event) => setPhoto(event.target.value);
	// const handleChandgeDescription = (event) =>
	//   setDescription(event.target.value);
	// const handleErrorClick = () => setError(null);

	// const handleSubmitNewAdvert = async (event) => {
	//   event.preventDefault();
	//   const formData = new FormData(event.target);

	//   await setAd(formData).then(
	//     function (response) {
	//       // console.log(location.pathname + "/" + response.id);
	//       // navigate("/adverts" + response.id);
	//       navigate("/adverts");
	//     },
	//     (error) => setError(error)
	//   );
	// };

	const stateAdvertData = useSelector((state) => state.newAdvert);
	// console.log(stateAdvertData);

	const [formAdvert, setFormAdvert] = useState(stateAdvertData);

	const handleInputChange = (e) => {
		const category = document.querySelector('#category');
		// console.log(category.options.selectedIndex);
		// console.log(category);

		// for (let i = 0; i < category.options.length; i++) {
		// 	if (category.options.selectedIndex === i) {
		// 		setFormAdvert({
		// 			...formAdvert,
		// 			[e.target.name]: e.target.value,
		// 		});
		// 	}
		// }

		// setFormAdvert({
		// 	...formAdvert,
		// 	[e.target.name]: e.target.value,
		// });

		// console.log(formAdvert);
	};

	// Useform managing destructuring
	const { register, handleSubmit } = useForm();

	// Example using useform to collect all data. Fails when data was submited.
	// const onSubmit = (data) => {
	// 	console.log(data);
	// 	setAd(data);
	// };

	// It works with formData.
	const onSubmit = (data) => {
		const files = document.getElementById('photo');
		// console.log(files);
		const formData = new FormData();
		// formData.append('photo', data.photo[0].name);
		formData.append('category', data.category);
		formData.append('name', data.name);
		formData.append('price', data.price);
		formData.append('userOwner', data.userOwner);
		formData.append('company', data.company);
		formData.append('sale', data.sale);
		formData.append('PGI', data.PGI);
		formData.append('description', data.description);

		// formData.append('name', formAdvert.name);
		// formData.append('company', formAdvert.company);
		// formData.append('PGI', formAdvert.PGI);
		// formData.append('sale', formAdvert.sale);
		// formData.append('price', formAdvert.price);
		// formData.append('photo', formAdvert.photo[0].name);
		// formData.append('category', formAdvert.category);
		// formData.append('description', formAdvert.description);
		// console.log(register.name);
		for (let i = 0; i < files.files.length; i++) {
			formData.append('photo', files.files[i]);
		}

		// console.log(data);
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
						{...register('name', { required: true })}
						onChange={handleInputChange}></input>
					<br></br>
					<label>User:</label>

					<input
						type='text'
						placeholder='User name'
						{...register('userOwner', { required: true })}
						onChange={handleInputChange}></input>

					<br></br>
					<label>Company:</label>

					<input
						type='text'
						placeholder='Write your company name'
						{...register('company', { required: true })}
						onChange={handleInputChange}></input>

					<br></br>
					<br></br>
					<h3>¿Is for buy or sale?</h3>
					<label>Buy:</label>

					<input
						type='radio'
						value='buy'
						{...register('sale')}
						onChange={handleInputChange}></input>

					<label>Sale:</label>

					<input
						type='radio'
						value='sale'
						{...register('sale')}
						onChange={handleInputChange}></input>

					<br></br>
					<br></br>
					<br></br>
					<label>PEGI:</label>

					<select {...register('PGI')} onChange={handleInputChange}>
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
						{...register('price', { required: true })}
						onChange={handleInputChange}></input>

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
						onChange={handleInputChange}
						// multiple
					></input>

					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<label style={{ verticalAlign: 'top' }}>Choose your category:</label>
					{/* <select
              // Aquí, en el value, debería ir asociado a un estado, que cambiará según cambie el select.
              // value={tags}
              // onChange={function (event) {
              //   console.log(event.target.value);
              //   handleChangeTags();
              // }}
              // onChange=
              name="category"
              // defaultValue={{ label: "Choose a category", value: 0 }}
              multiple
            >
              //<option>Choose a category</option>
              <option value="fantasy">Fantasy</option>
              <option value="rpg">RPG</option>
              <option value="shooter">Shooter</option>
              <option value="arcade">Arcade</option>
            </select> */}

					<select
						{...register('category')}
						multiple
						onChange={handleInputChange}
						id='category'>
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
						onChange={handleInputChange}
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
