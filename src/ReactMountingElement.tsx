import { createRoot } from "react-dom/client";
import { ReactElement } from "react";

export abstract class ReactMountingElement extends HTMLElement {
  abstract readonly component: (props: any) => ReactElement;
  readonly #root = createRoot(this);

  constructor() {
    super();
    this.style.display = "contents";
  }

  connectedCallback() {
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
    this.attributes;
    const Component = this.component;
    this.attributes.getNamedItem;
    const props = JSON.parse(
      this.attributes.getNamedItem("props")?.value ?? "{}"
    );
    this.#root.render(<Component {...props} />);
  }
  #unmount() {
    this.#root.unmount();
  }
}
