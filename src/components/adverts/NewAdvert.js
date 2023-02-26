// Imports goes here
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Page from "../layout/Page";
import { setAd } from "../auth/service";
import { useForm } from "react-hook-form";
import async from "async";

const NewAdvert = (props) => {
  // const [name, setName] = useState("");
  // const [sale, setSale] = useState("");
  // let [tags, setTags] = useState("");
  // const [price, setPrice] = useState("");
  // const [photo, setPhoto] = useState("");
  // const [description, setDescription] = useState("");

  const [error, setError] = useState(null);
  // const location = useLocation();
  const navigate = useNavigate();

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

  // Use form managing destructuring
  const { register, handleSubmit } = useForm();
  //const onSubmit = (data) => console.log(data);

  const onSubmit = (data) => {
    const files = document.getElementById("photo");
    // console.log(files);
    const formData = new FormData();
    // formData.append("photo", data.photo);
    formData.append("photo", data.photo[0].name);
    // formData.append("category", JSON.stringify(data.category));
    formData.append("category", data.category.types);
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("user", data.user);
    formData.append("company", data.company);
    formData.append("buyorsale", data.buyorsale);
    // formData.append("buyorsale", JSON.stringify(data.buyorsale));
    // const jsond = JSON.stringify(data);

    // Tutorial Multer
    // console.log(files.files.length + " es la longitud del array");
    for (let i = 0; i < files.files.length; i++) {
      // console.log(files.files[i]);
      formData.append("files", files.files[i]);
    }
    // fetch("http://localhost:3001/api/upload_files", {
    //   method: "POST",
    //   body: formData,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
    // console.log(formData.get("files"));
    // console.log(data);
    setAd(formData);
  };

  // const onSubmit = (data) =>
  //   setAd(data).then(
  //     function (response) {
  //       navigate("/adverts");
  //     },
  //     (error) => setError(error)
  //   );

  return (
    <Page title="New Advert Page" {...props}>
      {/* <h2>New Advert Page</h2> */}
      <section>
        <form
          // encType="multipart/form-data"
          // method="post"
          onSubmit={handleSubmit(onSubmit)}
        >
          <br></br>
          <label>Name:</label>
          {/* <input
            type="text"
            name="name"
            placeholder="Write your name."
            onChange={handleChangeUsername}
            value={name}
          ></input> */}
          <input
            id="name"
            type="text"
            {...register("name", { required: true })}
          ></input>

          <label>User:</label>
          {/* <input
            type="text"
            name="username"
            placeholder="Write your username."
            //onChange={handleChangeUser}
            //   value={user}
          ></input> */}
          <input type="text" {...register("user", { required: true })}></input>

          <br></br>
          <label>Company:</label>
          {/* <input
            type="text"
            name="company"
            placeholder="Developer company."
            //onChange=""
            //   value={company}
          ></input> */}
          <input
            type="text"
            {...register("company", { required: true })}
          ></input>

          <br></br>
          <br></br>
          <p>¿Is for buy or sale?</p>
          <label>Buy:</label>
          {/* <input
              type="radio"
              name="saleorbuy"
              value="buy"
              onChange={handleChangeSale}
            /> */}
          <input type="radio" value="buy" {...register("buyorsale")}></input>

          <label>Sale:</label>
          {/* <input
              type="radio"
              name="saleorbuy"
              value="sale"
              onChange={handleChangeSale}
            /> */}
          <input type="radio" value="sale" {...register("buyorsale")}></input>

          <br></br>
          <br></br>
          <label>Price:</label>
          {/* <input
            type="number"
            name="price"
            min="0"
            onChange={handleChangePrice}
            value={price}
          ></input> */}
          <input
            type="number"
            {...register("price", { required: true })}
          ></input>

          <br></br>
          <br></br>
          <label>Upload your photo:</label>
          {/* <input
            type="file"
            name="photo"
            onChange={handleChangePhoto}
            value={photo}
          ></input> */}
          <input
            id="photo"
            name="photo"
            type="file"
            // accept="image/png, image/jpeg"
            {...register("photo")}
            multiple
          ></input>

          <br></br>
          <br></br>
          <label>Choose your category:</label>
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

          <select {...register("category.types")} multiple>
            <option value="fantasy">Fantasy</option>
            <option value="rpg">RPG</option>
            <option value="shooter">Shooter</option>
            <option value="arcade">Arcade</option>
          </select>

          <br></br>
          <br></br>

          <label>Descripción del producto:</label>
          {/* <textarea
            type="text"
            name="description"
            onChange={handleChandgeDescription}
            value={description}
          ></textarea> */}
          <textarea {...register("description")}></textarea>

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
