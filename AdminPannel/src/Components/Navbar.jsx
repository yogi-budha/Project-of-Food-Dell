import logo from '../../../Frontend/src/assets/foodExpress.jpg'
import profile from '../assets/profile_image.png'

function Navbar() {
  return (
<div className='w-full p-4 shadow-md'>
  <div className='flex justify-between items-center px-8'>
  <img className='w-64' src={logo} alt="" />
  <img src={profile} alt="" />
  </div>
</div>
  )
}

export default Navbar