declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}
declare var require: {
    (path: string): any;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (...modules: any[]) => void) => void;
  };
interface Mywindow extends Window {
    config: {
        host: string;       
    }
}