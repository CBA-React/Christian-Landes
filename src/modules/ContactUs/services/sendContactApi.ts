import { axiosInstance } from '@/shared/lib/axiosInstance';
import { ContactFormValues } from '../components/ContactForm';

export async function sendContact(data: ContactFormValues): Promise<any> {
	const res = await axiosInstance.post<any>('website/sendContactUs', {
		full_name: data.name,
		...data,
	});

	return res.data;
}

