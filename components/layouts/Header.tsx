'use client'
import React,{useState, useEffect} from 'react'
import Link from 'next/link'
import { ArrowDown } from '@/utils/icons'

const Header = () => {
  const [user, setUser] = useState({
     email: '',
     image: ''
  })
  const [loginStatus, setLoginStatus] = useState(false);
  const [profile , setProfile] = useState(false);
  
  useEffect(() => {
    try {
      const storedData = localStorage.getItem('formData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (typeof parsedData === 'object' && parsedData.email && parsedData.image) {
          setUser({ email: parsedData.email, image : parsedData.image });
          setLoginStatus(true);
        } else {
          console.error('Unexpected data format in localStorage:', parsedData);
        }
      }
    } catch (error) {
      console.error('Error parsing data from localStorage:', error);
    }
  }, [loginStatus]);

  const Logout = () => {
    // Remove formData from localStorage
    localStorage.removeItem('formData');
    // Reset user state and loginStatus
    setUser({ email: '', image: '' });
    setLoginStatus(false);
    window.location.reload();
  };

  return (
    <header className='shadow-3xl z-10'>
        <div className='max-container flex justify-between items-center'>
            <Link className='  bg-black text-center flex items-center rounded-full w-[64px] h-[64px] my-1' href='/'><span className='flex mx-auto text-white font-bold uppercase'>Logo</span></Link>
            <Link className='uppercase underline text-lg text-[#2A4B6A] text-[20px]' href='/'>Home</Link>
             {
                 loginStatus ? (
                            <div>
                              <div className='flex items-center cursor-pointer' onClick={()=> setProfile(!profile)}>
                                  <img src={user.image} className='w-[64px] h-[64px] mr-4 rounded-full object-cover my-2 '/>
                                  <ArrowDown width={14} height={11}/>
                              </div>
                              <div className={`relative `}>
                                   <div className={`absolute bg-white w-[160px] ${profile ? "h-[165px]": "h-0 opacity-0"} border border-black right-0 top-1.5 rounded-lg p-4 transition-all duration-300 ease-in-out`}>
                                        <div className='flex justify-center flex-col items-center'>
                                            <img src={user.image} className='w-[40px] h-[40px] rounded-full object-cover'/>
                                            <p className='border-b-2 border-[#2A4B6A] w-full text-center py-2 text-sm font-bold'>{user.email}</p>
                                        </div>
                                        <div className='mt-2 flex flex-col justify-center'>
                                            <p className='text-[#2A4B6A] text-lg'>Profile</p>
                                            <div className='text-[#2A4B6A] text-lg cursor-pointer' onClick={Logout}>Logout</div>
                                        </div>
                                   </div>
                              </div> 
                            </div>
                          ):
                          (
                            <><Link className='bg-[#2A4B6A] text-white rounded-full px-8 py-1.5 text-[20px] shadow-3xl' href='/signin'>Sign in</Link></>
                          )
             }
            
        </div>
        
    </header>
  )
}

export default Header