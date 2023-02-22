import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUniqueAdvert } from "../../store/slices/adverts";
import Page from "../layout/Page";

const AdvertDetail = (props) => {
  const { advertId } = useParams();
  const dispatch = useDispatch();

  //Obtener el anuncio
  const { list: advert } = useSelector((state) => state.adverts);

  console.log(advert);

  useEffect(() => {
    dispatch(getUniqueAdvert(advertId));
  }, [dispatch, advertId]);

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
          {advert.category ? (
            <p>
              -Categorias:
              {advert.category.toString()}
            </p>
          ) : (
            <p></p>
          )}
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
