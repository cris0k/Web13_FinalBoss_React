import Page from "../layout/Page";
import { useEffect } from "react";
import { fetchAllAdverts } from "../../store/slices/adverts";
import { useDispatch, useSelector } from "react-redux";
import i18n from "../../i18n";

const EmptyList = () => {

  return (
    <div>
     <p>{i18n.t("No products")}</p>
    </div>
  )
  
};
const AdvertsPage = ( props ) => {
  const adverts = useSelector((state) => state.adverts.list);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllAdverts());
  }, [dispatch]);

  return (
    <Page title="UWUNTU GAMES" {...props}>
      <div className="advertsPage">
        {adverts.length > 0 ? (
          <ul>
            {adverts.map((item) => (
              <li className="advertsPage-item" key={item._id}>
                <p>
                  {i18n.t("Product")}: {item.name}
                </p>
                <p>
                  -{i18n.t("Price")}: {item.price}$ -{i18n.t("State")}:
                  {item.sale ? "Se vende" : "Se compra"}
                </p>
                <p>
                  {" "}
                  - {i18n.t("Category")}: {item.category.toString()}{" "}
                </p>
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