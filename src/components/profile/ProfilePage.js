import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { profileData } from "../../store/actions/userActions";
import "../../style/profile.css";
import DeleteAccount from "./DeleteAccount";
import FavoritesPage from "./Favorites";

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [t] = useTranslation("translation");

  useEffect(() => {
    dispatch(profileData());
  }, [dispatch]);

  return (
    <section className="profile-page">
      <div>
        <nav className="nav-profile">
          <NavLink className="nav-user" to="/user-profile/my-favorites">
            | {t("Favourites")} |
          </NavLink>
          <NavLink className="nav-user">| {t("Reserved")} |</NavLink>
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
            <NavLink> {t("Edit profile")}</NavLink>
          </div>
          <div>
            <DeleteAccount />
          </div>
        </section>
        <section className="my-adverts">
          <h1>{t("My Adverts")}</h1>
        </section>
      </div>
    </section>
  );
};

export default ProfilePage;
