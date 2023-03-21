import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { profileData } from "../../store/actions/userActions";
import Page from "../layout/Page";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const [t] = useTranslation("translation");
  const url = process.env.REACT_APP_URL_PHOTO;

  useEffect(() => {
    dispatch(profileData());
  }, [dispatch]);

  const adverts = useSelector((state) => state.user?.userInfo?.favAdverts);

  return (
    <Page>
      <div>
        {adverts?.length > 0 ? (
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
          <p>No hay resultados</p>
        )}
      </div>
    </Page>
  );
};

export default FavoritesPage;
