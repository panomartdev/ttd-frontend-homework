'use client'
import { DropDown, Email, Eye, ImageUpload, Password } from '@/utils/icons';
import React, { useState, useRef, MutableRefObject, useEffect } from 'react'
import ImageModal from "@/components/ui/ImageModal";
import Link from 'next/link'
import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBin7Line } from "react-icons/ri";

interface FormData {
  email: string;
  password: string;
  confpassword: string;
  company: string;
  taxid: string;
  fullname: string;
  phone: string;
  website: string;
  address: string;
  zipcode: string;
}


const Signin = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confpassword: '',
    company: '',
    taxid: '',
    fullname: '',
    phone: '',
    website: '',
    address: '',
    zipcode: ''
  });

  const inputRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  
  useEffect(() => {
    try {
      const storedData = localStorage.getItem('formData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (typeof parsedData === 'object' && parsedData.email && parsedData.image) {
          setFormData((prevData) => ({
            ...prevData,
            email: parsedData.email,
          }));
          setImage(parsedData.image);
        } else {
          console.error('Unexpected data format in localStorage:', parsedData);
        }
      }
    } catch (error) {
      console.error('Error parsing data from localStorage:', error);
    }
  }, []);
  
  const handleImageInput = () => {
    inputRef.current?.click();
  };
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitButton = () => {
    if (formData.email && image) {
      // ไม่จำเป็นต้องสร้าง URL จาก Blob อีกต่อไป
      const datatoStore = {
        email: formData.email,
        image: image // ใช้สตริง base64 ที่เก็บใน state `image`
      };
  
      const jsonString = JSON.stringify(datatoStore);
      localStorage.setItem('formData', jsonString);
  
      alert("Stored in Local Storage");
      window.location.reload();
    } else {
      alert("failed");
    }
  };
  

  const [imageVis, setImageVis] = useState(false);
  const handleCloseModal = () => {
    setImageVis(false);
  };

  //Forms Input Onchange
  const handleInput = (field: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  }
  const handleAddressChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputAddress = event.target.value;
    setFormData((prevData) => ({ ...prevData, address: inputAddress }))
  };

  //Telephone digit input
  const handlePhoneKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = e.keyCode || e.charCode;
    const isValidKey = (keyCode >= 48 && keyCode <= 57) || keyCode === 8; // Allow digits (0-9) and Backspace
    const inputValue = e.currentTarget.value + e.key;
    const isValidLength = inputValue.length <= 10;

    if (!isValidKey || !isValidLength) {
      e.preventDefault();
    }
  };



  const [countrySelected, setCountrySelected] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);

  const [number, setNumber] = useState("+66");
  const [numberOpen, setNumberOpen] = useState(false);

  const [state, setState] = useState("");
  const [stateOpen, setStateOpen] = useState(false);

  const [subDistrict, setSubDistrict] = useState("");
  const [subDisOpen, setSubDisOpen] = useState(false);

  const [city, setCity] = useState("");
  const [cityOpen, setCityOpen] = useState(false);

 


  return (
    <div className='max-container'>
      <div className='max-w-[1280px] shadow-3xl mx-auto px-[4rem] mt-4 rounded-3xl py-16 border-[0.5px] border-solid border-gray-100 mb-10'>

        {/* Image */}
        <div className='mb-12'>
          <div className='border border-solid border-[#021E42] rounded-full w-[150px] h-[150px] mx-auto flex justify-center items-center overflow-hidden' >
            {image ? (
              <div className='relative group'>
                <img src={image} alt='' className='object-cover w-full h-full group-hover:brightness-50 transition-brightness' />
                <div className='absolute inset-0 items-center justify-center hidden group-hover:flex'>
                  <div className='text-white text-opacity-75 text-[30px] flex gap-4'>
                    <div className='cursor-pointer' onClick={() => setImageVis(true)}><IoEyeOutline /></div>
                    <div className='cursor-pointer' onClick={() => setImage(null)}><RiDeleteBin7Line /></div>
                  </div>
                </div>
              </div>

            ) : (
              <div className='text-[#142B41] w-full h-full flex justify-center items-center cursor-pointer'
                onClick={() => handleImageInput()}>
                <ImageUpload width={58} height={58} />
              </div>
            )
            }
            <input
              className='hidden'
              type='file'
              ref={inputRef}
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>

        </div>
        {imageVis && <ImageModal image={image} visible={imageVis} onClose={handleCloseModal} />}
        <div className='grid grid-cols-3 gap-6 '>
          {/* Email */}
          <form>
            <label htmlFor="username">Email </label><br />
            <div className='flex justify-between border border-solid border-gray-300 px-6 py-2 mt-1.5'>
              <div className='flex'>
                <Email height={25} width={25} />
                <input className='ml-3 outline-none bg-transparent' type='text' id='username' name='username' value={formData.email} onChange={(e) => handleInput('email', e.target.value)} placeholder='Enter your Email' />
              </div>
            </div>
          </form>

          {/*Password*/}
          <form>
            <label htmlFor="password">Password </label> {formData.password}<br />
            <div className='flex justify-between border border-solid border-gray-300 px-6 py-2 mt-1.5'>
              <div className='flex'>
                <Password height={25} width={25} />
                <input className='ml-3 outline-none' type='password' id='password' name='password' value={formData.password} onChange={(e) => handleInput('password', e.target.value)} placeholder='Enter your Password' />
              </div>
              <div className='cursor-pointer'><Eye width={24} height={24} /></div>
            </div>
          </form>

          {/*Confirm Password*/}
          <form>
            <label htmlFor="confpassword">Comfirmed Password</label><br />
            <div className='flex justify-between border border-solid border-gray-300 px-6 py-2 mt-1.5'>
              <div className='flex'>
                <Password height={25} width={25} />
                <input className='ml-3 outline-none' type='password' id='confpassword' name='confpassword' value={formData.confpassword} onChange={(e) => handleInput('confpassword', e.target.value)} placeholder='Enter your Password' />
              </div>
              <div className='cursor-pointer'><Eye width={24} height={24} /></div>
            </div>
          </form>
        </div>

        <div className='border-[1px] border-solid border-gray-300 my-8'></div>

        <h1 className=' text-xl font-semibold text-[#255FA8]'>Information</h1>
        <div className='grid grid-cols-3 gap-x-6 gap-y-8 mt-2'>
          {/*Company Name*/}
          <form>
            <label htmlFor="username">Company Name</label><br />
            <input className='outline-none bg-transparent w-[100%] border border-solid border-gray-300 px-3 py-2 mt-1.5 ' type='text' id='company' name='company' value={formData.company} onChange={(e) => handleInput('company', e.target.value)} placeholder='Enter company name' />
          </form>
          {/*Tax ID*/}
          <form>
            <label htmlFor="username">Tax ID</label><br />
            <input className='outline-none bg-transparent w-[100%] border border-solid border-gray-300 px-3 py-2 mt-1.5 ' type='text' id='taxid' name='taxid' value={formData.taxid} onChange={(e) => handleInput('taxid', e.target.value)} placeholder='Enter Tax ID' />
          </form>

          {/*Full Name*/}
          <form>
            <label htmlFor="username">Full Name</label><br />
            <input className='outline-none bg-transparent w-[100%] border border-solid border-gray-300 px-3 py-2 mt-1.5 ' type='text' id='fullname' name='fullname' value={formData.fullname} onChange={(e) => handleInput('fullname', e.target.value)} placeholder='Enter Full name' />
          </form>

          {/*Country*/}
          <form>
            <label htmlFor="username">Country</label><br />
            <div className={`outline-none bg-transparent w-[100%] border border-solid border-gray-300 px-4 py-2 mt-1.5 flex justify-between items-center cursor-pointer ${!countrySelected ? "text-slate-400" : ""}`} onClick={() => setCountryOpen(!countryOpen)}>
              {!countrySelected ? "Select Country" : countrySelected}
              <DropDown width={24} height={24} />
            </div>
            <div className='relative'>
              <ul className={`bg-white absolute border border-black  cursor-pointer w-full max-h-28 overflow-y-scroll transition-all duration-300 ease-in-out ${countryOpen ? "h-28" : "h-0 opacity-0"}`} >
                <li className='pl-6 py-2 text-sm hover:bg-slate-400 cursor-pointer' onClick={() => { setCountrySelected("Thailand"); setCountryOpen(false) }}>Thailand</li>
                <li className='pl-6 py-2 text-sm hover:bg-slate-400 cursor-pointer' onClick={() => { setCountrySelected("China"); setCountryOpen(false) }}>China</li>
                <li className='pl-6 py-2 text-sm hover:bg-slate-400 cursor-pointer' onClick={() => { setCountrySelected("Singapore"); setCountryOpen(false) }}>Singapore</li>
                <li className='pl-6 py-2 text-sm hover:bg-slate-400 cursor-pointer' onClick={() => { setCountrySelected("Malaysia"); setCountryOpen(false) }}>Malaysia</li>
                <li className='pl-6 py-2 text-sm hover:bg-slate-400 cursor-pointer' onClick={() => { setCountrySelected("Indonesia"); setCountryOpen(false) }}>Indonesia</li>
              </ul>
            </div>
          </form>

          {/*Phone Number*/}
          <form>
            <label htmlFor="username">Phone Number</label><br />
            <div className='flex gap-x-2'>
              <div className='w-[30%]'>
                <div className={`outline-none bg-transparent border border-solid border-gray-300 px-2 py-2 mt-1.5 flex justify-between items-center cursor-pointer`} onClick={() => setNumberOpen(!numberOpen)}>
                  {number}
                  <DropDown width={24} height={24} />
                </div>
                <div className='relative'>
                  <ul className={`bg-white absolute border border-black  cursor-pointer w-full overflow-y-scroll transition-all duration-300 ease-in-out ${numberOpen ? "h-28" : "h-0 opacity-0"}`} >
                    <li className='text-center py-2 text-sm hover:bg-slate-400 cursor-pointer' onClick={() => { setNumber("+66"); setNumberOpen(false) }}>+66</li>
                    <li className='text-center py-2 text-sm hover:bg-slate-400 cursor-pointer' onClick={() => { setNumber("+86"); setNumberOpen(false) }}>+86</li>
                    <li className='text-center py-2 text-sm hover:bg-slate-400 cursor-pointer' onClick={() => { setNumber("+65"); setNumberOpen(false) }}>+65</li>
                    <li className='text-center py-2 text-sm hover:bg-slate-400 cursor-pointer' onClick={() => { setNumber("+60"); setNumberOpen(false) }}>+60</li>
                    <li className='text-center py-2 text-sm hover:bg-slate-400 cursor-pointer' onClick={() => { setNumber("+62"); setNumberOpen(false) }}>+62</li>
                  </ul>
                </div>
              </div>
              <input className='outline-none bg-transparent w-[100%] border border-solid border-gray-300 px-3 py-2 mt-1.5' type='tel' id='phone' name='phone' pattern='\d*' value={formData.phone} onChange={(e) => handleInput('phone', e.target.value)} onKeyPress={handlePhoneKeyPress} placeholder='Enter Phone Number' />
            </div>
          </form>

          {/*Website*/}
          <form>
            <label htmlFor="username">Website</label><br />
            <input className='outline-none bg-transparent w-[100%] border border-solid border-gray-300 px-3 py-2 mt-1.5 ' type='text' id='website' name='website' value={formData.website} onChange={(e) => handleInput('website', e.target.value)} placeholder='Enter website' />
          </form>

          {/* Address */}
          <form className='row-span-2 pb-7'>
            <label htmlFor="username">Address</label><br />
            <textarea className='outline-none bg-transparent w-[100%] border border-solid border-gray-300 px-3 py-2 mt-1.5 h-[100%] resize-none' id='address' name='address' value={formData.address} onChange={handleAddressChange} placeholder='Enter Full name' />
          </form>

          {/*State/Province*/}
          <form>
            <label htmlFor="username">State/Province</label><br />
            <div className={`outline-none bg-transparent border border-solid border-gray-300 px-2 py-2 mt-1.5 flex justify-between items-center cursor-pointer ${!state ? "text-slate-400" : ""}`} onClick={() => setStateOpen(!stateOpen)}>
              {state ? state : "Choose Province"}
              <DropDown width={24} height={24} />
            </div>
            <div className='relative'>
              <ul className={`bg-white absolute border border-black  cursor-pointer w-full max-h-28 overflow-y-scroll transition-all duration-300 ease-in-out ${stateOpen ? "h-28" : "h-0 opacity-0"}`} >
                <li className='pl-6 py-2 text-sm hover:bg-slate-400 cursor-pointer' onClick={() => { setState("Bangkok"); setStateOpen(false) }}>Bangkok</li>
                <li className='pl-6 py-2 text-sm hover:bg-slate-400 cursor-pointer' onClick={() => { setState("Samutprakarn"); setStateOpen(false) }}>Samutprakarn</li>
                <li className='pl-6 py-2 text-sm hover:bg-slate-400 cursor-pointer' onClick={() => { setState("ChonBuri"); setStateOpen(false) }}>ChonBuri</li>
                <li className='pl-6 py-2 text-sm hover:bg-slate-400 cursor-pointer' onClick={() => { setState("Rayong"); setStateOpen(false) }}>Rayong</li>
                <li className='pl-6 py-2 text-sm hover:bg-slate-400 cursor-pointer' onClick={() => { setState("PathumThani"); setStateOpen(false) }}>PathumThani</li>
              </ul>
            </div>
          </form>

          {/*Sub-District*/}
          <form>
            <label htmlFor="username">Sub-District</label><br />
            <div className={`outline-none bg-transparent border border-solid border-gray-300 px-2 py-2 mt-1.5 flex justify-between items-center cursor-pointer ${!subDistrict ? "text-slate-400" : ""}`} onClick={() => setSubDisOpen(!subDisOpen)}>
              {subDistrict ? subDistrict : "Choose Sub-District"}
              <DropDown width={24} height={24} />
            </div>
            <div className='relative'>
              <ul className={`bg-white absolute border border-black  cursor-pointer w-full max-h-28 overflow-y-scroll transition-all duration-300 ease-in-out ${subDisOpen ? "h-28" : "h-0 opacity-0"}`} >
                <li className='pl-6 py-2 text-sm hover:bg-slate-400 cursor-pointer' onClick={() => { setSubDistrict("HuaiKwang"); setSubDisOpen(false) }}>HuaiKwang</li>
                <li className='pl-6 py-2 text-sm hover:bg-slate-400 cursor-pointer' onClick={() => { setSubDistrict("SamYan"); setSubDisOpen(false) }}>SamYan</li>
                <li className='pl-6 py-2 text-sm hover:bg-slate-400 cursor-pointer' onClick={() => { setSubDistrict("HuaLamphong"); setSubDisOpen(false) }}>HuaLamphong</li>
                <li className='pl-6 py-2 text-sm hover:bg-slate-400 cursor-pointer' onClick={() => { setSubDistrict("BangNa"); setSubDisOpen(false) }}>BangNa</li>
                <li className='pl-6 py-2 text-sm hover:bg-slate-400 cursor-pointer' onClick={() => { setSubDistrict("BangSue"); setSubDisOpen(false) }}>BangSue</li>
              </ul>
            </div>
          </form>

          {/*City*/}
          <form>
            <label htmlFor="username">City/District</label><br />
            <div className={`outline-none bg-transparent border border-solid border-gray-300 px-2 py-2 mt-1.5 flex justify-between items-center cursor-pointer ${!city ? "text-slate-400" : ""}`} onClick={() => setCityOpen(!cityOpen)}>
              {city ? city : "Choose District"}
              <DropDown width={24} height={24} />
            </div>
            <div className='relative'>
              <ul className={`bg-white absolute border border-black  cursor-pointer w-full max-h-28 overflow-y-scroll transition-all duration-300 ease-in-out ${cityOpen ? "h-28" : "h-0 opacity-0"}`} >
                <li className='pl-6 py-2 text-sm hover:bg-slate-400 cursor-pointer' onClick={() => { setCity("HuaiKwang"); setCityOpen(false) }}>HuaiKwang</li>
                <li className='pl-6 py-2 text-sm hover:bg-slate-400 cursor-pointer' onClick={() => { setCity("SamYan"); setCityOpen(false) }}>SamYan</li>
                <li className='pl-6 py-2 text-sm hover:bg-slate-400 cursor-pointer' onClick={() => { setCity("HuaLamphong"); setCityOpen(false) }}>HuaLamphong</li>
                <li className='pl-6 py-2 text-sm hover:bg-slate-400 cursor-pointer' onClick={() => { setCity("BangNa"); setCityOpen(false) }}>BangNa</li>
                <li className='pl-6 py-2 text-sm hover:bg-slate-400 cursor-pointer' onClick={() => { setCity("BangSue"); setCityOpen(false) }}>BangSue</li>
              </ul>
            </div>
          </form>

          {/*Zip Code*/}
          <form>
            <label htmlFor="username">Zip Code</label><br />
            <input className='outline-none bg-transparent w-[100%] border border-solid border-gray-300 px-3 py-2 mt-1.5 ' type='text' id='zipcode' name='zipcode' value={formData.zipcode} onChange={(e) => handleInput('zipcode', e.target.value)} placeholder='Enter Zip Code' />
          </form>

        </div>

        <div className='flex justify-between mt-14 px-10'>
          <Link href='/' className='bg-[#2A4B6A] text-white rounded-full px-8 py-2 text-base shadow-3xl'>Cancel</Link>
          <button className='bg-[#5FC198] text-white rounded-full px-8 py-2 text-base shadow-3xl' onClick={() => submitButton()}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Signin