'use client'
import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form"; // Import types from react-hook-form
import toast from "react-hot-toast";
import axios from "axios";

type FormData = {
  postType: "blog" | "question"; // Define the possible values for postType
  content: string; // Content should be a string
};

export default function DrawerContentPage() {
  const { data: session } = useSession();
  const router = useRouter()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>(); // Pass type to useForm

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      console.log(data); // Handle form submission here

      const userQuery = {
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
        content: data.content,
        postType: data.postType,
        postedAt: new Date(),
        comments: [],
        likes: 0,
        dislikes: 0,
      };
      console.log(userQuery);

      const { data: dataPost } = await axios.post('http://localhost:3000/api/user-post', userQuery)
      console.log(dataPost)
      // Access acknowledged from dataPost
      if (dataPost.acknowledged === true) {
        reset()
        toast.success(`Your ${data?.postType} posted successfully`);
        router.push('/')
      } else {
        toast.error('Failed to post your content');
      }
    } catch (error) {
      console.error('Error posting:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <DrawerContent className=" overflow-y-auto bg-gray-900 text-white rounded-lg">
      <DrawerHeader>
        <DrawerTitle className="text-lg text-white text-center font-semibold">Create a Post</DrawerTitle>
        <DrawerDescription className="text-gray-400 text-center">
          Write your blog or ask a question.
        </DrawerDescription>
      </DrawerHeader>

      {/* User Profile Section */}
      <div className="flex justify-center items-center space-x-3 p-4">
        <Image
          src={session?.user?.image || "/profile.png"}
          width={40}
          height={40}
          alt="User Profile"
          className="rounded-full border border-blue-500"
        />
        <div>
          <p className="font-medium">{session?.user?.name}</p>
        </div>
      </div>

      {/* Post Type Selection */}
      <div className="md:flex justify-center items-center pl-10 md:gap-10">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="blog"
            className="accent-blue-500"
            required
            {...register("postType")} // Only register the radio button
          />
          <span>📖 Make a Blog Post</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="question"
            className="accent-green-500"
            required
            {...register("postType")} // Only register the radio button
          />
          <span>❓ Ask a Question</span>
        </label>
      </div>

      {/* Textarea for Post Content */}
      <div className="p-4">
        <textarea
          {...register("content", { required: true })} // Register the textarea for content
          className="w-full p-3 border border-gray-600 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Share your thoughts..."
        ></textarea>
        {errors.content && <span className="text-red-500">Content is required</span>} {/* Validation error */}
      </div>

      {/* Submit & Cancel Buttons */}
      <DrawerFooter className="px-4">
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white w-[200px] md:w-xl mx-auto py-2 rounded-lg cursor-pointer"
          onClick={handleSubmit(onSubmit)} // Handle form submit
        >
          Post
        </Button>
        <DrawerClose asChild>
          <Button className="w-[200px] md:w-xl mx-auto py-2 mt-2 bg-red-600 hover:bg-red-700">
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
}
