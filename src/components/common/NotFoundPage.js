import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  
  return <>
    <img className="uwu-404" src={"img/uwu-logo.webp"} alt="uwu-logo"/>
    <h1 className="message-404">404 Page Not Found</h1>
    <NavLink className='home-link' to={'/'}>UwUntus's Home Page</NavLink>
    </>
}

export default NotFoundPage;
