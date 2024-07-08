import Link from "next/link";

export default function Admin() {
  return (
    <>
      <SignIn />
    </>
  );
}

async function SignIn() {
  "use client";

  return (
    <Link
      href={`https://open.larksuite.com/open-apis/authen/v1/authorize?app_id=${
        process.env.APP_ID
      }&redirect_uri=${
        process.env.REDIRECT_URI || "http://localhost:3000/redirect"
      }&scope=&state=`}
    >
      sign in
    </Link>
  );
}
