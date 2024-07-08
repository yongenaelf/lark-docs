import Renderer, { AnyItem } from "@/components/renderer";

async function getData(id: string) {
  const res = await fetch(
    `https://open.larksuite.com/open-apis/docx/v1/documents/${id}/blocks?document_revision_id=-1&page_size=500`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.USER_TOKEN}`,
      },
      next: { revalidate: 1 },
    }
  );

  const { data } = await res.json();

  return data;
}

export default async function Document({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await getData(id);

  return (
    <main>
      {data.items.map((item: AnyItem) => (
        <Renderer key={item.block_id} {...item} />
      ))}
    </main>
  );
}
