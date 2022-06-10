const baseUrl = process.env.NEXT_PUBLIC_CALOMENTOR_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_CALOMENTOR_API_KEY ?? '';

const headers: HeadersInit = new Headers();
headers.set('x-api-key', apiKey);

function get(url: string): Promise<Response> {
  return fetch(url, {
    method: 'GET',
    headers,
  });
}

export function getWarningsById(id: string): Promise<Response> {
  return get(`${baseUrl}/warning/${id}?all_warnings=true`);
}
