import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserAdvert } from "../../store/slices/adverts";
// import { setAd } from "../auth/service";
import Page from "../layout/Page";

const MyAdvertsPage = () => {
  const dispatch = useDispatch();
  const [t] = useTranslation("translation");
  const url = process.env.REACT_APP_URL_PHOTO;
  const name = useSelector((state) => state.user.userInfo.name);
  const [visible, setVisible] = useState(2)
  const [isCompleted, setIsCompleted] = useState(false);
  useEffect(() => {
    dispatch(getUserAdvert(name));
  }, [name, dispatch]);

  const userAdverts = useSelector((state) => state.adverts.list);
  const allGames = userAdverts.length;
  const showMoreGames = () => {
   setVisible((prevValue) => {
     const nextGames = prevValue + 6;
     if (nextGames > allGames) {
       setIsCompleted(true);
       return allGames;
     }
     return nextGames;
   });
 };
  return (
    <Page>
      <div>
        {userAdverts.length > 0 ? (
          <ul className="advertsPage-list">
            {userAdverts.map((item) => (
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
        <button onClick={showMoreGames} disabled={isCompleted}>
							Load More {visible}/{allGames}
						</button>
      </div>
      
    </Page>
  );
};

export default MyAdvertsPage;
