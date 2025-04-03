import React from 'react'
import PostInputSec from './PostInput/PostInputSec'

export default function HomeCenter() {
  return (
    <div className="overflow-y-auto h-screen border-l-2 border-r-2 border-gray-500 p-4">
      {/* <div> */}
      <div className="flex flex-col items-center  min-h-screen">

        {/* Post Input Box */}
        <PostInputSec />

        {/* Post Card */}
        <div className="bg-white rounded-lg shadow-md p-4 mt-4 w-full max-w-2xl">
          {/* User Info */}
          <div className="flex items-center space-x-3">
            {/* <img
              src="https://i.pravatar.cc/40?img=3"
              alt="User"
              className="w-10 h-10 rounded-full"
            /> */}
            <div>
              <p className="font-semibold text-gray-800">Robert Hammond</p>
              <p className="text-sm text-gray-500">20 min. ago</p>
            </div>
          </div>

          {/* Post Content */}
          <p className="mt-3 text-gray-700">
            My wife prepared a surprise trip for me. I'm so thankful and I love her very much.
            Here are some of the best shots from our trip to Sri Lanka. 😍
          </p>

          {/* Post Images */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            {/* <img
              src="https://source.unsplash.com/300x200/?mountain"
              alt="Trip"
              className="rounded-lg"
            />
            <img
              src="https://source.unsplash.com/300x200/?travel"
              alt="Trip"
              className="rounded-lg"
            /> */}
          </div>

          {/* Reaction Buttons */}
          <div className="flex justify-between mt-4 text-gray-500 text-sm">
            <button className="flex items-center space-x-1">
              👍 <span className="text-blue-500 font-semibold">Liked</span> <span>230</span>
            </button>
            <button className="flex items-center space-x-1">
              💬 <span>Comment</span> <span>6</span>
            </button>
            <button className="flex items-center space-x-1">
              🔄 <span>Share</span> <span>2</span>
            </button>
          </div>
        </div>

      </div>
      {/* </div> */}
      {/* Infinite Scrolling Content */}
      {/* <div className="space-y-4">
          {Array.from({ length: 100 }).map((_, index) => (
            <p key={index} className="text-white">This is Center main page - Item {index + 1}</p>
          ))}
        </div> */}
    </div>
  )
}
