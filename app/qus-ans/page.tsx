'use client'
// import QuestionUi from "@/components/QuestionUI/QuestionUi";
import axios from "axios";
import { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown, MessageSquare, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DevQuestions() {
  interface CardData {
    _id: string;
    image: string;
    name: string;
    postedAt: string;
    content: string;
    likes: number;
    comments: { text: string; user: string }[];
  }
  const [cardData, setCardData] = useState<CardData[]>([])
  console.log(cardData)
  useEffect(() => {
    const fetchPostedData = async () => {
      try {
        const { data: postedData } = await axios("http://localhost:3000/api/question");

        // Ensure it's an array before setting state
        if (Array.isArray(postedData)) {
          setCardData(postedData);
        } else {
          console.error("API did not return an array:", postedData);
          setCardData([]); // Set to an empty array to avoid errors
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setCardData([]); // Set an empty array on failure
      }
    };
    fetchPostedData();
  }, [])
  return (
    <>
      <div className="border border-gray-300 rounded-lg shadow-md p-4 bg-white">
        {/* Question Title */}
        <h2 className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer">
          Is there a Google reCAPTCHA v3 package compatible with Angular 18?
        </h2>

        {/* Question Description */}
        <p className="text-gray-700 mt-2 text-sm">
          I'm migrating a project from Angular 11 to Angular 18 and need to integrate Google reCAPTCHA v3.
          Previously, I used: <code className="bg-gray-200 px-1 rounded">angular-recaptcha3</code>: "^2.0.0"
          Now, I’m trying to use: "ng-...
        </p>

        {/* Tags */}
        <div className="flex flex-wrap mt-3 space-x-2">
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-xs">javascript</span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-xs">angular</span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-xs">npm-install</span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-xs">package.json</span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-xs">recaptcha-v3</span>
        </div>

        {/* User Info */}
        <div className="flex items-center mt-3 text-xs text-gray-500">
          {/* <img
          src="https://www.gravatar.com/avatar/placeholder"
          alt="User Avatar"
          className="w-5 h-5 rounded-full mr-2"
        /> */}
          <span className="text-red-500 font-medium">neha</span> • <span>4 mins ago</span>
        </div>

        {/* Bottom Stats (Votes, Answers, Views) */}
        <div className="flex justify-between items-center mt-4 border-t pt-3">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
              <ThumbsUp className="w-5 h-5" />
              <span>5</span>
            </Button>
            <Button variant="ghost" className="flex items-center space-x-1 text-gray-600 hover:text-red-500">
              <ThumbsDown className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex items-center space-x-4 text-gray-600 text-sm">
            <span className="flex items-center space-x-1">
              <MessageSquare className="w-4 h-4" />
              <span>2 Answers</span>
            </span>
            <span className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>15 Views</span>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
