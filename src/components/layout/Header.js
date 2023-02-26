import AuthButton from "../auth/AuthButton";
import { NavLink } from "react-router-dom";
function Header() {

  return (
    <header>
      <h1>
      UwUntu's Final BOSS
      </h1>
      <nav>
        
      </nav>
      
      <AuthButton />
      <NavLink className="button" to="/register">
      Register
      </NavLink>
      <NavLink className="button" to="/user-profile">
      Profile
      </NavLink>



    </header>
  )
  
}

export default Header;