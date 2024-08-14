import React from 'react'
import bgimage from '../assets/bgimage.jpg'
import TextField from '@mui/material/TextField';
import { Form } from 'react-router-dom';

const Login = () => {
  return (
 <section className=' w-full h-screen relative'>
    <img src={bgimage} alt="" className=' w-full h-full object-cover' />

    <div className=' fixed w-full h-screen backdrop-blur-sm  top-0 z-40 flex items-center justify-center p-3'>
       <Form className=' lg:w-1/2 md:w-5/6 w-full bg-white flex flex-col items-center justify-center py-10  gap-y-3 rounded-md'>

       <h1 className='text-2xl mb-4'>LOGIN</h1>
       <TextField id="outlined-basic" label="Email" name='email' variant="outlined" className='w-3/4' />
       <TextField id="outlined-basic" label="Password" name='password' variant="outlined" className='w-3/4' />
       </Form>
    </div>
 </section>
  )
}

export default Login