import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import client from "../../api/client";
import {
  forgottenPassword,
  login,
  changePassword,
  emailContact,
} from "../../components/auth/service";

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ name, password, remember }, { rejectWithValue }) => {
    try {
      const token = await login({ name, password, remember });

      return token;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await client.post(`/api/register`, { name, email, password }, config);
      const remember = true;
      const token = await login({ name, password, remember });
      return token;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const contactEmail = createAsyncThunk(
  "user/conctact",
  async (data) => {
    try {
      const token = await emailContact(data);
      return token;
    } catch (error) {
      Swal.fire({
        imageUrl: "/img/super-sad-cat-sits-in-corner.gif",
        imageHeight: 250,
        imageWidth: 250,
        title: "UwUntuInfo",
        text: `Algo ha salido mal, inténtalo mas tarde`,
        confirmButtonText: "Continuar",
      });
      return "fail"
    }
  }
);



export const forgottenPasswords = createAsyncThunk(
  "user/forgotPassWord",
  async (email, { rejectWithValue }) => {
    try {
      const token = await forgottenPassword(email);

      return token;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/forgotPassWord",
  async (credentials) => {
    try {
      const success = await changePassword(credentials);
      Swal.fire({
        imageUrl: "https://imgflip.com/s/meme/Buddy-Christ.jpg",
        imageHeight: 250,
        imageWidth: 250,
        title: "UwUntuInfo",
        text: `Contraseña cambiada con exito`,
        confirmButtonText: "Aceptar",
      });
      return success;
    } catch (error) {
      Swal.fire({
        imageUrl: "https://media.tenor.com/uPzeWnRQTQAAAAAM/shocked-seal.gif",
        imageHeight: 250,
        imageWidth: 250,
        title: "UwUntuInfo",
        text: `Algo ha salido mal, inténtalo mas tarde`,
        confirmButtonText: "Continuar",
      });
      return "fail";
    }
  }
);
