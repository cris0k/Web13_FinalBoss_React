import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getUniqueAdvert, deleteAdvert } from "../../store/slices/adverts";
import Page from "../layout/Page";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

import "../../style/advertDetail.css";

const AdvertDetail = (props) => {
  const { advertId } = useParams();
  const [t, i18n] = useTranslation("translation");
  const dispatch = useDispatch();
  const [deleteProdcut, setDeleteProdcut] = useState(false);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_URL_PHOTO;
  const location = useLocation();
  // const shareUrl = `http://localhost:3000${location.pathname}`;
  const shareUrl = "www.marca.com";
  //Obtener el anuncio
  const { list: adverts } = useSelector((state) => state.adverts);
  const [advert] = adverts;
  console.log(advert);

  useEffect(() => {
    dispatch(getUniqueAdvert(advertId));
  }, [dispatch, advertId]);

  //Eliminar producto
  const handleDeleteProduct = () => setDeleteProdcut(true);

  const removeAdvise = () => setDeleteProdcut(false);

  const handleRemoveProdcut = () => {
    dispatch(deleteAdvert(advert));
    navigate("/");
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
          <p className="AdvertDetail-description">
            {t("Description")}: {advert.description}
          </p>
          <div className="social-sharing-card">
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={50} />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl}>
              <TwitterIcon size={50} />
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl}>
              <LinkedinIcon size={50} />
            </LinkedinShareButton>
          </div>
        </div>
      ) : (
        " Producto no encontrado"
      )}
      <button className="detailProduct-button" onClick={handleDeleteProduct}>
        {" "}
        {t("Delete")}
      </button>
      {deleteProdcut ? (
        <div>
          <h3>{t("Are you sure?")}</h3>
          <button type="submit" onClick={handleRemoveProdcut}>
            {t("Yes")}
          </button>
          <button onClick={removeAdvise}>{t("No")}</button>
        </div>
      ) : (
        ""
      )}
    </Page>
  );
};

export default AdvertDetail;
