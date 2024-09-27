import logo from '../../../Frontend/src/assets/foodExpress.jpg'
import profile from '../assets/profile_image.png'
import avatar from '../assets/avatar.jpeg'

function Navbar() {
  return (
<div className='w-full p-4 shadow-md'>
  <div className='flex justify-between items-center px-8'>
  <img className='w-64' src={logo} alt="" />
  <img className='w-20' src={avatar} alt="" />
  </div>
</div>
  )
}

export default Navbar