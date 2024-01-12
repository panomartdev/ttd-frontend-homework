import { CloseIcon } from '@/utils/icons'
import React from 'react'

const ImageModal = ({ image, visible, onClose }) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-50 text-white' onClick={onClose}>    
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' >
        <button className='absolute top-2 right-2 ' onClick={onClose}>
           <CloseIcon width={34} height={34}/>
        </button>
        {image && 
             <div onClick={(e) => e.stopPropagation()}>
                <img src={image} alt='Modal Image' className='w-[400px] h-[400px] object-cover border-8 border-white rounded-xl ' /> 
             </div>
         }
      </div>
  </div>
  )
}

export default ImageModal