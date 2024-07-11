import { clsx } from "clsx";

export interface Element {
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

export function Element(props: Element) {
  const { content, text_element_style } = props.text_run;
  const { bold, italic, strikethrough, underline, inline_code } =
    text_element_style;

  if (inline_code)
    return <pre className="inline p-1 bg-slate-300 rounded-md">{content}</pre>;

  return (
    <span
      className={clsx({
        "font-bold": bold,
        italic: italic,
        "line-through": strikethrough,
        underline: underline,
        inline: true,
      })}
    >
      {content}
    </span>
  );
}
