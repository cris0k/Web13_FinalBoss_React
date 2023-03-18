import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Error from "../Error";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userLogin } from "../../store/actions/authActions";
import { useTranslation } from "react-i18next";
import { profileData } from "../../store/actions/userActions";

import "../../style/form.css";

const LoginPage = ({ socket }) => {
  const { loading, token, error } = useSelector((state) => state.auth);
  const [t] = useTranslation("translation");
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userInfo?.name);
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(profileData());
      navigate("/");
    }
  }, [navigate, token,dispatch]);

  const submitForm = async(credentials) => {
    await dispatch(userLogin(credentials));
    
    await socket.emit('newUser', { userName, socketID: socket.id });
  };

  return (
    <form className="signin-up-form" onSubmit={handleSubmit(submitForm)}>
      <h1 className="form-title"> {t("Log In")} </h1>
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
          type="password"
          className="form-input"
          placeholder={t("Password")}
          {...register("password")}
          required
        />
      </div>
      <div>
        <span> {t("Remember?")}</span>
        <input type="checkbox" name="remember" {...register("remember")} />
      </div>
      <button type="submit" className="button-log" disabled={loading}>
        {t("Login")}
      </button>
      <NavLink className="nav-link" to="/forgotpassword">
        {" "}
        {t("ForgotPwd?")}
      </NavLink>
      {error && <Error>{error}</Error>}
      <div>
        <span>{t("Do not have an account?")}</span>
        <NavLink className="nav-link" to="/register">
          {t("Register here")}
        </NavLink>
      </div>
      <NavLink className="nav-link" to="/">
        Home Page
      </NavLink>
    </form>
  );
};

export default LoginPage;
