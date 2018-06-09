import Vue from "vue";
import Component from "vue-class-component";
import { Tabs } from "element-ui";

@Component({
  props: {
    ...(Tabs as any).props,
    hasBackground: {
      type: Boolean
    }
  }
})
export default class SgTabs extends Vue {
  hasBackground: boolean;

  render(h) {
    const props = {
      props: { ...this.$props },
      on: this.$listeners as any,
      attrs: this.$attrs,
      class: [
        "sg-tab",
        `${this.hasBackground ? "sg-tab--with-background" : ""}`
      ]
    };

    return <Tabs {...props}>{this.$slots.default}</Tabs>;
  }
}
