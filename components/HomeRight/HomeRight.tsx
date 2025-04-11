import axios from 'axios';
import React from 'react'
import UserDataShowCase from './UserDataShowCase';



const fetchPostedData = async () => {
  try {
    const { data: postedData } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);
    return postedData
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};
export default async function HomeRight() {
  const userData = await fetchPostedData()
  return (
    <div className="hidden lg:block sticky top-0 h-screen ">
      <UserDataShowCase reviews={userData} />
    </div>
  )
}
