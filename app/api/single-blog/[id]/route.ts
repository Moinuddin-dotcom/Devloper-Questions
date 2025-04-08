// import { PATCH } from './route';
import { authOptions } from "@/lib/authOptions"
import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"


export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const p = await params
    const blogCollection = dbConnect(collectionNameObj.blogCollection)
    const query = { _id: new ObjectId(p.id) }
    const singleBlog = await blogCollection.findOne(query)
    return NextResponse.json(singleBlog)
}

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const p = await params;
    const query = { _id: new ObjectId(p.id) };
    const blogCollection = dbConnect(collectionNameObj.blogCollection);
    const currentBlog = await blogCollection.findOne(query)
    const session = await getServerSession(authOptions)
    const isOwnerOk = session?.user?.email === currentBlog?.email
    if (isOwnerOk) {
        const deleteBlog = await blogCollection.deleteOne(query)
        revalidatePath("/")
        return NextResponse.json(deleteBlog)
    } else {
        return NextResponse.json({ message: "You are not authorized to delete the question" }, { status: 401 })
    }
}


