import {
	S3Client,
	PutObjectCommand,
	ListObjectsV2Command,
	DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { toast } from 'sonner';

export class YandexService {
	static s3 = new S3Client({
		region: 'ru-central1',
		endpoint: 'https://storage.yandexcloud.net',
		credentials: {
			accessKeyId: 'YCAJEW5b_ovJeacpS-hdNtRl0',
			// accessKeyId: import.meta.env['VITE_CLOUD_ACCESS'] || '',
			secretAccessKey: 'YCOr-Hi4mpwJwIaIH3NiWg0xMsw17VpGilCCFr_G',
			// secretAccessKey: import.meta.env['VITE_CLOUD_SECRET'] || '',
		},
	});

	static Bucket = 'documnet';
	// static Bucket = import.meta.env['VITE_CLOUD_BUCKET'] || '';

	static async upload(uuid, document, file) {
		const { Bucket, s3 } = this;

		try {
			const params = {
				Bucket,
				Key: `${uuid}/${document}-${file.name}`,
				ContentType: file.type,
				Body: file,
			};

			return s3.send(new PutObjectCommand(params));
		} catch (error) {
			toast.error(String(error));
		}
	}

	static async uploadMultiple(uuid, document, files) {
		try {
			const uploadPromises = files.map(file => this.upload(uuid, document, file));
			await Promise.all(uploadPromises);
		} catch (error) {
			toast.error(String(error));
		}
	}

	static async getByClient(uuid) {
		const { Bucket, s3 } = this;

		const params = {
			Bucket,
			Prefix: uuid,
		};

		try {
			const data = await s3.send(new ListObjectsV2Command(params));
			console.log('data', data);

			return this.generateUrlsWithMainFirst(data);
		} catch (error) {
			toast.error(String(error));
		}
	}

	static async delete(uuid) {
		const { Bucket, s3 } = this;

		const params = {
			Bucket,
			Key: uuid,
		};

		try {
			await s3.send(new DeleteObjectCommand(params));
			return;
		} catch (error) {
			toast.error(String(error));
		}
	}

	static generateUrlsWithMainFirst(data) {
		const { Contents } = data || {};
		const { Bucket } = this;

		return Contents?.map(link => ({
			link: `https://${Bucket}.storage.yandexcloud.net/${link.Key}`,
			name: link.Key?.substring(link.Key.indexOf('/') + 1),
			date: link.LastModified,
		}));
	}
}