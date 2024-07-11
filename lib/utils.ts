import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { NodesData, NodesItem } from "../services/larkServices";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function findTopLevelItems(data: NodesData, key: string) {
  function search(items: NodesItem[], key: string) {
    for (let item of items) {
      if (item.node_token === key) {
        return true;
      }
      if (item.children) {
        for (let child of item.children) {
          if (search(child.items || [], key)) {
            return true;
          }
        }
      }
    }
    return false;
  }
  for (let item of data.items || []) {
    if (search([item], key)) {
      return [item];
    }
  }
  return null;
}
export function findPathByKey(data: NodesData, key: string) {
  let path: NodesItem[] = [];

  function find(items: NodesItem[]) {
    for (let item of items) {
      if (item.node_token === key) {
        path.push(item);
        return true;
      } else if (item.has_child && item.children.length > 0) {
        for (let child of item.children) {
          if (find(child.items || [])) {
            path.unshift(item); // Add item to the beginning of path array
            return true;
          }
        }
      }
    }
    return false;
  }
  find(data.items || []);
  return path.length > 0 ? path : null;
}
