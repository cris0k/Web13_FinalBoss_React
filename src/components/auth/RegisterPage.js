import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { registerUser } from "../../store/actions/authActions";
import Error from "../Error";

const RegisterPage = () => {
  const [customError, setCustomError] = useState(null);
  const [t, i18n] = useTranslation("translation");

  const { loading, error, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  const submitForm = (data) => {
    if (data.password !== data.confirmPassword) {
      setCustomError("Password mismatch");
      return;
    }
    data.email = data.email.toLowerCase();

    dispatch(registerUser(data));
  };
  return (
    <form onSubmit={handleSubmit(submitForm)} className="signin-up-form">

      <h1 className="form-title"> {t("Sign up")} </h1>

      <div className="form-group">
        <input
          type="text"
          className="form-input"
          placeholder={t("Name")}
          {...register("name")}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          className="form-input"
          placeholder={t("Email")}
          {...register("email")}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-input"
          placeholder={t("Password")}
          {...register("password")}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-input"
          placeholder={t("Confirm password")}
          {...register("confirmPassword")}
          required
        />
      </div>
      {error && <Error>{error}</Error>}
      {customError && <Error>{customError}</Error>}
      <button type="submit" className="button" disabled={loading}>
        {loading ? "Loading..." : "Register"}
      </button>
      <NavLink className="nav-link" to="/">Home Page</NavLink>
    </form>
  );
};

export default RegisterPage;
