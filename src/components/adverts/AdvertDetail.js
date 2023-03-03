import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUniqueAdvert, deleteAdvert } from "../../store/slices/adverts";
import Page from "../layout/Page";
import i18n from "../../i18n";
import { useNavigate } from "react-router-dom";

import "../../style/advertDetail.css";

const AdvertDetail = (props) => {
  const { advertId } = useParams();
  const dispatch = useDispatch();
  const [deleteProdcut, setDeleteProdcut] = useState(false);
  const navigate = useNavigate();

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
              <img
                height="60%"
                width="40%"
                src={advert.photo}
                alt="imagen del producto"
              />
            ) : (
              "Imagen no disponible"
            )}{" "}
          </div>
          <p className="AdvertDetail-title">
            {i18n.t("Game")}: {advert.name}
          </p>
          <p className="AdvertDetail-price">
            - {i18n.t("Price")}: {advert.price}$
          </p>
          <p className="AdvertDetail-state">
            -{i18n.t("State")}:{advert.sale ? "Se vende" : "Se compra"}
          </p>
          <p className="AdvertDetail-user">
            -{i18n.t("UserProperty")}: {advert.userOwner}
          </p>
          <p className="AdvertDetail-PGI">
            {i18n.t("PGI")}: {advert.PGI}
          </p>
          {advert.category.length && (
            <p className="AdvertDetail-category">
              -{i18n.t("Category")}:{advert.category.toString()}
            </p>
          )}
          <p className="AdvertDetail-description">
            {i18n.t("Description")}: {advert.description}
          </p>
        </div>
      ) : (
        " Producto no encontrado"
      )}
      <button className="detailProduct-button" onClick={handleDeleteProduct}>
        {" "}
        {i18n.t("Delete")}
      </button>
      {deleteProdcut ? (
        <div>
          <h3>{i18n.t("Are you sure?")}</h3>
          <button type="submit" onClick={handleRemoveProdcut}>
            {i18n.t("Yes")}
          </button>
          <button onClick={removeAdvise}>{i18n.t("No")}</button>
        </div>
      ) : (
        ""
      )}
    </Page>
  );
};

export default AdvertDetail;
