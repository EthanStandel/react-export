import { Counter } from "./Counter";
import kebabCase from "lodash/kebabCase";
import { ReactMountingElement } from "./ReactMountingElement";
import { ComponentProps } from "react";

// Add all react components here!
// Using a map rather than a list so that Component.name values don't get lost
// during uglification compilation steps
const reactElementsMap = { Counter };
// it's important to have prefix for the component names because one of the rules
// for naming web components is that they need to have a dash. This can be enforced
// by having a prefix in front of the kebabCase conversion of all component names
const PREFIX = "react";

Object.entries(reactElementsMap).map(([key, component]) => {
  window.customElements.define(
    `${PREFIX}-${kebabCase(key)}`,
    class extends ReactMountingElement<ComponentProps<typeof component>> {
      component = component;
    }
  );
});
