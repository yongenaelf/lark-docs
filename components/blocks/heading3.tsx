import { Item, TextStyle, Element } from "./common";

export interface Heading3 extends Item {
  block_type: 5;
  heading1: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

export function Heading3(props: Heading3) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {props.heading1.elements[0].text_run.content}
    </h1>
  );
}
