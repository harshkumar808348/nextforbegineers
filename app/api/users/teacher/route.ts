import { NextResponse } from "next/server";
import { connect } from "@/app/dbConfig/dbConfig";
import Teacher from "@/app/models/TeacherModel";

export async function POST(req: Request) {
  try {
    await connect();

    const body = await req.json();
    console.log("BODY:", body); // debug

    const teacher = await Teacher.create(body);

    return NextResponse.json({
      success: true,
      teacher,
    });

  } catch (error: any) {
    console.log("FULL ERROR:", error); // 🔴 must

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connect();
    const teachers = await Teacher.find();

    return NextResponse.json({ teachers });

  } catch (error: any) {
    console.log("GET ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}