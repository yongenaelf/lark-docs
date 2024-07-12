"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import type { MenuProps } from "antd";
import { Menu, ConfigProvider } from "antd";
import { NodesData, NodesItem } from "../../services/larkServices";
import { useEffect, useState } from "react";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import {
  findKeyInData,
  findPathByKey,
  findTopLevelItems,
} from "../../lib/utils";
import "./index.css";

interface Props {
  menu: NodesData;
}

const MenuItem = ({ item }: { item: NodesItem }) => {
  return (
    <li>
      {item.title}
      {item.has_child && item.children?.length > 0 && (
        <ul>
          {item.children.map(ele => {
            return ele.items.map(element => {
              return <MenuItem key={element.node_token} item={element} />;
            });
          })}
        </ul>
      )}
    </li>
  );
};

type MenuItem = Required<MenuProps>["items"][number];
export default function Sidebar({ menu }: Props) {
  const params = useParams();
  const { id } = params;
  const [isKeyInMenu, setisKeyInMenu] = useState(
    findKeyInData(menu, id as string)
  );
  let temp: any = {};
  temp.items = findTopLevelItems(menu, id as string);
  const [openKeys, setOpenKeys] = useState(
    findPathByKey(temp, id as string)?.map(ele => ele.node_token)
  );
  // click icon to open or close submenu
  const onIconClick = ({ key }: { key: string }) => {
    if (openKeys.includes(key)) {
      setOpenKeys(openKeys.filter(openKey => openKey !== key));
    } else {
      setOpenKeys([...openKeys, key]);
    }
  };
  // not use the original open/close
  const renderTitle = (title: string, key: string, hasChild: boolean) => (
    <div className="flex items-center justify-between">
      <Link href={`/node/${key}`} className="w-[90%]">
        <span>{title}</span>
      </Link>
      {hasChild &&
        (openKeys.includes(key) ? (
          <DownOutlined
            onClick={e => {
              e.stopPropagation();
              onIconClick({ key });
            }}
          />
        ) : (
          <RightOutlined
            onClick={e => {
              e.stopPropagation();
              onIconClick({ key });
            }}
          />
        ))}
    </div>
  );

  // convert to menu items format
  const getMenuList = (data: NodesData) => {
    const items = data.items;
    const arr = [];
    for (let i = 0; i < items?.length; i++) {
      let obj: any = {
        key: items[i].node_token,
        label: renderTitle(
          items[i].title,
          items[i].node_token,
          items[i].has_child
        ),
      };
      if (!items[i].children.length) {
        obj.children = null;
      }
      for (let j = 0; j < items[i].children.length; j++) {
        obj.children = getMenuList(items[i].children[j]);
      }
      arr.push(obj);
    }
    return arr;
  };
  const menuItems: MenuItem[] = getMenuList(temp);

  useEffect(() => {
    const keyFlag = findKeyInData(menu, id as string);
    setisKeyInMenu(keyFlag);
    if (keyFlag) {
      const defaultOpenKeys = findPathByKey(temp, id as string)?.map(
        ele => ele.node_token
      );
      setOpenKeys(defaultOpenKeys!);
    }
  }, [id]);

  return (
    <>
      {isKeyInMenu ? (
        <aside className="z-30 pl-2 shrink-0 top-[46px] block max-w-[300px] h-[calc(100vh-46px)]">
          <ConfigProvider
            theme={{
              token: {
                colorLink: "#000",
              },
              components: {
                Menu: {
                  subMenuItemBg: "#fff",
                  itemSelectedBg: "#fff",
                },
              },
            }}
          >
            <Menu
              className="h-full"
              openKeys={openKeys}
              defaultOpenKeys={openKeys}
              inlineCollapsed={false}
              style={{ width: 256 }}
              selectedKeys={[id]}
              mode="inline"
              items={menuItems}
              expandIcon={null}
            />
          </ConfigProvider>
        </aside>
      ) : (
        <></>
      )}
    </>
  );
}
