import Vue from "vue";
import Component from "vue-class-component";
import { Tree, Badge } from "element-ui";
import SfTooltip from "~/SgTooltip";
import SfIcon from "~/SgIcon";
import { EMPTYOBJECT, NOOP } from "@/utils/global";
const cloneDeep = require("lodash/cloneDeep");

const _treeProps = cloneDeep((Tree as any).props);
delete _treeProps.renderContent;

@Component<SfTree>({
  props: {
    ..._treeProps,
    actions: {
      type: Array
    },
    label: {
      type: String,
      default: "name"
    },
    numberLabel: {
      type: String
    },
    status:{
      type: String,
      default:"status"
    },
    lazy: {
      type: Boolean,
      default: true
    },
    treeIcon: {
      type: Object
    },
    header: {
      type: Object
    },
    data:{
      type:Array,
      
    },
    renderNode: {
      type: Function
    }
  }
})
export default class SfTree extends Vue {
  $refs: {
    tree: any;
  };
  renderNode: (h, { node, data, store }) => {};
  label: string;
  data: Array<any>;
  numberLabel: string;
  status:string;
  hovering: any = null;
  isTitleClicked = true;
  currentNode: MouseEvent;
  nodeKey: string;
  actions: [{ name: string; action: (data) => {}; icon: string }];
  treeIcon: { noLeafIcon: string; leafIcon: string };
  header: { title: string; total: number; icon: string; iconSize: number };
  showTools: boolean = false;
  toolsTop = 0;
  triangleOuterTop = 19;
  triangleInnerTop = 17;
  timer=null;

  render(h) {
    const { renderContent } = this;
    const props = {
      props: {
        ...this.$props,
        renderContent: this.renderContent
      },
      on: this.$listeners as any,
      attrs: this.$attrs,
      ref: "tree"
    };
    return (
      <div>
        <div class="sf-tree">
          {this.header &&
            this.header.title &&
            <div
              class={[
                "sf-tree__title",
                this.isTitleClicked ? "is-clicked" : ""
              ]}
              onClick={() => this.handleClick()}
            >
              {this.header.icon &&
                <SfIcon name={this.header.icon} size={this.header.iconSize} />}
              {this.header.title}
              {this.header.total &&
                <span class="sf-tree__count">
                  ({this.header.total})
                </span>}
            </div>}
          <Tree {...props} />
        </div>

        {this.actions &&
          this.showTools &&
          <ul
            class={"sf-tree__tools js-mouseevent"}
            style={{ top: this.toolsTop + "px" }}
            onMouseleave={this.handleToolsMouseleave}
            onMouseenter={this.handleToolsMouseenter}
          >
            {this.actions.map(action => {
              return (
                <li
                  class="sf-tree__tool js-mouseevent"
                  onClick={() => action.action(this.hovering)}
                >
                  <SfIcon name={action.icon} size={16} />
                  <span class="js-mouseevent">
                    {action.name}
                  </span>
                </li>
              );
            })}
            <span
              class="triangle-outer"
              style={{ top: this.triangleOuterTop + "px" }}
            />
            <span
              class="triangle-inner"
              style={{ top: this.triangleInnerTop + "px" }}
            />
          </ul>}
      </div>
    );
  }

  renderContent(h, { node, data, store }) {
    const treeClass=data[this.status]==0?" delete":"";
    if (data.parentId !== null) {
      return (
        <span
          class={"sf-tree__label" +treeClass}
          onMouseenter={evt => this.handleMouseenter(evt, node, data, store)}
          onMouseleave={this.handleMouseleave}
          onClick={() => this.handleClick(data)}
        >
          {this.treeIcon &&
            <SfIcon
              name={
                node.isLeaf ? this.treeIcon.leafIcon : this.treeIcon.noLeafIcon
              }
            />}
          {data[this.label]}
          {this.numberLabel &&
            <span class="sf-tree__count">
              ({data[this.numberLabel]})
            </span>}
          {this.renderNode &&
            <span class="is-renderNode">
              {this.renderNode(h, { node, data, store })}
            </span>}
        </span>
      );
    } else {
      return (
        <span class={"sf-tree__label" +treeClass}  onClick={() => this.handleClick(data)}>
          {this.header &&
            this.header.icon &&
            <SfIcon name={this.header.icon} size={this.header.iconSize} />}
          {this.treeIcon &&
            this.treeIcon.noLeafIcon &&
            <SfIcon name={this.treeIcon.noLeafIcon} />}
          {data[this.label]}
          {this.numberLabel && <Badge value={data[this.numberLabel]} />}
          {this.renderNode &&
            <span class="is-renderNode">
              {this.renderNode(h, { node, data, store })}
            </span>}
        </span>
      );
    }
  }

  handleClick(data?) {
    if (data) {
      this.isTitleClicked = false;
    } else {
      this.isTitleClicked = true;
      this.setCurrentNode({ [this.nodeKey]: null });
    }
    this.$emit("clickLabel", data);
  }

  handleMouseenter(evt, node, data, store) {
    this.timer && clearTimeout(this.timer);
    if (this.actions && this.actions.length) {
      const { top } = evt.target.getClientRects()[0];
      const viewHeight = window.innerHeight;
      if (top + 146 > viewHeight) {
        this.toolsTop = viewHeight - 146;
        this.triangleOuterTop = 19 + top + 146 - viewHeight;
        this.triangleInnerTop = this.triangleOuterTop - 2;
      } else {
        this.toolsTop = +top;
        this.triangleOuterTop = 19;
        this.triangleInnerTop = 17;
      }

      this.showTools = true;
      this.hovering = { node, data, store };
    }
  }

  handleMouseleave(evt) {
    if (
      evt.toElement &&
      evt.toElement.classList &&
      evt.toElement.classList.contains("js-mouseevent")
    ) {
      this.timer && clearTimeout(this.timer);
      return;
    }
    this.timer = setTimeout(() => {
      this.showTools = false;
      this.hovering = null;
    }, 500);
  }
  handleToolsMouseleave(evt) {
    this.showTools = false;
    this.hovering = null;
    this.timer && clearTimeout(this.timer);
  }
  handleToolsMouseenter() {
    this.timer && clearTimeout(this.timer);
    this.showTools = true;
  }

  setCheckedKeys(keys) {
    this.$refs.tree.setCheckedKeys(keys);
  }

  setChecked(key, checked) {
    this.$refs.tree.setChecked(key, checked);
  }

  loadMore(root) {
    this.$refs.tree.store.load(root, data => {
      data.loaded = true;
      data.loading = false;
      data.childNodes = [];
      root.doCreateChildren(data);
      root.store._initDefaultCheckedNodes();
      if (!root.expanded) {
        if (this.currentNode) {
          ((this.currentNode.target as HTMLElement).parentElement
            .firstElementChild as HTMLElement).click();
        }
      }
    });
  }
  setCurrentNode(node) {
    this.$refs["tree"].setCurrentNode(node);
  }

  getCheckedKeys() {
    return this.$refs["tree"].getCheckedKeys();
  }

  filter(val) {
    this.$refs["tree"].filter(val);
  }

  setTitleClicked() {
    this.isTitleClicked = true;
    this.setCurrentNode({ [this.nodeKey]: null });
  }
}
