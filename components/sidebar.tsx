import Link from "next/link";

interface Data {
  files: [
    {
      created_time: string;
      modified_time: string;
      name: string;
      owner_id: string;
      parent_token: string;
      token: string;
      type: string;
      url: string;
    }
  ];
  has_more: boolean;
}

async function getData() {
  const res = await fetch(
    `https://open.larksuite.com/open-apis/drive/v1/files?direction=DESC&folder_token=${process.env.FOLDER_TOKEN}&order_by=EditedTime`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.USER_TOKEN}`,
      },
      next: { revalidate: 1 },
    }
  );

  const { data } = await res.json();

  return data as Data;
}

export default async function Sidebar() {
  const data = await getData();

  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
      <Link href="/">Index</Link>
      {data.files.map((i) => (
        <p key={i.token}>
          <Link href={`/${i.token}`}>{i.name}</Link>
        </p>
      ))}
    </aside>
  );
}
