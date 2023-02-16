import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUniqueAdvert } from "../../store/slices/adverts";
import Page from "../layout/Page";

const AdvertDetail = (props) => {
  //coger el id ddel anuncio que viene en la URL
  const { advertId } = useParams();
  const dispatch = useDispatch();

  //Obtener el anuncio
  const advert = useEffect(() => {
    dispatch(getUniqueAdvert(advertId));
  }, []);

  return (
    <Page title="Detail product" {...props}>
      {advert !== undefined ? (
        <div>
          <p>Juego: {advert.name}</p>
          <p>
            - Precio: {advert.price}$ -Estado:
            {advert.sale ? "Se vende" : "Se compra"}
          </p>
          <p>PGI: {advert.PGI}</p>
          <p>
            -Categorias:
            {advert.tags.toString()}
          </p>
          <div>
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
          <p>Descripción: {advert.description}</p>
        </div>
      ) : (
        " Producto no encontrado"
      )}
    </Page>
  );
};

export default AdvertDetail;
