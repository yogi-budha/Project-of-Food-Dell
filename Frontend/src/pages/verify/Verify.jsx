
import {  useNavigate, useSearchParams } from 'react-router-dom'
import './verify.css'
import { useContext, useEffect } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import Popup from '../../Components/Popup/Popup'
function Verify() {

    const [searchParams,setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const {mainurl,token} = useContext(StoreContext)


    const navigate = useNavigate();

    const verifyPayment = async ()=>{
        const response = await axios.post(`${mainurl}/api/order/verify`,{success,orderId},{headers:{token:token}})
        console.log(response.data)
        if(success == 'true')
        {
            navigate('/myorders')
        }else{
            navigate('/')
        }
    }

    useEffect(()=>{
        if(token){

            verifyPayment()
        }
    },[token])
  return (
    <div >

  
    </div>
  )
}

export default Verify