//import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavToArray, deleteFavToArray } from "../../store/slices/userSlice";

import "../../style/favButton.css";

const FavButton = () => {
  const dispatch = useDispatch();
  const [advert] = useSelector((state) => state.adverts.list);
  const user = useSelector((state) => state.user.userInfo);

  const advertId = advert._id;
  const favAdverts = user.favAdverts;
  const favAdvertsId = favAdverts.map((advert) => advert._id);
  const isLiked = favAdvertsId.includes(advertId);

  const handleLikeButton = () => {
    dispatch(addFavToArray(user, advert));
  };

  const handleForgetButton = () => {
    dispatch(deleteFavToArray(user, advert));
  };

  return (
    <div className="fav-buttons">
      {isLiked ? (
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
