import { NextResponse } from "next/server";
import { S3Client } from "@aws-sdk/client-s3";
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
  //이미지 key, type값 수신
  const files = await request.json();

  //복수의 이미지 key, type 데이터와 promise.all을 통해 presignedPost생성
  const posts = await Promise.all(
    files.map((file) => {
      const date = new Date();
      const day = JSON.stringify(date).slice(1, 11);
      const Key = `items/images/${day}/${uuidv4()}`;

      return createPresignedPost(s3, {
        Bucket,
        Key,
        Conditions: [
          ["content-length-range", 0, 50 * 1000 * 1000], // 0 ~ 50MB
          ["starts-with", "$Content-Type", "image/"],
        ],
        Expires: 500,
      });
    })
  );
  //각 presignedPost는 key, field attr를 보유
  const res = NextResponse.json(posts);
  return res;
}
