import Page from "../layout/Page";
import { useEffect } from "react";
import { fetchAllAdverts } from "../../store/slices/adverts";
import { useDispatch, useSelector } from "react-redux";

const EmptyList = () => {
  <div>
    <p>No existen resultados.</p>
  </div>;
};
const AdvertsPage = ({ ...props }) => {
  const { list: adverts } = useSelector((state) => state.adverts);
  const dispatch = useDispatch();

  console.log(adverts);

  useEffect(() => {
    dispatch(fetchAllAdverts());
  }, [dispatch]);

  return (
    <Page title="UWUNTU GAMES" {...props}>
      <div className="advertsPage">
        {adverts.results ? (
          <ul>
            {adverts.results.map((item) => (
              <li className="advertsPage-item" key={item._id}>
                <p>Producto: {item.name}</p>
                <p>
                  -Precio: {item.price}$ -Estado:
                  {item.sale ? "Se vende" : "Se compra"}
                </p>
                <p> - Categoria: {item.category.toString()} </p>
                <p>---------------------------</p>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </div>
    </Page>
  );
};

export default AdvertsPage;
