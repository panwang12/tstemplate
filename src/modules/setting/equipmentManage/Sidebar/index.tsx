import Vue from "vue";
import { mapState } from "vuex";
import Component from "vue-class-component";
import { TabPane, Badge } from "element-ui";
import SgTree from "~/SgTree";
import SgTabs from "~/SgTabs";
import SgIcon from "~/SgIcon";
import { equipmentTabs } from "@/utils/constants";
import { Cache } from "@/utils/cache";
import { join, EMPTYARRAY, EMPTYOBJECT } from "@/utils/global";
import SgMessageBox from "~/SgMessageBox";
import { hasPermission } from "~/SgButton";
import { MODULE_PATH } from '@/store/module/equipmentManage'
@Component({
  props: {
    treeData: {
      type: Array
    },
    totalCount: {
      type: Number
    },
    defaultExpandedKeys: {
      type: Array
    }
  },
    computed: {
      ...mapState(MODULE_PATH, ["vidiconData", "keeperData"])
    },
})
export default class VideoSidebar extends Vue {
  vidiconData:any;
  keeperData:any;
  treeData: Array<any>;
  treeActions = [];
  totalCount: number;
  nodeKey: string;
  videoType: string;
  selectedTab: string = null;
  name = "";
  defaultExpandedKeys: any[];
  $refs: any;
  render(h) {
    return (
      <div class="sg-equipmentSidebar">
        {/* <div class="sg-equipmentSidebar__title">
          {this.$t("videoSourceManage")}
        </div> */}  
        <SgTabs
          class="sg-equipmentSidebar__tabs"
          on-tab-click={this.handleTabClick}
          value={this.selectedTab}
          onInput={this.selectTab}
        >
          <TabPane label={this.$t("vidicon")} name={equipmentTabs.VIDICON}>
            {/* {this.renderCount(h)} */}
            <SgTree
              data={this.vidiconData.treeData}
              nodeKey="groupId"
              numberLabel="resourcesCount"
              actions={this.treeActions}
              onClickLabel={this.handleClickLabel}
              load={this.lodaMore}
              expandOnClickNode={false}
              props={{ isLeaf: "leafNode" }}
              ref="sgtree"
              defaultExpandedKeys={this.defaultExpandedKeys}
            />
          </TabPane>
          <TabPane label={this.$t("keeper")} name={equipmentTabs.KEEPER}>
            {/* {this.renderCount(h)} */}
            <SgTree
              data={this.keeperData.treeData}
              nodeKey="groupId"
              numberLabel="resourcesCount"
              actions={this.treeActions}
              onClickLabel={this.handleClickLabel}
              load={this.lodaMore}
              expandOnClickNode={false}
              props={{ isLeaf: "leafNode" }}
              ref="sgtree"
              defaultExpandedKeys={this.defaultExpandedKeys}
            />
          </TabPane>
        </SgTabs>
      </div>
    );
  }

  mounted() {
    this.selectedTab = this.videoType;
    this.treeActions = Cache.localGet("isAdmin")
      ? [
          {
            name: this.$t("createLowerLevel"),
            action: this.createLowerLevel,
            icon: "create-orgs"
          },
          {
            name: this.$t("viewDetail"),
            action: this.view,
            icon: "view"
          },
          {
            name: this.$t("edit"),
            action: this.edit,
            icon: "library-edit"
          },
          {
            name: this.$t("delete"),
            action: this.delete,
            icon: "delete-simple"
          }
        ]
      : hasPermission("01050251")
        ? [
            {
              name: this.$t("viewDetail"),
              action: this.view,
              icon: "view"
            }
          ]
        : [];
  }

  renderCount(h) {
    return (
      <div class="sg-equipmentSidebar__group-wrap">
        <span class="sg-equipmentSidebar__group">
          <SgIcon name="group" size={22} />
          {this.$t("grouping")}
        </span>
        <span onClick={this.getAll} class="sg-equipmentSidebar__totalCount">
          {" "}{this.$t("allGroup")} ({this.totalCount})
        </span>
      </div>
    );
  }

  getAll() {
    const name = this.name ? this.name : equipmentTabs.VIDICON;
    this.handleTabClick({ name });
  }

  handleTabClick({ name }) {
    this.name = name;
  }

  selectTab(name) {
    this.selectedTab = name;
  }
  toShowInstMsgbox(node, type?, data?) {
    let deleteType;
    if (data) {
      if (data.leafNode && data.resourcesCount == 0 && type !== 4) {
        deleteType = true;
      } else {
        deleteType = false;
      }
    } else {
      deleteType = false;
    }
    SgMessageBox.open({
      title: `${type === 4
        ? this.$t("groupProhibitDelete")
        : !deleteType ? this.$t("groupIsLeafDelete") : this.$t("groupDelete")}`,
      confirmText: `${this.$t("confirm")}`,
      message: `${type === 4
        ? ""
        : deleteType ? "" : this.$t("groupIsNotDelete")}`
    }).then(() => {
      if (type === 3) {
        if (deleteType) {
          this.$emit("delete", data, node);
        }
      }
    });
  }

  removeTreeNode() {}

  createLowerLevel({ node, data, store }) {
    this.$emit("createLowerLevel", node, data);
  }
  view({ node, data, store }) {
    this.$emit("view", node, data);
  }
  edit({ node, data, store }) {
    // if (data.parentId === 0) {
    //   this.toShowInstMsgbox(3);
    // } else {
    //   this.$emit("edit", data);
    // }
    this.$emit("edit", node, data);
  }
  delete({ node, data, store }) {
    if (data.parentId === 0) {
      this.toShowInstMsgbox(node, 4);
    } else {
      this.toShowInstMsgbox(node, 3, data);
    }
  }
  handleClickLabel(data) {
  }

  lodaMore(node, resolve) {
    if(node.data.geoupId){
    }
  }
}
