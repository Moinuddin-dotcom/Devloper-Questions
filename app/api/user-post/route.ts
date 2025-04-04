import { authOptions } from "@/lib/authOptions"
import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const GET = async () => {
    const session = await getServerSession(authOptions)
    if (session) {
        const email = session?.user?.email
        const postCollection = dbConnect(collectionNameObj.postCollection)
        const result = await postCollection.find({ email }).toArray()
        return NextResponse.json(result)
    }

    return NextResponse.json({})
}


export const POST = async (req: Request) => {

    const body = await req.json()
    const postCollection = dbConnect(collectionNameObj.postCollection)
    const result = await postCollection.insertOne(body)
    return NextResponse.json(result)
}