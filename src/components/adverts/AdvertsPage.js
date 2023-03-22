import Page from "../layout/Page";
import { useEffect, useState } from "react";
import { fetchAllAdverts } from "../../store/slices/adverts";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../../style/advertsPage.css";
import FilterForm from "../filters/FilterForm";
import EmptyList from "../common/EmptyList";

const AdvertsPage = (props) => {
  const { list } = useSelector((state) => state.adverts);
  const [t] = useTranslation("translation");
  const dispatch = useDispatch();
  const url = process.env.REACT_APP_URL_PHOTO;

  const [filterAds, setFilterAds] = useState([]);

  const [visible, setVisible] = useState(6);
  const [isCompleted, setIsCompleted] = useState(false);
  const allGames = list.length;

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

  useEffect(() => {
    dispatch(fetchAllAdverts());
  }, [dispatch]);

  return (
    <Page {...props}>
      <div className="advertsPage">
        {allGames > 0 ? (
          <>
            <FilterForm onFilter={setFilterAds} />
            <ul className="advertsPage-list">
              {filterAds.map((item) => (
                <li className="advertsPage-item" key={item._id}>
                  <Link className="linkDetail" to={`/${item._id}`}>
                    <div className="AdvertDetail-photo">
                      {item.photo ? (
                        <img src={url + item.photo} alt={item.photo} />
                      ) : (
                        <img src={"img/default.jpg"} alt="coming-soon" />
                      )}
                    </div>
                    <p>{item.name}</p>
                    <p>
                      {t("Price")}: {item.price}$
                    </p>
                    <p>
                      {t("State")}:{" "}
                      {item.sale === "sale" ? t("On sale") : t("Buying")}
                    </p>
                    <p>
                      {" "}
                      {t("Category")}: {item.category.toString()}{" "}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <EmptyList />
        )}
      </div>
      <div>
        <button onClick={showMoreGames} disabled={isCompleted}>
          {t("Load More ")}{visible}/{allGames}
        </button>
      </div>
    </Page>
  );
};
export default AdvertsPage;
