import React from 'react';
import Lottie from "lottie-react";
import groovyWalkAnimation from "/public/lotties/ServerFailedConnexion.json";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BottomPage } from '../ServerError';

const FallbackErrorComponent = ({ error }) => {
  const router = useRouter()
    return (
        <div className='flex flex-col justify-center items-center min-h-[100vh]'>
          <div className='flex flex-col items-center flex-1 mt-20 text-center'>
            <Lottie 
              animationData={groovyWalkAnimation} 
              loop={true} 
              className='w-[300px] h-[300px]'
            />
            <h1 className='text-center'>Oops! <span className='italic font-thin'>Something went wrong.</span></h1>
            <p className='font-italic font-thin text-center oblique'>{error.message}</p>
            <button 
              type='button'
              onClick={()=>router.reload()}
              className='mt-2 text-sm text-blue-500 hover:underline'>Recharger</button>
          </div>

          <BottomPage />

        </div>
    );
}

export default FallbackErrorComponent;