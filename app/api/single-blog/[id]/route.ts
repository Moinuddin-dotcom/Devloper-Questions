// import { PATCH } from './route';
import { authOptions } from "@/lib/authOptions"
import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
// import { getRouteParam } from "@/utils/getRouteParam"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"


export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const id = params.id
    // const id = getRouteParam(req, '/api/single-blog/:id', 'id')
    // if (!id) return NextResponse.json({ message: "Invalid request" }, { status: 400 })
    const blogCollection = dbConnect(collectionNameObj.blogCollection)
    // const query = { _id: new ObjectId(p.id) }
    const singleBlog = await (await blogCollection).findOne({ _id: new ObjectId(id) })
    return NextResponse.json(singleBlog)
}

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const id = params.id
    // const query = { _id: new ObjectId(p.id) };
    // const id = getRouteParam(req, '/api/single-blog/:id', 'id')
    // if (!id) return NextResponse.json({ message: "Invalid request" }, { status: 400 })
    const blogCollection = dbConnect(collectionNameObj.blogCollection);
    const currentBlog = await (await blogCollection).findOne({ _id: new ObjectId(id) })
    const session = await getServerSession(authOptions)
    const isOwnerOk = session?.user?.email === currentBlog?.email
    if (isOwnerOk) {
        const deleteBlog = await (await blogCollection).deleteOne({ _id: new ObjectId(id) })
        revalidatePath("/")
        return NextResponse.json(deleteBlog)
    } else {
        return NextResponse.json({ message: "You are not authorized to delete the question" }, { status: 401 })
    }
}


