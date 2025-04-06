"use client";


import axios from "axios";
import { useEffect, useState } from "react";
import QuestionTable from "@/components/QuestionBox/QuestionTable/QuestionTable";
import Loading from "../loading";


export default function DevQuestions() {
  interface CardData {
    _id: string;
    image: string;
    name: string;
    postedAt: string;
    content: string;
    tags: string[];
    comments: { text: string; user: string }[];
    likes: string[];
    dislikes: string[];
  }

  const [cardData, setCardData] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchPostedData();
  }, []);




  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[78%_20%] gap-2.5 h-screen">
        {/* Left side */}
        {loading ? (<Loading />) : (
          <QuestionTable
            cardData={cardData}
          />
        )}

        <div className="trending_question hidden md:block border-l border-gray-300">
          <h2 className="text-lg font-semibold mb-4">Trending Questions</h2>

        </div>
      </div>
    </>
  );
}
