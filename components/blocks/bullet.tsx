import { key } from "@/lib/utils";
import { Item, TextStyle, Element } from "./common";

export interface Bullet extends Item {
  block_type: 12;
  bullet: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

export function Bullet(props: Bullet) {
  return (
    <li>
      {props.bullet.elements.map((i) => (
        <Element key={key()} {...i} />
      ))}
    </li>
  );
}
