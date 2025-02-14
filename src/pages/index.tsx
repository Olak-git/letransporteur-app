import React from 'react'
import { Inter } from 'next/font/google'
import Signin from './auth/signin'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Signin />
  )
}
