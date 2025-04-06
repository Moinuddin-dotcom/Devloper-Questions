import React from 'react'
import PostInputSec from './PostInput/PostInputSec'
import BlogBoxTable from './BlogBox/BlogBoxTable/BlogBoxTable';


export default function HomeCenter() {
  return (
    <div className="overflow-y-auto h-screen border-l-2 border-r-2 border-gray-500 p-4">
      <div className="flex flex-col items-center  min-h-screen">
        {/* Post Input Box */}
        <PostInputSec />
        {/* Post Card */}
        <BlogBoxTable />

      </div>
    </div>
  )
}
