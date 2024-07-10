export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  const res = await fetch(
    `https://open.larksuite.com/open-apis/drive/v1/medias/batch_get_tmp_download_url?file_tokens=${token}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.USER_TOKEN}`,
      },
    }
  );

  const {
    data,
  }: {
    code: number;
    data: {
      tmp_download_urls: {
        file_token: string;
        tmp_download_url: string;
      }[];
    };
  } = await res.json();

  console.log(data);

  return Response.json({ link: data.tmp_download_urls[0].tmp_download_url });
}
