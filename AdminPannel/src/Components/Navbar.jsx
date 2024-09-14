import logo from '../assets/logo.png'
import profile from '../assets/profile_image.png'

function Navbar() {
  return (
<div className='w-full p-4'>
  <div className='flex justify-between items-center px-8'>
  <img src={logo} alt="" />
  <img src={profile} alt="" />
  </div>
</div>
  )
}

export default Navbar