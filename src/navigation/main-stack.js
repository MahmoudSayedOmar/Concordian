import React from 'react';

import {mainStack} from '../config/navigator';

import {createStackNavigator} from '@react-navigation/stack';

import HomeTabs from './home-tabs';
import Blogs from '../screens/blog/blogs';
import Blog from '../screens/blog/blog';
import Checkout from '../screens/cart/checkout';
import WeViewCheckout from '../screens/cart/webview-checkout';
import WeViewPayment from '../screens/cart/webview-payment';
import WeViewThankYou from '../screens/cart/webview-thankyou';

import Products from '../screens/shop/products';
import Search from '../screens/shop/search';

import Product from '../screens/shop/product';
import ProductReview from '../screens/shop/product-review';
import ProductReviewForm from '../screens/shop/product-review-form';
import ProductDescription from '../screens/shop/product-description';
import ProductAttribute from '../screens/shop/product-attribute';

import Refine from '../screens/shop/refine';
import FilterCategory from '../screens/shop/filter-category';
import FilterAttribute from '../screens/shop/filter-attribute';
import FilterTag from '../screens/shop/filter-tag';
import FilterPrice from '../screens/shop/filter-price';

import Stores from '../screens/shop/stores';
import StoreDetail from '../screens/shop/store-detail';
import StoreReview from '../screens/shop/store-review';

import LinkingWebview from '../screens/linking-webview';

import SettingScreen from '../screens/profile/setting';
import HelpScreen from '../screens/profile/help';
import ContactScreen from '../screens/profile/contact';
import AccountScreen from '../screens/profile/account';
import ChangePasswordScreen from '../screens/profile/change-password';
import AddressBookScreen from '../screens/profile/address-book';
import OrderList from '../screens/profile/orders';
import OrderDetail from '../screens/profile/order';
import DemoConfig from '../screens/profile/demo-config';
import EditAccount from '../screens/profile/edit-account';
import Downloads from '../screens/profile/downloads';
import Page from '../screens/profile/Page';

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName={mainStack.home_tab}
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.home_tab}
        component={HomeTabs}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.blogs}
        component={Blogs}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.blog}
        component={Blog}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.checkout}
        component={Checkout}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.webview_checkout}
        component={WeViewCheckout}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.webview_payment}
        component={WeViewPayment}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.webview_thank_you}
        component={WeViewThankYou}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.products}
        component={Products}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.search}
        component={Search}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.product}
        component={Product}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.product_review}
        component={ProductReview}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.product_review_form}
        component={ProductReviewForm}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.product_description}
        component={ProductDescription}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.product_attribute}
        component={ProductAttribute}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.refine}
        component={Refine}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.filter_category}
        component={FilterCategory}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.filter_price}
        component={FilterPrice}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.filter_tag}
        component={FilterTag}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.filter_attribute}
        component={FilterAttribute}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.stores}
        component={Stores}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.store_detail}
        component={StoreDetail}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.store_review}
        component={StoreReview}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.linking_webview}
        component={LinkingWebview}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.setting}
        component={SettingScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.contact}
        component={ContactScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.help}
        component={HelpScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.account}
        component={AccountScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.change_password}
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.address_book}
        component={AddressBookScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.order_list}
        component={OrderList}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.order_detail}
        component={OrderDetail}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.demo_config}
        component={DemoConfig}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.edit_account}
        component={EditAccount}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.downloads}
        component={Downloads}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.page}
        component={Page}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
