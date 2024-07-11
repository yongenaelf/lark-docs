import { AnyItem } from "./renderer";

export interface Item {
  block_id: string;
  parent_id: string;
  allItems: AnyItem[];
}

export interface TextStyle {
  align: number;
  folded: boolean;
}

export { Element } from "./element";