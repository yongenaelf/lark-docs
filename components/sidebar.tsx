import Link from "next/link";

interface NodesData {
  has_more: boolean;
  items: NodesItem[];
  page_token: string;
}

interface NodesItem {
  creator: string;
  has_child: boolean;
  node_create_time: string;
  node_token: string;
  node_type: string;
  obj_create_time: string;
  obj_edit_time: string;
  obj_token: string;
  obj_type: string;
  origin_node_token: string;
  origin_space_id: string;
  owner: string;
  parent_node_token: string;
  space_id: string;
  title: string;
  children: NodesData[];
}
// get the list of child nodes
async function getNodeToken(token?: string) {
  const res = await fetch(
    `https://open.larksuite.com/open-apis/wiki/v2/spaces/${
      process.env.SPACE_ID
    }/nodes?parent_node_token=${token ? token : ""}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.USER_TOKEN}`,
      },
      next: { revalidate: 1 },
    }
  );

  const { data } = await res.json();
  return data as NodesData;
}

async function getFileByFolderToken(folderNodes?: NodesItem[]) {
  let data, items;
  if (!folderNodes) {
    data = await getNodeToken();
    items = data.items;
  } else {
    items = folderNodes;
  }

  for (let i = 0; i < items.length; i++) {
    if (!items[i].children) {
      items[i].children = [];
    }
    if (items[i].has_child) {
      const child = (await getNodeToken(items[i].node_token)) as NodesData;
      items[i].children?.push(child);
      await getFileByFolderToken(child.items);
    }
  }
  return data as NodesData;
}

async function getData() {
  const data = await getFileByFolderToken();
  return data;
}
const MenuItem = ({ item }: { item: NodesItem }) => {
  return (
    <li>
      <Link href={`/node/${item.node_token}`}>{item.title}</Link>
      {item.has_child && item.children?.length > 0 && (
        <ul>
          {item.children.map((ele) => {
            return ele.items.map((element) => {
              return <MenuItem item={element} />;
            });
          })}
        </ul>
      )}
    </li>
  );
};
export default async function Sidebar() {
  const data = await getData();

  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
      <Link href="/">Index</Link>
      <ul>
        {data.items.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </ul>
    </aside>
  );
}
