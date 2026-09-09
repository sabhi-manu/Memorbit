const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3client = require("./awsS3.config");


const generateSignedUrl = async (key)=>{
    if(!key) return null;

    const command =  new GetObjectCommand({
       Bucket: process.env.AWS_BUCKET_NAME,
        Key:key
    })

   const expiresIn = parseInt(process.env.SIGNED_URL_EXPIRY, 10) || 3600; 

  return await getSignedUrl(s3client, command, { expiresIn });

}

module.exports = generateSignedUrl