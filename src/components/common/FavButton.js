import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavToArray } from "../../store/slices/userSlice";

import "../../style/favButton.css";

const FavButton = () => {
  const [isLike, setIsLike] = useState(false);
  const dispatch = useDispatch();
  const [advert] = useSelector((state) => state.adverts.list);
  const user = useSelector((state) => state.user.userInfo);

  const handleLikeButton = () => {
    dispatch(addFavToArray(user, advert));
  };
  const handleForgetButton = () => {
    setIsLike(false);
  };

  return (
    <div>
      {isLike ? (
        <button className="nofav-button" onClick={handleForgetButton}>
          Forget Favourite
        </button>
      ) : (
        <button className="fav-button" onClick={handleLikeButton}>
          Add Favourite
        </button>
      )}
    </div>
  );
};

export default FavButton;
