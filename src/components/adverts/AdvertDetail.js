import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUniqueAdvert } from "../../store/slices/adverts";
import Page from "../layout/Page";
import "../../style/advertDetail.css";

const AdvertDetail = (props) => {
  const { advertId } = useParams();
  const dispatch = useDispatch();

  //Obtener el anuncio
  const { list: adverts } = useSelector((state) => state.adverts);
  const [advert] = adverts;
  console.log(advert);

  useEffect(() => {
    dispatch(getUniqueAdvert(advertId));
  }, [dispatch, advertId]);

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
          <p className="AdvertDetail-title">Juego: {advert.name}</p>
          <p className="AdvertDetail-price">- Precio: {advert.price}$</p>
          <p className="AdvertDetail-state">
            -Estado:
            {advert.sale ? "Se vende" : "Se compra"}
          </p>
          <p className="AdvertDetail-user">-Propietario: {advert.userOwner}</p>
          <p className="AdvertDetail-PGI">PGI: {advert.PGI}</p>
          {advert.category.length && (
            <p className="AdvertDetail-category">
              -Categorias:
              {advert.category.toString()}
            </p>
          )}
          <p className="AdvertDetail-description">
            Descripción: {advert.description}
          </p>
        </div>
      ) : (
        " Producto no encontrado"
      )}
    </Page>
  );
};

export default AdvertDetail;
