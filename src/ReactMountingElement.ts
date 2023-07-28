import { createRoot } from "react-dom/client";
import { createElement, type ReactElement } from "react";

export abstract class ReactMountingElement extends HTMLElement {
  abstract readonly component: (props: any) => ReactElement;
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
    this.attributes;
    const Component = this.component;
    const props = JSON.parse(
      this.attributes.getNamedItem("props")?.value ?? "{}"
    );
    this.#root.render(createElement(this.component, props));
  }
  #unmount() {
    this.#root.unmount();
  }
}
