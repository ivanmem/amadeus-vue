import { StyleValue, VueElement } from "vue";
import { icons } from "../../common/consts";
import { RouteLocationRaw } from "vue-router";

export interface AButtonProps {
  class?: string;
  defaultClass?: string;
  icon?: VueElement | keyof typeof icons;
  iconStyle?: StyleValue;
  iconClass?: any;
  to?: RouteLocationRaw;
  target?: string | undefined;
  exactActiveDataType?: "accent";
  activeDataType?: "accent";
  dataType?: "accent";
  hideContent?: boolean;
  tag?: string;
  replace?: boolean;
}
