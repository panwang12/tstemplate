import Vue from "vue";
import Component from "vue-class-component";

@Component<SgIcon>({
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
export default class SgIcon extends Vue {
  name: string;
  size: number;
  type: "svg" | "iconfont";
  isHovering = false;
  disabled: boolean;
  render(h) {
    const {
      name,
      size,
      type,
      isHovering,
      disabled
    } = this;
    return type === "svg" ? (
      <svg
        class={["icon", "icon"]}
        aria-hidden="true"
        style={{
          "font-size": size + "px"
        }}
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
          "icon",
          "iconfont",
          "icon-" + name,
          disabled ? "is-disabled" : ""
        ]}
        style={{
          "font-size": size + "px"
        }}
      />
    );
  }
}
