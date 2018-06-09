import { Button } from "element-ui";
import Vue from "vue";
import Component from "vue-class-component";
import SfIcon from "~/SgIcon";
import { arrayContainsArray } from "@/utils/array";
import { Cache } from "@/utils/cache";
@Component({
  props: {
    ...(Button as any).props,
    icon: {
      type: String
    },
    iconSize: {
      type: Number
    },
    permissionCode: {
      type: [String, Array]
    }
  }
})
export default class SfButton extends Vue {
  icon: string;
  iconSize: number;
  static permissionCodes: string[];
  static initPermissions: () => void;
  static clearPermissions: () => void;
  permissionCode: string | Array<string>;
  hasPermission: boolean = true;
  disabled: boolean;

  get _disabled() {
    return !this.hasPermission || this.disabled;
  }

  render(h) {
    const props = {
      props: { ...this.$props, disabled: this._disabled },
      on: this.$listeners as any,
      attrs: this.$attrs,
      class: "sf-button"
    };
    if (this.icon) {
      const icon = h(SfIcon, {
        props: {
          name: this.icon,
          size: this.iconSize ? this.iconSize : 18
        }
      });

      this.$slots.default.unshift(icon);
    }
    let realClickHandler;
    if (props.on && props.on.click && (realClickHandler = props.on.click.fns)) {
      props.on.click = (e: Event) => {
        e.preventDefault();
        if (this._disabled) {
          return;
        } else {
          realClickHandler(e);
        }
      };
    }

    //disabled状态下无法触发事件
    //delete props.props.disabled;

    return (
      <Button {...props}>
        {this.$slots.default}
      </Button>
    );
  }

  mounted(this: SfButton) {
    if (
      this.permissionCode &&
      !arrayContainsArray(SfButton.permissionCodes, this.permissionCode)
    ) {
      this.hasPermission = false;
    }
  }
}

SfButton.permissionCodes = [];
SfButton.initPermissions = () => {
  const permissionCodes = Cache.localGet("permissionCodes");
  if (!SfButton.permissionCodes.length && permissionCodes) {
    SfButton.permissionCodes = permissionCodes;
  }
};
SfButton.clearPermissions = () => {
  SfButton.permissionCodes.length = 0;
};

export const hasPermission = (arg: string | string[]) => {
  return arrayContainsArray(SfButton.permissionCodes, arg);
};
