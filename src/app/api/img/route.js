import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
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
  const files = await request.json();

  const posts = await Promise.all(
    files.map((file) => {
      return createPresignedPost(s3, {
        Bucket,
        Key: file.key,
        Condition: [
          { acl: "public-read" },
          { "Content-Type": file.contentType },
        ],
        Expires: 60,
      });
    })
  );
  console.log(posts);
  return NextResponse.json(posts);
  /* const formData = await request.formData();
  const src = [];

  try {
    for (let [name, value] of formData) {
      const date = new Date();
      const day = JSON.stringify(date).slice(1, 11);
      console.log(day);
      const Key = `items/images/${day}/${uuidv4()}`;
      const url = `https://${Bucket}.s3.${Region}.amazonaws.com/${Key}`;
      const Body = await value.arrayBuffer();
      console.log(Body);
      const putParams = {
        Bucket,
        Key,
        Body,
      };

      s3.send(new PutObjectCommand(putParams));
      src.push(url);
    }

    return NextResponse.json({ data: src }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: `${err}` }, { status: 400 });
  }*/
}
