'use client'
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
    content: string; // This contains HTML from TipTap
    tags: string[]; // Tags array
    likes: number;
    comments: { text: string; user: string }[];
  }

  const [cardData, setCardData] = useState<CardData[]>([]);
  console.log(cardData);

  useEffect(() => {
    const fetchPostedData = async () => {
      try {
        const { data: postedData } = await axios.get("http://localhost:3000/api/question");

        if (Array.isArray(postedData)) {
          setCardData(postedData);
        } else {
          console.error("API did not return an array:", postedData);
          setCardData([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setCardData([]);
      }
    };

    fetchPostedData();
  }, []);

  return (
    <>
      {cardData?.map(item => (
        <div key={item._id} className="border border-gray-300 rounded-lg shadow-md p-4 bg-white">
          {/* Display Rich Text Content */}
          <div className="text-gray-700 mt-2 text-sm" dangerouslySetInnerHTML={{ __html: item.content }} />

          {/* Tags */}
          <div className="flex flex-wrap mt-3 space-x-2">
            {item.tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-xs">
                {tag}
              </span>
            ))}
          </div>

          {/* User Info */}
          <div className="flex items-center mt-3 text-xs text-gray-500">
            <span className="text-red-500 font-medium">{item.name}</span> • <span>{new Date(item.postedAt).toLocaleString()}</span>
          </div>

          {/* Bottom Stats (Votes, Answers, Views) */}
          <div className="flex justify-between items-center mt-4 border-t pt-3">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
                <ThumbsUp className="w-5 h-5" />
                <span>{item.likes}</span>
              </Button>
              <Button variant="ghost" className="flex items-center space-x-1 text-gray-600 hover:text-red-500">
                <ThumbsDown className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-gray-600 text-sm">
              <span className="flex items-center space-x-1">
                <MessageSquare className="w-4 h-4" />
                <span>{item.comments.length} Answers</span>
              </span>
              <span className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>15 Views</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
