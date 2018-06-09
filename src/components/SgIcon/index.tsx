import Vue from "vue";
import Component from "vue-class-component";
import { fail } from "assert";

@Component<SfIcon>({
  props: {
    name: {
      type: String
      // required: true
    },
    size: {
      type: Number
    },
    type: {
      type: String,
      default: "iconfont"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    text: String,
    needHover: {
      type: Boolean,
      default: true
    }
  }
})
export default class SfIcon extends Vue {
  static permissioIds = [];
  name: string;
  size: number;
  type: "svg" | "iconfont";
  permissionId: number | Array<number>;
  isHovering = false;
  disabled: boolean;
  text: string;
  needHover: boolean;

  handleClick(e) {
    if (!this.disabled) {
      this.$emit("click", e);
    }
  }
  handleMouseenter() {
    if (this.needHover) {
      this.isHovering = true;
      this.$emit("mouseenter");
    }
  }
  handleMouseleave() {
    if (this.needHover) {
      this.isHovering = false;
      this.$emit("mouseleave");
    }
  }

  render(h) {
    const {
      name,
      size,
      handleClick,
      type,
      handleMouseenter,
      handleMouseleave,
      disabled
    } = this;
    return type === "svg" ? (
      <svg
        class={["sf-icon", "icon", disabled ? "is-disabled" : ""]}
        aria-hidden="true"
        style={{
          "font-size": size + "px"
        }}
        onClick={handleClick}
        onMouseenter={handleMouseenter}
        onMouseleave={handleMouseleave}
      >
        <use
          href={
            disabled
              ? `#icon-${name}-disabled`
              : this.isHovering ? `#icon-${name}-hover` : `#icon-${name}`
          }
        />
      </svg>
    ) : (
      <i
        class={[
          "sf-icon",
          "iconfont",
          "icon-" + name,
          disabled ? "is-disabled" : ""
        ]}
        style={{
          "font-size": size + "px"
        }}
        onClick={handleClick}
        onMouseenter={handleMouseenter}
        onMouseleave={handleMouseleave}
      />
    );
  }
}
