import { Counter } from "./Counter";
import kebabCase from "lodash/kebabCase";
import { ReactMountingElement } from "./ReactMountingElement";

// Add all react components here!
const reactElementsMap = { Counter };

Object.entries(reactElementsMap).map(([key, component]) => {
  window.customElements.define(
    kebabCase(`react-${key}`),
    class extends ReactMountingElement {
      component = component;
    }
  );
});
