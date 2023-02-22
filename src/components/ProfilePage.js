import { useSelector } from 'react-redux'

const ProfilePage= () => {
  const { userInfo } = useSelector((state) => state.auth)

  return (
    <div>
      <figure>{userInfo?.name.charAt(0).toUpperCase()}</figure>
      <span>
        Welcome <strong>{userInfo?.name}!</strong> You can view this page
        because you're logged in
      </span>
    </div>
  )
}

export default ProfilePage