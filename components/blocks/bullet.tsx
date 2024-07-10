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
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      {props.bullet.elements.map((i, index) => (
        <li key={index}>{i.text_run.content}</li>
      ))}
    </ul>
  );
}
