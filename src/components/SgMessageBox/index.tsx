import Vue from "vue";
import Component from "vue-class-component";
import { Dialog, Tooltip } from "element-ui";
import SfButton from "~/SgButton";
import { NOOP } from "@/utils/global";
import SfIcon from "~/SgIcon";

@Component({
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      default: ""
    },
    messageClass: {
      type: String,
      default: ""
    },
    icon: {
      type: String
    },
    confirmText: {
      type: String,
      default: "确定"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    disabled: {
      tyep: Boolean,
      default: false
    },
    confirmButtonType: {
      type: String,
      default: "danger"
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
})
export default class SfMessageBox extends Vue {
  static open: (
    params: {
      title: string;
      message?: string;
      messageClass?: string;
      cancelText?: undefined | string;
      confirmText?: undefined | string;
      icon?: string;
    }
  ) => Promise<{}>;

  visible: boolean;
  title: string;
  message: string;
  messageClass: "warn" | "";
  icon: string;
  confirmButtonType: string;
  callback: (action: "confirm" | "cancel") => any;
  // 可传入空字符串隐藏对应button
  confirmText: string;
  cancelText: string;
  disabled: boolean;
  loading: boolean;

  confirm() {
    this.$emit("confirm", true);
    if (this.callback) {
      this.callback("confirm");
    }
  }

  cancel() {
    this.$emit("cancel", false);
    if (this.callback) {
      this.callback("cancel");
    }
  }

  render(h) {
    return (
      <Dialog
        visible={this.visible}
        close-on-click-modal={false}
        close-on-press-escape={false}
        width="517px"
        center
        showClose={false}
        class={["sf-messageBox", !this.message && "emptyMessageBox"]}
      >
        <span slot="title">
          <SfIcon name={this.icon} size={26} />
          {this.title}
        </span>
        <span>
          {this.message}{" "}
        </span>
        <span slot="footer">
          {this.confirmText &&
            <SfButton
              onClick={this.confirm}
              type={this.confirmButtonType}
              loading={this.loading}
            >
              {this.confirmText}
            </SfButton>}
          {this.cancelText &&
            <SfButton onClick={this.cancel}>
              {this.cancelText}{" "}
            </SfButton>}
        </span>
      </Dialog>
    );
  }
}

SfMessageBox.open = open;

let instance: SfMessageBox;

function open({
  title = "",
  message = "",
  messageClass = "",
  cancelText = undefined as undefined | string,
  icon = "",
  confirmText = undefined as undefined | string
}) {
  if (!instance) {
    instance = new SfMessageBox({
      el: document.createElement("div")
    });

    document.body.appendChild(instance.$el);
  }

  instance.title = title;
  instance.message = message;
  instance.messageClass = messageClass as "";
  instance.visible = true;
  instance.icon = icon;
  if (cancelText != null) {
    instance.cancelText = cancelText;
  }
  if (confirmText != null) {
    instance.confirmText = confirmText;
  }

  return new Promise((resolve, reject) => {
    instance.callback = action => {
      instance.visible = false;
      if (action === "confirm") {
        resolve();
      } else {
        reject();
      }
    };
  });
}
