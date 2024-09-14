import React from 'react'
import { assets } from '../../assets/assets'
import './AppDownload.css'

function AppDownload() {
  return (
    <div className='AppDownload' id='App-download'>
        <h2>For Better Experience Download <br /> Nepal Food Express App</h2>
        <div className='download-icon'>
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
    </div>
  )
}

export default AppDownload