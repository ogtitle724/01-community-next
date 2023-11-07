import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const Region = process.env.AWS_REGION;
const Bucket = process.env.S3_BUCKET;
const s3 = new S3Client({
  region: Region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY_ID,
  },
});

export async function POST(request) {
  const formData = await request.formData();
  const src = [];

  try {
    for (let [name, value] of formData) {
      console.log(name, value);
      const Key = `${uuidv4()}`;
      const url = `https://${Bucket}.s3.${Region}.amazonaws.com/${Key}`;
      const Body = value;
      const putParams = {
        Bucket,
        Key,
        Body,
      };
      console.log(putParams);
      s3.send(new PutObjectCommand(putParams));
      src.push(url);
      console.log("img upload!");
    }

    return NextResponse.json({ data: src }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: `${err}` }, { status: 400 });
  }
}
