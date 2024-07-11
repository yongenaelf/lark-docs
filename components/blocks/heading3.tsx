import { key } from "@/lib/utils";
import { Item, TextStyle, Element } from "./common";

export interface Heading3 extends Item {
  block_type: 5;
  heading3: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

export function Heading3(props: Heading3) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {props.heading3.elements.map((i) => (
        <Element key={key()} {...i} />
      ))}
    </h3>
  );
}
