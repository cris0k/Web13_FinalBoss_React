import Page from "../layout/Page";
import { useEffect, useState } from "react";
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
  const { list }= useSelector((state) => state.adverts);
  const [t] = useTranslation("translation");
  const dispatch = useDispatch();
  const url = process.env.REACT_APP_URL_PHOTO;

  const [visible, setVisible] = useState(6);
  const [isCompleted, setIsCompleted] = useState(false)
  const allGames = list.length

  const showMoreGames = () => {
    setVisible((prevValue)=>{
      const nextGames = prevValue + 6
      if(nextGames > allGames){
        setIsCompleted(true)
        return allGames
      }
      return nextGames
    });
    
  };
  

  useEffect(() => {
    dispatch(fetchAllAdverts());
  }, [dispatch]);

  return (
    <Page {...props}>
      <div className="advertsPage">
        {allGames > 0 ? (
          <ul className="advertsPage-list">
            {list?.slice(0, visible).map((item) => (
              <li className="advertsPage-item" key={item._id}>
                <Link className="linkDetail" to={`/${item._id}`}>
                  <div className="AdvertDetail-photo">
                    {item.photo ? (
                      <img src={url + item.photo} alt={item.photo} />
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
      <div>
        <button onClick={showMoreGames} disabled={isCompleted}>Load More {visible}/{allGames}</button>
        
      </div>
    </Page>
  );
};

export default AdvertsPage;
