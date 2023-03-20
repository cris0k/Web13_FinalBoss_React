import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Page from "../layout/Page";
import { setAd } from "../auth/service";
import { useForm } from "react-hook-form";
import { newAdvertSlice } from "../../store/slices/newAdvert";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

import "../../style/form.css";

const NewAdvert = () => {
  const [t] = useTranslation("translation");
  const navigate = useNavigate();
  const stateAdvertData = useSelector((state) => state.newAdvert);

  const [formAdvert, setFormAdvert] = useState(stateAdvertData);

  // Useform managing destructuring
  const { register, handleSubmit } = useForm();

  // Using useform to collect all data.
  const onSubmit = (data) => {
    console.log(data);
    setAd(data);
  };

  return (
    <form className="signin-up-form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="form-title">{t("Create a new Advert")}</h1>
      <div>
        <input
          id="name"
          type="text"
          placeholder={t("Name")}
          {...register("name", { required: true })}
        ></input>
      </div>
      <div>
        <input
          type="text"
          placeholder={t("Company")}
          {...register("company", { required: true })}
        ></input>
      </div>
      <div>
        <label>{t("Buy: ")}</label>

        <input type="radio" value="buy" {...register("sale")}></input>
      </div>
      <div>
        <label>{t("Sale: ")}</label>

        <input type="radio" value="sale" {...register("sale")}></input>
      </div>
      <div>
        <label>{t("PEGI: ")}</label>

        <select {...register("PGI", { required: true })}>
          <option></option>
          <option value="3">3</option>
          <option value="7">7</option>
          <option value="12">12</option>
          <option value="16">16</option>
          <option value="18">18</option>
        </select>
      </div>
      <div>
        <input
          placeholder={t("Price")}
          type="number"
          step="0.01"
          {...register("price", { required: true })}
        ></input>
      </div>
      <div>
        <label>Upload your photo:</label>
        <input id="photo" name="photo" type="file" {...register("photo")} />
      </div>
      <div>
        <label>{t("Choose your category: ")}</label>
      </div>
      <div>
        <select {...register("category")} multiple>
          <option value="fantasy">Fantasy</option>
          <option value="rpg">RPG</option>
          <option value="shooter">Shooter</option>
          <option value="arcade">Arcade</option>
        </select>
      </div>
      <div>
        <textarea
          placeholder={t("Description")}
          {...register("description")}
          style={{
            maxWidth: "100%",
            width: "475px",
            height: "150px",
          }}
        ></textarea>
      </div>
      <button type="submit" className="button-log">
        {t("Create advert")}
      </button>
    </form>
  );
};

export default NewAdvert;
