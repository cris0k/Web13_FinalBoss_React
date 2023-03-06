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

	// Useform managing destructuring
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
