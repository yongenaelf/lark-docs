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

export interface Item {
  block_id: string;
  parent_id: string;
}

export interface TextStyle {
  align: number;
  folded: boolean;
}
