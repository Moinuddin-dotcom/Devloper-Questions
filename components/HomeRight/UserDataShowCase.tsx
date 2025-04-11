import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";
import { useMemo } from "react";
import profilePic from '@/public/assets/profile-pic.png'

interface Review {
    image: string;
    name: string;
    email: string;
}

export default function UserDataShowCase({ reviews }: { reviews: Review[] }) {
    const firstRow = useMemo(() => reviews.slice(0, reviews.length / 2), [reviews]);
    const secondRow = useMemo(() => reviews.slice(reviews.length / 2), [reviews]);

    const ReviewCard = ({
        image,
        name,
        email,
    }: {
        image: string;
        name: string;
        email: string;
    }) => {
        return (
            <figure
                className={cn(
                    "relative h-full w-fit sm:w-36 cursor-pointer overflow-hidden rounded-xl border p-4",
                    "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                    "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
                )}
            >
                <div className="flex flex-row items-center gap-2">
                    <Image
                        src={image || profilePic}
                        alt={`${name}'s profile picture`}
                        width={32}
                        height={32}
                        className="rounded-full"
                    />
                    <div className="flex flex-col">
                        <figcaption className="text-sm font-medium dark:text-white">
                            {name}
                        </figcaption>
                    </div>
                </div>
                <blockquote className="mt-2 text-sm">{email}</blockquote>
            </figure>
        );
    };

    return (
        <div>
            <div className="relative flex min-h-[400px] w-full flex-row items-center justify-center overflow-hidden">
                <Marquee pauseOnHover vertical className="[--duration:20s]">
                    {firstRow.map((review) => (
                        <ReviewCard key={review.email} {...review} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
                    {secondRow.map((review) => (
                        <ReviewCard key={review.email} {...review} />
                    ))}
                </Marquee>
            </div>
        </div>
    );
}