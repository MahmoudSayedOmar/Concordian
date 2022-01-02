import React from "react";

import { connect } from "react-redux";

import { Icon } from "../Areas/Common/components";
import { grey4, black } from "../Areas/Common/components/config/colors";

import { addWishList, removeWishList } from "../modules/common/actions";
import { configsSelector } from "../modules/common/selectors";
import { wishListSelector } from "../modules/common/selectors";

export function WishListIcon(props) {
  const {
    product_id,
    wishList,
    dispatch,
    color,
    colorSelect,
    configs,
    ...rest
  } = props;
  if (!configs.get("toggleWishlist")) {
    return null;
  }
  const hasList = wishList.has(product_id);
  const wishListAction = hasList
    ? () => dispatch(removeWishList(product_id))
    : () => dispatch(addWishList(product_id));

  return (
    <Icon
      size={19}
      {...rest}
      type="font-awesome"
      name={hasList ? "heart" : "heart-o"}
      color={hasList ? colorSelect : color}
      onPress={wishListAction}
      underlayColor={"transparent"}
    />
  );
}

WishListIcon.defaultProps = {
  width: 227,
  height: 227,
  color: grey4,
  colorSelect: black,
};

const mapStateToProps = (state) => ({
  wishList: wishListSelector(state),
  configs: configsSelector(state),
});

export default connect(mapStateToProps)(WishListIcon);