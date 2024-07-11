"use client";
import { useEffect, useState } from "react";
import { NodesData } from "../../services/larkServices";
import { HomeOutlined } from "@ant-design/icons";
import { useParams } from "next/navigation";
import { findTopLevelItems, findPathByKey } from "../../lib/utils";
import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";

interface Props {
  menu: NodesData;
}
export default function BreadcrumbComponent({ menu }: Props) {
  const params = useParams();
  const { id } = params;
  const home = {
    href: "",
    title: <HomeOutlined />,
  };
  const [items, setItems] = useState([] as ItemType[]);
  useEffect(() => {
    let temp: any = {};
    temp.items = findTopLevelItems(menu, id as string);
    const pathArr = findPathByKey(temp, id as string);
    const itemList: ItemType[] = pathArr?.map(ele => {
      let obj: any = {};
      obj.href = `/node/${ele.node_token}`;
      obj.title = <span>{ele.title}</span>;
      return obj;
    })!;
    console.log([home, ...(itemList || [])], "[home, ...itemList]");
    setItems([home, ...(itemList || [])]);
  }, [id]);
  return <Breadcrumb items={items}></Breadcrumb>;
}
