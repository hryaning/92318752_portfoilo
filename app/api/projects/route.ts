
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
    const client = await clientPromise;
    const db = client.db("portfolio");

    const projects = await db
        .collection("projects")
        .find({})
        .toArray();

    return NextResponse.json(projects);
    } catch (error) {
    console.error("프로젝트 조회 오류:", error);

    return NextResponse.json(
        { message: "프로젝트를 불러오지 못했어." },
        { status: 500 },
    );
    }
}
