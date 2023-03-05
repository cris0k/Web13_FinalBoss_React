import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { resetPassword } from "../../store/actions/authActions";
import "../../style/form.css";


const ForgetPassword = () => {
  const query = new URLSearchParams(useLocation().search);
  const email = query.get("email");
  const token = query.get("token");
  const navigate = useNavigate();
  

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  
  
  const submitForm = async(credentials) => {
    if (credentials.password !== credentials.confirmPassword) {
      Swal.fire({
        imageUrl:
          "https://woobsing.com/wp-content/uploads/2015/12/115074-750x465.jpg",
        imageHeight: 250,
        imageWidth: 250,
        title: "UwUntuInfo",
        text: `Las contraseñas deben coincidir`,
        confirmButtonText: "Continuar",
      });
    } else {
        const passR = {
          password: credentials.password,
          email: email,
        };
         const result = await dispatch(resetPassword(passR));
        if (result.payload === "success"){
        navigate("/login")
        }
    }
  };
  return (
      <form className="signin-up-form" onSubmit={handleSubmit(submitForm)}>
      <h1 className='form-title'>Password Reset </h1>
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
        <button type="submit" className="button-log" disabled={loading}>
          Submit
        </button>
      </form>
  );
};

export default ForgetPassword;
