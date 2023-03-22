import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getUniqueAdvert, deleteAdvert } from "../../store/slices/adverts";
import Page from "../layout/Page";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialShare from "../layout/SocialShare";
import "../../style/advertDetail.css";
import FavButton from "../common/FavButton";
import storage from "../../utils/storage";
import { profileData } from "../../store/actions/userActions";
import { contactEmail } from "../../store/actions/authActions";

const AdvertDetail = (props) => {
  const { advertId } = useParams();
  const [t] = useTranslation("translation");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const url = process.env.REACT_APP_URL_PHOTO;
  const urlProd = process.env.REACT_APP_API_BASE_URL;
  const [userName, adverts] = useSelector((state) => [
    state.user?.userInfo?.name,
    state.adverts.list,
  ]);

  const shareUrl = `${urlProd}${location.pathname}`;

  //Obtener el anuncio

  const [advert] = adverts;
  const [loggedInUser, setLoggedInUser] = useState({});
  const advertproperty = advert?.userOwner;

  const token = storage.get("auth");

  //Traer al usuario
  useEffect(() => {
    if (token) {
      dispatch(profileData()).then((response) => {
        setLoggedInUser(response.payload);
      });
    }
  }, [dispatch, token]);

  //Traer el anuncio
  useEffect(() => {
    dispatch(getUniqueAdvert(advertId));
  }, [dispatch, advertId]);

  //Eliminar producto
  const handleRemoveProdcut = () => {
    try {
      Swal.fire({
        title: t("Delete"),
        imageUrl: "/img/men-in-black.gif",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "men-in-black-delete",
        showCancelButton: true,
        cancelButtonText: t("Cancel"),
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: t("Yes"),
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteAdvert(advert));
          navigate("/");
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleSendData = async () => {
    //email del que esta logeado
    const userEmail = loggedInUser.email;
    // objeto con el usuario actual logeado y los detalles del anuncio
    const data = {
      userEmail: userEmail,
      advert: advert,
    };
    const result = await dispatch(contactEmail(data));
    if (result.payload === "success") {
      Swal.fire({
        imageUrl: "/img/good-luck-congratulations.gif",
        imageHeight: 250,
        imageWidth: 250,
        title: "UwUntuInfo",
        text: `Email enviado con exito`,
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <Page title={t("Game's Details")} {...props}>
      {advert !== undefined ? (
        <div className="AdvertDetail-card">
          <div className="AdvertDetail-photo">
            {advert.photo ? (
              <img src={url + advert.photo} alt="imagen del producto" />
            ) : (
              <img src={"img/image-coming-soon.jpg"} alt="coming-soon" />
            )}
          </div>
          <div className="AdvertDetail-general-info">
            <p className="AdvertDetail-title">
              {t("Game")}: {advert.name}
            </p>
            <p className="AdvertDetail-price">
              {t("Price")}: {advert.price}$
            </p>
            <p className="AdvertDetail-state">
              {t("State")}: {advert.sale === "sale" ? "Se vende" : "Se compra"}
            </p>
            <p className="AdvertDetail-user">
              {t("UserProperty")}: {advert.userOwner}
            </p>
            <p className="AdvertDetail-PGI">
              {t("PGI")}: {advert.PGI}
            </p>
            {advert.category.length && (
              <p className="AdvertDetail-category">
                {t("Category")}: {advert.category.toString()}
              </p>
            )}
          </div>
          <p className="AdvertDetail-description">
            {t("Description")}: {advert.description}
          </p>
          <div className="edit-details">
            <span>Share this game</span>
            <SocialShare
              className="AdvertDetail-SocialShare"
              shareUrl={shareUrl}
            />
            <FavButton />
            <button onClick={handleSendData}>Contactar</button>
          </div>
        </div>
      ) : (
        " Producto no encontrado"
      )}
      {advertproperty === userName ? (
        <button className="detailProduct-button" onClick={handleRemoveProdcut}>
          {" "}
          {t("Delete")}
        </button>
      ) : (
        " "
      )}
    </Page>
  );
};

export default AdvertDetail;
