import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import AuthButton from "../auth/AuthButton";
import { useTranslation } from "react-i18next";

function Header() {
  const { token } = useSelector((state) => state.auth);
  const [t, i18n] = useTranslation("translation");

  return (
    <header>
      <NavLink to="/" className="main-title">
        <h1>UwUntu's Final BOSS</h1>
      </NavLink>
      <div>
        <button
          onClick={() => {
            i18n.changeLanguage("es");
            localStorage.setItem("lng", "es");
          }}
        >
          ES
        </button>
        <button
          onClick={() => {
            i18n.changeLanguage("en");
            localStorage.setItem("lng", "en");
          }}
        >
          EN
        </button>
      </div>
      <section className="nav-buttons">
        {token ? (
          <nav className="header-nav">
            <NavLink to="/newadvert" className="nav-link">
              | {t("New Advert")} |
            </NavLink>

            <NavLink to="/user-profile" className="nav-link">
              | {t("My profile")} |
            </NavLink>
            <NavLink to="/chat" className="nav-link">
              | Chat |
            </NavLink>
          </nav>
        ) : (
          <nav>
            <NavLink to="/register" className="button-log">
              {t("Sign up")}
            </NavLink>
          </nav>
        )}
        <AuthButton />
      </section>
    </header>
  );
}

export default Header;
