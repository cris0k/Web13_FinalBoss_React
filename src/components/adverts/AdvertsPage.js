import Page from "../layout/Page";
import { useEffect } from "react";
import { fetchAllAdverts } from "../../store/slices/adverts";
import { useDispatch, useSelector } from "react-redux";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../../style/advertsPage.css";

const EmptyList = () => {
  return (
    <div>
      <p>{i18n.t("No products")}</p>
    </div>
  );
};
const AdvertsPage = (props) => {
  const adverts = useSelector((state) => state.adverts.list);
  const [t] = useTranslation("translation");
  const dispatch = useDispatch();
  const url = process.env.REACT_APP_URL_PHOTO;

  useEffect(() => {
    dispatch(fetchAllAdverts());
  }, [dispatch]);

  return (
    <Page {...props}>
      <div className="advertsPage">
        {adverts.length > 0 ? (
          <ul className="advertsPage-list">
            {adverts.map((item) => (
              <li className="advertsPage-item" key={item._id}>
                <Link className="linkDetail" to={`/${item._id}`}>
                  <div className="AdvertDetail-photo">
                    {item.photo ? (
                      <img src={url + item.photo} alt="imagen del producto" />
                    ) : (
                      <img
                        src={"img/image-coming-soon.jpg"}
                        alt="coming-soon"
                      />
                    )}
                  </div>
                  <p>{item.name}</p>
                  <p>
                    {t("Price")}: {item.price}$
                  </p>
                  <p>
                    {t("State")}: {item.sale ? t("On sale") : t("Buying")}
                  </p>
                  <p>
                    {" "}
                    {t("Category")}: {item.category.toString()}{" "}
                  </p>
                </Link>
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
