// import { authOptions } from "@/lib/authOptions"
import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
// import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

// Getting all question collection data
export const GET = async () => {
    // const session = await getServerSession(authOptions)
    // if (session) {
    // const email = session?.user?.email // Uncomment this line if you need the email for filtering
    const questionCollection = await dbConnect(collectionNameObj.questionCollection)
    const result = await questionCollection.find({}).toArray()
    return NextResponse.json(result)
    // }

    // return NextResponse.json({})
}

// Posting to questionCollection
export const POST = async (req) => {
    const body = await req.json()
    const questionCollection = await dbConnect(collectionNameObj.questionCollection)
    const result = await questionCollection.insertOne(body)
    return NextResponse.json(result)
}
