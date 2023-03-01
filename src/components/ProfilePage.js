import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { profileData } from '../store/actions/userActions';
import '../style/profile.css'


const ProfilePage= () => {
  const { userInfo } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  
  useEffect(() => {
    try {
      dispatch(profileData())
      
    } catch (error) {
      console.log('Did not dispatch profileData');
    }

  },[dispatch]);

  return (
    <section className='profile-page'>
      <div>
        <nav className='nav-profile'>
          <NavLink className="nav-user">| Favourites |</NavLink>
          <NavLink className="nav-user">| Reserved |</NavLink>
        </nav>
      </div>
      <div className='profile-data'>
        <section>
        <figure src={'img/uwu-profile.png'} alt='avatar'>{userInfo?.name}</figure>
        <ul>
          <li>ID : {userInfo?.id}</li>
          <li>Name : {userInfo?.name}</li>
          <li>Email : {userInfo?.email}</li>
        </ul>
        <div>
        <NavLink> Edit profile</NavLink>
        </div>
        <div>
        <NavLink> Delete account</NavLink>
        </div>
        </section>
        <section className='my-adverts'>
          <h1>My Adverts</h1>
          
        </section>
      </div>
    </section>
  )
}

export default ProfilePage