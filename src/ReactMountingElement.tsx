import { Root, createRoot } from "react-dom/client";
import { ReactElement } from "react";

export abstract class ReactMountingElement extends HTMLElement {
  abstract component: (props: any) => ReactElement;
  #root!: Root;

  constructor() {
    super();
    this.style.display = "contents";
  }

  connectedCallback() {
    this.#root = createRoot(this);
    this.mount();
  }

  disconnectedCallback() {
    this.unmount();
  }

  attributeChangedCallback() {
    this.update();
  }

  update() {
    this.unmount();
    this.mount();
  }

  mount() {
    this.attributes;
    const Component = this.component;
    const props = JSON.parse(
      [...this.attributes].find((attribute) => attribute.name === "props")
        ?.value ?? "{}"
    );
    this.#root.render(<Component {...props} />);
  }
  unmount() {
    this.#root.unmount();
  }
}
