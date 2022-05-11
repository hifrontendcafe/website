export interface DataEmailJs<T> {
  service_id: string;
  template_id: string;
  user_id: string;
  template_params?: T;
  accessToken?: string;
}

export default async function sendEmailJS<T>(
  dataEmailJs: DataEmailJs<T>,
): Promise<Response> {
  return await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    body: JSON.stringify(dataEmailJs),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
