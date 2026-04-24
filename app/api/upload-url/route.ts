import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION || "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || "",
    secretAccessKey: process.env.AWS_SECRET_KEY || "",
  },
});

export async function POST(req: NextRequest) {
  try {
    const { fileName, fileType } = await req.json();

    if (!fileName || !fileType) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(fileType)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    const key = `resumes/${Date.now()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
    });

    const uploadUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
      signableHeaders: new Set(["host"]),
    });

    return NextResponse.json({
      uploadUrl,
      key,
    });
  } catch (error) {
    console.error("Upload URL API Error:", error);
    return NextResponse.json(
      { error: "Something went wrong", details: (error as Error).message },
      { status: 500 },
    );
  }
}
