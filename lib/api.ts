export const fetcher = async (url: string) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.USER_TOKEN}`,
    },
    // next: { revalidate: 1 },
  });
  return res.json();
};
