export async function getApiResponse(subUrl: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${subUrl}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
    };

    const response = await fetch(url, options);
    const data = response.ok ? await response.json() : Promise.reject(response);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
