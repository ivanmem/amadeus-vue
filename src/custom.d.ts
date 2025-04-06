declare module "*.svg?component" {
  const content: any;
  export default content;
}

declare module "linkify-html" {
  import { Options as LinkifyOptions } from "linkifyjs";

  interface Options {
    defaultProtocol?: string;
    events?: boolean;
    format?: (value: string, type: string) => string;
    formatHref?: (href: string, type: string) => string;
    ignoreTags?: string[];
    nl2br?: boolean;
    tagName?: string;
    target?: string;
    validate?: boolean;
    validateHref?: (href: string, type: string) => boolean;
    options?: LinkifyOptions;
  }

  function linkifyHtml(input: string | Node, options?: Options): string;

  export = linkifyHtml;
}

declare module "vue3-easy-data-table" {
  const Vue3EasyDataTable: DefineComponent;
  export default Vue3EasyDataTable;
}

export * from 'vue3-easy-data-table';