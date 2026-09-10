
import { getInitialsLater } from '../utils/helper'

 
const ProfileInfo = ({userInfo,onLogout}) => {
// console.log("check the user info in profile info compt ==>",userInfo)

  return (
    <div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-200 ' > 
            {getInitialsLater(userInfo.fullName)}
        </div>
        <div>
            <p className='text-sm font-medium '> { userInfo.fullName} </p>
            <button className=' cursor-pointer hover:text-red-600 ' onClick={onLogout}>Logout</button>
        </div>
    </div>
  )
}

export default ProfileInfo