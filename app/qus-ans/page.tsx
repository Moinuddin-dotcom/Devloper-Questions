"use client";


import axios from "axios";
import { useEffect, useState } from "react";
import QuestionTable from "@/components/QuestionBox/QuestionTable/QuestionTable";
import Loading from "../loading";
import { TypeAnimation } from 'react-type-animation';


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

        <div className="trending_question hidden md:block rounded-lg border-gray-300 p-4 border ">
          <div className="min-h-20">
            <TypeAnimation
              sequence={[
                'Trending Questions:',
                1000,
                'Next JS - React JS - React Native - JavaScript - Node JS',
                1000,
                'Typescript',
                1000,
                'MySQl - Mongoose - MongoDB - Atlas Server - Database',
                1000,
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: '1em', display: 'inline-block', fontWeight: 'bold', }}
              repeat={Infinity}
            />
          </div>
          <div className="divider divider-info">Have a look</div>
          <div className="trending_question hidden md:block rounded-lg border-gray-300 p-4 border bg-gray-50 shadow-sm">
            {cardData
              ?.sort((a, b) => b.likes.length - a.likes.length) // Sort by most likes
              .slice(0, 5) // Show top 5
              .map((dataOfCard) => (
                <ul key={dataOfCard._id} className="list-disc list-inside mb-2">
                  <li className="text-sm text-gray-800 font-medium">
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          dataOfCard.content.length > 80
                            ? dataOfCard.content.slice(0, 80) + "..."
                            : dataOfCard.content,
                      }}
                    />
                    <span className="ml-2 text-blue-500">({dataOfCard.likes.length} likes)</span>
                  </li>
                </ul>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
