import { useEffect } from "react";
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

const AdvertDetail = (props) => {
  const { advertId } = useParams();
  const [t] = useTranslation("translation");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = process.env.REACT_APP_URL_PHOTO;
  const location = useLocation();
  // const shareUrl = `http://localhost:3000${location.pathname}`;
  const shareUrl = "https://youtu.be/m9QQKzApkXY";
  //Obtener el anuncio
  const { list: adverts } = useSelector((state) => state.adverts);
  const [advert] = adverts;
  console.log(advert);

  useEffect(() => {
    dispatch(getUniqueAdvert(advertId));
  }, [dispatch, advertId]);

  //Eliminar producto
  // const handleDeleteProduct = () => setDeleteProdcut(true);

  // const removeAdvise = () => setDeleteProdcut(false);

  // const handleRemoveProdcut = () => {
  //   dispatch(deleteAdvert(advert));
  //   navigate("/");
  // };
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
      console.log(error);
    }
  };

  return (
    <Page title="Detail product" {...props}>
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
              {t("State")}:{advert.sale ? "Se vende" : "Se compra"}
            </p>
            <p className="AdvertDetail-user">
              {t("UserProperty")}: {advert.userOwner}
            </p>
            <p className="AdvertDetail-PGI">
              {t("PGI")}: {advert.PGI}
            </p>
            {advert.category.length && (
              <p className="AdvertDetail-category">
                {t("Category")}:{advert.category.toString()}
              </p>
            )}
          </div>
          <p className="AdvertDetail-description">
            {t("Description")}: {advert.description}
          </p>
          <div>
            <SocialShare
              className="AdvertDetail-SocialShare"
              shareUrl={shareUrl}
            />
            <FavButton />
          </div>
        </div>
      ) : (
        " Producto no encontrado"
      )}
      <button className="detailProduct-button" onClick={handleRemoveProdcut}>
        {" "}
        {t("Delete")}
      </button>
    </Page>
  );
};

export default AdvertDetail;
