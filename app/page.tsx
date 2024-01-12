import Image from 'next/image'
import { Email } from '@/utils/icons'


export default function Home() {
  const packages = [
      {id:1, image: '/package1.webp'},
      {id:2, image: '/package2.webp'},
      {id:3, image: '/package3.webp'},
      {id:4, image: '/package3.webp'}
  ]
  
  return (
     <div>
          {/* Hero Section */}
          <section className='bg-hero h-[600px] w-100 bg-cover bg-no-repeat bg-center flex items-center justify-center'>
              <div className='text-center  '>
                  <h1 className='text-5xl font-bold text-center leading-normal text-white'>Lorem ipsum dolor sit amet consectetur.</h1>
                  <h2 className='text-4xl font-medium text-white'>One-stop Platform community for Agents and Operator in Thailand</h2>
              </div>
          </section>
          {/* Hero Section */}
          <section className='my-10 max-container'>
               <h1 className='text-4xl font-bold text-center text-[#142B41]'>Lorem ipsum</h1>
               <div className='grid grid-cols-4 gap-6 mt-10'>
                    {packages.map((item,index)=>(
                        <div key={item.id} className='rounded-lg shadow-3xl pb-5'>
                            <img src={item.image} className='w-[100] h-[270px]'/>
                            <div className='text-center '>
                                <h2 className='text-lg font-bold leading-12 text-[#142B41]'>Lorem ipsum</h2>
                                <p className='text-sm w-[280px] mx-auto'>One-stop Platform community for Agents and Operator in Thailand.</p>
                                <button className='bg-[#2A4B6A] text-white rounded-full px-8 py-2 text-base shadow-3xl mt-5'>Buy package</button>
                            </div>
                        </div>
                    ))}
                </div>
          </section>

     </div>
  )
}
