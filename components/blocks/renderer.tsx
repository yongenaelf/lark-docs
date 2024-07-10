import { Heading1 } from "./heading1";
import { Heading3 } from "./heading3";
import { Text } from "./text";
import { Heading4 } from "./heading4";
import { Bullet } from "./bullet";
import { Ordered } from "./ordered";
import { Code } from "./code";

export type AnyItem =
  | Code
  | Text
  | Heading1
  | Heading3
  | Heading4
  | Ordered
  | Bullet;

export default function Renderer(props: AnyItem) {
  switch (props.block_type) {
    case 2:
      return <Text {...props} />;

    case 3:
      return <Heading1 {...props} />;

    case 5:
      return <Heading3 {...props} />;

    case 6:
      return <Heading4 {...props} />;

    case 12:
      return <Bullet {...props} />;

    case 13:
      return <Ordered {...props} />;

    case 14:
      return <Code {...props} />;

    default:
      return <></>;
  }
}
