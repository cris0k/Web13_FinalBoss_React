import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { profileData } from '../store/actions/userActions';


const ProfilePage= () => {
  const { userInfo } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  console.log(userInfo);
  useEffect(() => {
    try {
      dispatch(profileData())
      
    } catch (error) {
      console.log('Did not dispatch profileData');
    }

  },[dispatch]);

  return (
    <section>
      <div>
        <h1>
          Welcome <strong>{userInfo?.name}!</strong>
        </h1>
      </div>
      <div>
        <h2>My data</h2>
        <ul>
          <li>{userInfo?.id}</li>
          <li>{userInfo?.name}</li>
          <li>{userInfo?.email}</li>
        </ul>
      </div>
    </section>
  )
}

export default ProfilePage