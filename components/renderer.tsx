import Code from "@/components/code";

interface Element {
  text_run: {
    content: string;
    text_element_style: {
      bold: boolean;
      inline_code: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
    };
  };
}

interface Item {
  block_id: string;
  parent_id: string;
}

interface Code extends Item {
  block_type: 14;
  code: {
    elements: Array<Element>;
    style: {
      language: number;
      wrap: boolean;
    };
  };
}

interface TextStyle {
  align: number;
  folded: boolean;
}

interface Text extends Item {
  block_type: 2;
  text: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

interface Heading1 extends Item {
  block_type: 3;
  heading1: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

interface Heading3 extends Item {
  block_type: 5;
  heading3: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

interface Heading4 extends Item {
  block_type: 6;
  heading4: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

interface OrderedList extends Item {
  block_type: 13;
  ordered: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

interface BulletList extends Item {
  block_type: 12;
  bullet: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

export type AnyItem =
  | Code
  | Text
  | Heading1
  | Heading3
  | Heading4
  | OrderedList
  | BulletList;

export default function Renderer(props: AnyItem) {
  switch (props.block_type) {
    case 2:
      return (
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          {props.text.elements[0].text_run.content}
        </p>
      );

    case 3:
      return (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {props.heading1.elements[0].text_run.content}
        </h1>
      );

    case 5:
      return (
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {props.heading3.elements[0].text_run.content}
        </h3>
      );

    case 6:
      return (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {props.heading4.elements[0].text_run.content}
        </h4>
      );

    case 12:
      return (
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          {props.bullet.elements.map((i, index) => (
            <li key={index}>{i.text_run.content}</li>
          ))}
        </ul>
      );

    case 13:
      return (
        <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
          {props.ordered.elements.map((i, index) => (
            <li key={index}>{i.text_run.content}</li>
          ))}
        </ol>
      );

    case 14:
      return (
        <Code
          code={props.code.elements.map((i) => i.text_run.content).join("")}
          language={props.code.style.language}
        />
      );

    default:
      return <></>;
  }
}
