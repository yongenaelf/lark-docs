import {
  Tabs as TabsLib,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Item } from "./common";
import Renderer from "./renderer";

export interface Tabs extends Item {
  block_type: 24;
  children: string[];
  grid: {
    column_size: number;
  };
}

export interface Tab extends Item {
  block_type: 25;
  children: string[];
  grid_column: {
    width_ratio: number;
  };
}

export function Tabs(props: Tabs) {
  const allChildren = props.allItems.filter((i) =>
    props.children.includes(i.block_id)
  ) as Tab[];

  const getFirstItem = (id: string) => {
    const firstId = (props.allItems.find((i) => i.block_id === id) as Tab)
      .children[0];

    const firstItem = props.allItems.find((i) => i.block_id === firstId);

    if (firstItem?.block_type === 2) {
      return firstItem;
    }

    return undefined;
  };

  const getAllTabChildrenExceptFirst = (id: string) => {
    const allChildren = (props.allItems.find((i) => i.block_id === id) as Tab)
      .children;

    const allItems = props.allItems
      .filter((i) => allChildren.includes(i.block_id))
      .slice(1);

    return allItems;
  };

  return (
    <TabsLib defaultValue="account" className="mt-8">
      <TabsList>
        {allChildren.map((i, index) => {
          const value =
            getFirstItem(i.block_id)?.text.elements?.[0].text_run.content ||
            `Tab ${index}`;
          return (
            <TabsTrigger key={i.block_id} value={value}>
              {value}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {allChildren.map((i, index) => {
        const allChildren = getAllTabChildrenExceptFirst(i.block_id);
        const value =
          getFirstItem(i.block_id)?.text.elements?.[0].text_run.content ||
          `Tab ${index}`;

        return (
          <TabsContent
            value={value}
            className="rounded-md border px-4 pb-2 mb-8"
          >
            {allChildren?.map((i) => (
              <Renderer
                key={i.block_id}
                {...i}
                allItems={props.allItems}
                nested
              />
            ))}
          </TabsContent>
        );
      })}
    </TabsLib>
  );
}
