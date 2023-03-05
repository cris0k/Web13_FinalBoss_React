import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../store/actions/authActions";
import Error from "../Error";

const RegisterPage = () => {
  const [customError, setCustomError] = useState(null);

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
      <h1 className="form-title"> Sign up </h1>
      <div className="form-group">
        <input
          type="text"
          className="form-input"
          placeholder="Name"
          {...register("name")}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          className="form-input"
          placeholder="Email"
          {...register("email")}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-input"
          placeholder="Password"
          {...register("password")}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-input"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
          required
        />
      </div>
      {error && <Error>{error}</Error>}
      {customError && <Error>{customError}</Error>}
      <button type="submit" className="button" disabled={loading}>
        {loading ? "Loading..." : "Register"}
      </button>
    </form>
  );
};
export default RegisterPage;
