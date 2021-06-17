import { uploadFile } from 'react-s3';
import S3, { ObjectIdentifierList } from 'aws-sdk/clients/s3';
import { PictureUploadedInfo } from '../Types';
import { PictureManagerInterface } from './PictureManagerInterface';

require('dotenv').config();

class Aws implements PictureManagerInterface {
  constructor(
    readonly region?: string,
    readonly accessKeyId?: string,
    readonly secretAccessKey?: string,
  ) {}

  uploadImage = async (username: string, file: File) => {
    const config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      dirName: username,
      region: this.region,
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
    };
    let picData: PictureUploadedInfo = { location: '' };
    await uploadFile(file, config)
      .then((data: PictureUploadedInfo) => (picData = data))
      .catch((err) => console.error(err));

    return picData;
  };

  uploadWebcamImage = async (username: string, file: string) => {
    let location = '';
    if (process.env.REACT_APP_BUCKET_NAME) {
      const base64Data = Buffer.from(
        file.replace(/^data:image\/\w+;base64,/, ''),
        'base64',
      );
      const type = file.split(';')[0].split('/')[1];
      const date = new Date(Date.now()).getTime();
      const bucket = this.getS3Bucket();
      const params = {
        Bucket: process.env.REACT_APP_BUCKET_NAME,
        Key: `${username}/${date}`,
        Body: base64Data,
        ContentEncoding: 'base64',
        ContentType: `image/${type}`,
      };
      try {
        const { Location } = await bucket.upload(params).promise();
        location = Location;
      } catch (error) {
        console.log(error);
      }
    }
    return location;
  };

  deleteImage = async (username: string, url: string) => {
    if (process.env.REACT_APP_BUCKET_NAME) {
      const filename = this.getFilenameFromUrl(url);
      const bucket = this.getS3Bucket();
      const params = {
        Bucket: process.env.REACT_APP_BUCKET_NAME,
        Key: `${username}/${filename}`,
      };
      await bucket.deleteObject(params).promise();
    }
  };

  deleteUserFolder = async (username: string) => {
    if (process.env.REACT_APP_BUCKET_NAME) {
      const bucket = this.getS3Bucket();
      const lstParams = {
        Bucket: process.env.REACT_APP_BUCKET_NAME,
        Prefix: `${username}/`,
      };

      const objects: ObjectIdentifierList = [];
      const deleteParams = {
        Bucket: process.env.REACT_APP_BUCKET_NAME,
        Delete: { Objects: objects },
      };

      const pictures = await bucket.listObjectsV2(lstParams).promise();

      if (pictures.Contents && pictures.Contents.length > 0) {
        pictures.Contents.forEach((element) => {
          if (element.Key) {
            deleteParams.Delete.Objects.push({ Key: element.Key });
          }
        });

        await bucket.deleteObjects(deleteParams).promise();
      }
    }
  };

  private getFilenameFromUrl = (url: string) => {
    const start = url.lastIndexOf('/');
    const filename = url.substring(start + 1, url.length);
    return filename;
  };

  private getS3Bucket() {
    return new S3({
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
      region: this.region,
    });
  }
}

const instance: PictureManagerInterface = new Aws(
  process.env.REACT_APP_REGION,
  process.env.REACT_APP_ACCESS_KEY,
  process.env.REACT_APP_SECRET_KEY,
);
export default instance;
