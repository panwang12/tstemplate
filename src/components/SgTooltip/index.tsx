import { Tooltip } from "element-ui";
import Vue from "vue";
import Component from "vue-class-component";
import SgIcon from "~/SgIcon";
const cloneDeep = require("lodash/cloneDeep");

const _tooltipProps = cloneDeep((Tooltip as any).props);

delete _tooltipProps.openDelay;

@Component({
  props: {
    ..._tooltipProps,
    type: {
      type: String
    },
    placement: {
      type: String,
      default: "top"
    },
    openDelay: {
      type: Number,
      default: 1000
    }
  }
})
export default class SgTooltip extends Vue {
  type: "warn" | "normal" | "special" | "tool";

  render(h) {
    const props = {
      props: {
        ...this.$props,
        popperClass: `sf-tooltip--${this.type}`,
        effect: this.type === "normal" ? "light" : "dark"
      },
      on: this.$listeners as any,
      attrs: this.$attrs
    };

    return (
      <Tooltip {...props}>
        {this.$slots.default}
        {this.$slots.content && <div slot="content">{this.$slots.content}</div>}
      </Tooltip>
    );
  }
}
