import AWS from "aws-sdk";

export const s3upload = async (bucketName, file) => {
  const S3_BUCKET = bucketName;
  const REGION = "ap-northeast-2";

  AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESSKEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRETKEY,
  });

  const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const params = {
    Bucket: S3_BUCKET,
    Key: file.name,
    Body: file,
  };

  var upload = s3
    .putObject(params)
    .on("httpUploadProgress", (evt) => {
      console.log(
        "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
      );
    })
    .promise();

  await upload.then((err, data) => {
    console.log(err);
    alert("File uploaded successfully.");
  });
};
