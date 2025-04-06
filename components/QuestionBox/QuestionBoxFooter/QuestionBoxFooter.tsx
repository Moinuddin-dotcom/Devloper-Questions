

import { MoreVertical, Bookmark, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import LikeSection from "./LikeSection/LikeSection";
import DisLikeSection from "./DisLikeSection/DisLikeSection";
import CommentSection from "./CommentSection/CommentSection";

interface QuestionBoxFooterProps {
    card: { _id: string; content: string; tags: string[]; name: string; postedAt: string; likes: string[]; dislikes: string[] };
}


export default function QuestionBoxFooter({ card }: QuestionBoxFooterProps) {

    return (
        <>
            <div className="flex items-center space-x-4">
                {/* Upvote Button */}
                <LikeSection card={card} />

                {/* Downvote Button */}
                <DisLikeSection card={card} />

                {/* Comments */}
                <CommentSection card={card} />
            </div>

            <div>
                {/* Three-dot Dropdown Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="bg-white border text-gray-900 hover:text-gray-100">
                            <MoreVertical className="w-5 h-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white text-black p-2 rounded-lg shadow-md">
                        <DropdownMenuItem className="flex items-center space-x-2 hover:bg-gray-100 p-2 cursor-pointer">
                            <Bookmark className="w-4 h-4" />
                            <span>Bookmark</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center space-x-2 hover:bg-gray-100 p-2 cursor-pointer text-red-500">
                            <Flag className="w-4 h-4" />
                            <span>Report</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}
