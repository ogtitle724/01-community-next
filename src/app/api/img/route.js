/* import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "ap-northeast-2",
});

const S3 = new AWS.S3();

export async function POST(request) {
  const data = await request.formData();
  const srcs = [];

  for (let [key, value] of data) {
    console.log(key, value);
    const params = {
      Bucket: "clipmarket-item",
      Key: key,
      Body: value,
      ContentType: value.type,
    };

    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        srcs.push(data.Location);
      }
    });
  }
  return Response.json("hi");
} */
import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const Region = process.env.AWS_REGION;
const Bucket = process.env.S3_BUCKET;
const s3 = new S3Client({
  region: Region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export async function POST(request) {
  const formData = await request.formData();
  const src = [];
  console.log(formData);

  try {
    for (let [name, value] of formData) {
      console.log(name, value);
      const Key = `item/${uuidv4()}`;
      const url = `https://${Bucket}.s3.${Region}.amazonaws.com/${Key}`;
      const Body = await value.arrayBuffer();
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
    return NextResponse.json({ message: `${err}` }, { status: 400 });
  }
}
