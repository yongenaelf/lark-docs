"use client";
import { useEffect, useState } from "react";
import { NodesData } from "../../services/larkServices";
import { HomeOutlined } from "@ant-design/icons";
import { useParams } from "next/navigation";
import {
  findTopLevelItems,
  findPathByKey,
  findKeyInData,
} from "../../lib/utils";
import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";

interface Props {
  menu: NodesData;
}
export default function BreadcrumbComponent({ menu }: Props) {
  const params = useParams();
  const { id } = params;
  const [isKeyInMenu, setisKeyInMenu] = useState(false);
  const home = {
    href: "/",
    title: <HomeOutlined />,
  };
  const [items, setItems] = useState([] as ItemType[]);
  useEffect(() => {
    const keyFlag = findKeyInData(menu, id as string);
    setisKeyInMenu(keyFlag);
    if (keyFlag) {
      let temp: any = {};
      temp.items = findTopLevelItems(menu, id as string);
      const pathArr = findPathByKey(temp, id as string);
      const itemList: ItemType[] = pathArr?.map(ele => {
        let obj: any = {};
        obj.href = `/node/${ele.node_token}`;
        obj.title = <span>{ele.title}</span>;
        return obj;
      })!;
      setItems([home, ...itemList]);
    }
  }, [id]);
  return (
    <>
      {isKeyInMenu ? (
        <div className="my-4">
          <Breadcrumb items={items}></Breadcrumb>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
