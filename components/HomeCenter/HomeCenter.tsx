import React from 'react'
import PostInputSec from './PostInput/PostInputSec'
import BlogBoxTable from './BlogBox/BlogBoxTable/BlogBoxTable';
import axios from 'axios';


const fetchPostedData = async () => {
  try {
    const { data: postedData } = await axios.get("http://localhost:3000/api/blog");
    return postedData
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};


export default async function HomeCenter() {
  const cardData = await fetchPostedData()
  return (
    <div className="overflow-y-auto h-screen border-l-2 border-r-2 border-gray-500 p-4">
      <div className="flex flex-col items-center  min-h-screen">
        {/* Post Input Box */}
        <PostInputSec />
        {/* <PostInputSecDialog /> */}
        {/* Post Card */}
        <BlogBoxTable cardData={cardData} />

      </div>
    </div>
  )
}
