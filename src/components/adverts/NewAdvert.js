// Imports goes here
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Page from "../layout/Page";
import { setAd } from "../auth/service";

const NewAdvert = (props) => {
  const [name, setName] = useState("");
  const [sale, setSale] = useState("");
  let [tags, setTags] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleChangeUsername = (event) => setName(event.target.value);
  const handleChangeSale = (event) => setSale(event.target.value);
  const handleChangeTags = (event) => setTags(event.target.value);
  const handleChangePrice = (event) => setPrice(event.target.value);
  // const handleChangePhoto = (event) => setPhoto(event.target.files[0]);
  const handleChandgeDescription = (event) =>
    setDescription(event.target.value);
  const handleErrorClick = () => setError(null);

  const handleSubmitNewAdvert = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    await setAd(formData).then(
      function (response) {
        // console.log(location.pathname + "/" + response.id);
        // navigate("/adverts" + response.id);
        navigate("/adverts");
      },
      (error) => setError(error)
    );
  };

  return (
    <Page title="New Advert Page" {...props}>
      {/* <h2>New Advert Page</h2> */}
      <section>
        <form onSubmit={handleSubmitNewAdvert}>
          <br></br>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Write your name."
            onChange={handleChangeUsername}
            value={name}
          ></input>

          <label>User:</label>
          <input
            type="text"
            name="username"
            placeholder="Write your username."
            //onChange={handleChangeUser}
            //   value={user}
          ></input>

          <br></br>
          <label>Company:</label>
          <input
            type="text"
            name="company"
            placeholder="Developer company."
            //onChange=""
            //   value={company}
          ></input>

          <br></br>
          <br></br>
          <p>¿Is for buy or sale?</p>
          <label>
            Buy:
            <input
              type="radio"
              name="saleorbuy"
              value="buy"
              onChange={handleChangeSale}
            />
          </label>
          <label>
            Sale:
            <input
              type="radio"
              name="saleorbuy"
              value="sale"
              onChange={handleChangeSale}
            />
          </label>
          <br></br>
          <br></br>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            min="0"
            onChange={handleChangePrice}
            value={price}
          ></input>

          <br></br>
          <br></br>
          {/* <label>
            Upload your photo:
            <input
              type="file"
              name="photo"
              //onChange=""
              // value={photo}
            ></input>
          </label> */}
          <br></br>
          <br></br>
          <label>
            Choose your category:
            <select
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
              {/* <option>Choose a category</option> */}
              <option value="fantasy">Fantasy</option>
              <option value="rpg">RPG</option>
              <option value="shooter">Shooter</option>
              <option value="arcade">Arcade</option>
            </select>
          </label>
          <br></br>
          <br></br>

          <label>
            Descripción del producto:
            <textarea
              type="text"
              // onChange={handleChandgeDescription}
              // value={description}
            ></textarea>
          </label>
          <br></br>
          <br></br>
          {/* Para el select hay que asociar un estado*/}

          <button
            type="submit"
            className="loginForm-input"
            // disabled={!isEnabled()}
          >
            Crear anuncio
          </button>
        </form>
      </section>
    </Page>
  );
};

export default NewAdvert;
