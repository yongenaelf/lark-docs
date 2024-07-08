"use server";

async function getAppAccessToken() {
  const res = await fetch(
    `https://open.larksuite.com/open-apis/auth/v3/app_access_token/internal`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        app_id: process.env.APP_ID,
        app_secret: process.env.APP_SECRET,
      }),
    }
  );

  const data: {
    code: number;
    msg: string;
    app_access_token: string;
    expire: number;
  } = await res.json();

  if (data.code !== 0) {
    throw new Error("Unable to get app access token.");
  }

  return data.app_access_token;
}

async function getUserAccessToken(code: string) {
  const res = await fetch(
    `https://open.larksuite.com/open-apis/authen/v1/oidc/access_token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${await getAppAccessToken()}`,
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
      }),
    }
  );

  const data: {
    code: number;
    msg: string;
    data: {
      access_token: string;
      refresh_token: string;
      token_type: "Bearer";
      expires_in: number;
      refresh_expires_in: number;
      scope: string;
    };
  } = await res.json();

  console.log(data);

  if (data.code !== 0) {
    throw new Error("Unable to get user access token.");
  }

  return data.data.access_token;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    throw new Error("no code in search params");
  }

  return Response.json({ token: await getUserAccessToken(code) });
}
