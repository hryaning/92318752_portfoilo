
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
    const client = await clientPromise;
    await client.db("portfolio").command({ ping: 1 });

    return NextResponse.json({
        success: true,
        message: "MongoDB 연결 성공!",
    });
    } catch (error) {
    console.error("MongoDB 연결 오류:", error);

    return NextResponse.json(
        {
        success: false,
        message: "MongoDB 연결 실패. 터미널 오류를 확인해 줘.",
        },
        { status: 500 },
    );
    }
}
