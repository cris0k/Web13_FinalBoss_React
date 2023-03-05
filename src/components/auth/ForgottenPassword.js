import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { forgottenPasswords } from "../../store/actions/authActions";
import Swal from "sweetalert2";
import "../../style/form.css";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const submitForm = (credentials) => {
    const emailValidation = credentials.email;
    const regularExpres = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regularExpres.test(emailValidation)) {
      Swal.fire({
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAZlKeATVdPB_DjXuImGVfRxcpsvIRaFdO9Q&usqp=CAU",
        imageHeight: 250,
        imageWidth: 250,
        title: "UwUntuInfo",
        text: `Te vamos a enviar un email para el reinicio de tu contraseña`,
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
          dispatch(forgottenPasswords(credentials));
        }
      });
    } else {
      Swal.fire({
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRRtyJWw6aq5GcCnjPoa52G6vCfqXkCm0Ilw&usqp=CAU",
        imageHeight: 250,
        imageWidth: 250,
        title: "UwUntuInfo",
        text: `Lo siento, introduce un email valido.`,
        confirmButtonText: "Aceptar",
      });
    }
  };
  return (
      <form className="signin-up-form" onSubmit={handleSubmit(submitForm)}>
      <h1 className='form-title'>Password Reset </h1>
        <div className="form-group">
          <input
            type="text"
            placeholder="Email"
            className="form-input"
            {...register("email")}
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
