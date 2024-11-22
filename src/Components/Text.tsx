import type { JSX, ParentComponent } from "solid-js";
import { splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

export type TextVariants =
  | "heading-3xl"
  | "heading-2xl"
  | "heading-xl"
  | "heading-lg"
  | "heading-md"
  | "heading-sm"
  | "body-lg"
  | "body-md"
  | "body-sm"
  | "body-xs"
  | "body-2xs"
  | "body-lg-medium"
  | "body-md-medium"
  | "body-sm-medium"
  | "body-xs-medium"
  | "body-2xs-medium"
  | "body-lg-bold"
  | "body-md-bold"
  | "body-sm-bold"
  | "body-xs-bold"
  | "body-2xs-bold";

export type Headings = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type Tags = Headings | "span" | "p" | "div";

export interface Props extends JSX.HTMLAttributes<HTMLHeadingElement> {
  variant: TextVariants;
  tag?: Tags;
  text?: string;
}

const Text: ParentComponent<Props> = (_props) => {
  const [props, restProps] = splitProps(_props, [
    "tag",
    "variant",
    "children",
    "classList",
    "text",
  ]);

  const getVariantClasses = () => {
    return {
      "heading-3xl": "heading-3xl",
      "heading-2xl": "heading-2xl",
      "heading-xl": "heading-xl",
      "heading-lg": "heading-lg",
      "heading-md": "heading-md",
      "heading-sm": "heading-sm",
      "body-lg": "body-lg",
      "body-md": "body-md",
      "body-sm": "body-sm",
      "body-xs": "body-xs",
      "body-2xs": "body-2xs",
      "body-lg-medium": "body-lg-medium",
      "body-md-medium": "body-md-medium",
      "body-sm-medium": "body-sm-medium",
      "body-xs-medium": "body-xs-medium",
      "body-2xs-medium": "body-2xs-medium",
      "body-lg-bold": "body-lg-bold",
      "body-md-bold": "body-md-bold",
      "body-sm-bold": "body-sm-bold",
      "body-xs-bold": "body-xs-bold",
      "body-2xs-bold": "body-2xs-bold",
    }[props.variant];
  };

  const getVariantToTag = () => {
    return {
      "heading-3xl": "h1",
      "heading-2xl": "h2",
      "heading-xl": "h3",
      "heading-lg": "h4",
      "heading-md": "h5",
      "heading-sm": "h6",
    }[props.variant as string];
  };

  return (
    <Dynamic
      component={props.tag || getVariantToTag() || "p"}
      classList={{
        [getVariantClasses()]: !!props.variant,
        ...props.classList,
      }}
      {...restProps}
    >
      {props.children || props.text}
    </Dynamic>
  );
};

export { Text };
