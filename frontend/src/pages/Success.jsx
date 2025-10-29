import React, { useEffect } from 'react';
import promo1 from '../assets/promo1.png';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const Success = () => {
    const navigate = useNavigate()
  useEffect(() => {
    // Show toast when component mounts
    toast.success("Uspešno si glasao!");
    setTimeout(() => {
       navigate("/")
    }, 4000);
  }, []); // empty array = run once on mount

  return (
    <div>
      <img src={promo1} alt="Promo" />
      <h4 className='text-2xl font-bold'>Uspešno ste glasali</h4>
      <p className='mt-3'>Uskoro ćete biti preusmereni...</p>
    </div>
  );
}

export default Success;
