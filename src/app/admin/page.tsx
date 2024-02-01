"use client"
import useUser from '@/hooks/useUser'
import { account, team } from '@/utils/clientAppwrite'
import React, { useEffect, useState } from 'react'

export default function Page() {
  const [jwt, setJwt] = useState("")
  const [membershipID, setMembershipID] = useState("")
  const {} = useUser()




  return (
    <>
      <h1>{jwt}</h1>
      <h1>{membershipID}</h1>
    </>
  )
}
