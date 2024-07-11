import { key } from "@/lib/utils";
import { Item, TextStyle, Element } from "./common";

export interface Heading1 extends Item {
  block_type: 3;
  heading1: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

export function Heading1(props: Heading1) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {props.heading1.elements.map((i) => (
        <Element key={key()} {...i} />
      ))}
    </h1>
  );
}
