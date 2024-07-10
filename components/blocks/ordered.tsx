import { Item, TextStyle, Element } from "./common";

export interface Ordered extends Item {
  block_type: 13;
  ordered: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

export function Ordered(props: Ordered) {
  return (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
      {props.ordered.elements.map((i, index) => (
        <li key={index}>{i.text_run.content}</li>
      ))}
    </ol>
  );
}
