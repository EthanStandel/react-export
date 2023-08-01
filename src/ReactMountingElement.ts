import { createRoot } from "react-dom/client";
import { createElement, type ReactElement } from "react";

export abstract class ReactMountingElement<
  Props extends {}
> extends HTMLElement {
  abstract readonly component: (props: Props) => ReactElement;
  readonly #root = createRoot(this);

  connectedCallback() {
    this.style.display = "contents";
    this.#mount();
  }

  disconnectedCallback() {
    this.#unmount();
  }

  attributeChangedCallback() {
    this.#update();
  }

  #update() {
    this.#unmount();
    this.#mount();
  }

  #mount() {
    const props = {
      ...JSON.parse(this.attributes.getNamedItem("props")?.value ?? "{}"),
      children: createElement(Children, { innerHTML: this.innerHTML }),
    };
    // warning, this is inherently un-type safe unless we included
    // a validation step after the JSON.parse call with zod/yup/arktype
    // but that means that all of our prop types would need a runtime
    // validator
    //
    // this could be achieved by adding the validator as another
    // abstract property to this class if needed
    this.#root.render(createElement(this.component, props as Props));
  }
  #unmount() {
    this.#root.unmount();
  }
}

const Children = ({ innerHTML }: { innerHTML: string }) =>
  createElement("div", {
    dangerouslySetInnerHTML: { __html: innerHTML },
    style: { display: "contents" },
  });
