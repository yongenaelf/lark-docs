import { Item, TextStyle, Element } from "./common";

export interface Text extends Item {
  block_type: 2;
  text: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

export function Text(props: Text) {
  return (
    <p className="leading-7 [&:not(:first-child)]:mt-6">
      {props.text.elements[0].text_run.content}
    </p>
  );
}
