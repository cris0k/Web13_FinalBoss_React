import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import "../../style/profile.css";
import DeleteAccount from "./DeleteAccount";
import { useEffect } from "react";
import { getUserAdvert } from "../../store/slices/adverts";
import "../../style/advertsPage.css";
import { useState } from "react";
import { profileData } from "../../store/actions/userActions";

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [t] = useTranslation("translation");
  const url = process.env.REACT_APP_URL_PHOTO;
  const name = useSelector((state) => state.user?.userInfo?.name);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(6)
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    dispatch(profileData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserAdvert(name))
   }, [name, dispatch]);

   const userAdverts = useSelector((state)=>state.adverts.list)
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
    <section className="profile-page">
      <div>
        <nav className="nav-profile">
          <NavLink className="nav-user" to="/user-profile/my-favorites">
            {t("Favourites")}
          </NavLink>
        </nav>
      </div>
      <div className="profile-data">
        <section>
          <figure src={"img/uwu-profile.png"} alt="avatar">
            {userInfo?.name}
          </figure>
          <ul>
            <li>
              {t("Name")} : {userInfo?.name}
            </li>
            <li>
              {t("Email")} : {userInfo?.email}
            </li>
          </ul>
          <div>
            <DeleteAccount />
          </div>
        </section>
        <section className="my-adverts">
          <h1>{t("My Adverts")}</h1>
        
        <div>
        {allGames > 0 ? (
          <ul className="advertsPage-list">
            {userAdverts.slice(0, visible).map((item) => (
              <li className="advertsPage-item" key={item._id}>
                <Link
                 className="linkDetail" to={`/${item._id}`}>
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
      </section>
      </div>
      <div>
        <button onClick={showMoreGames} disabled={isCompleted}>
          {t("Load More ")}{visible}/{allGames}
        </button>
			</div>
    </section>
  );
};

export default ProfilePage;
