import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import Profile from "views/admin/profile/Profile";
import Products from "views/admin/products/Products";
import Orders from "views/admin/Order/Orders";
import RTLDefault from "views/rtl/default";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";
import SingleOrder from "views/admin/Order/SingleOrder";
import SingleProduct from "views/admin/products/SingleProduct";
import AddProduct from "views/admin/products/AddProduct";
import ProductOrders from "views/admin/products/ProductOrders";
import ProductReviews from "views/admin/products/ProductReviews";


const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Orders",
    layout: "/admin",
    path: "orders",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Orders />,
    secondary: true,
  },
  {
    name: "Products",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "products",
    component: <Products />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "Profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    layout: '/admin',
    path : 'orders/:id',
    component : <SingleOrder/>
  },
  {
    layout : '/admin',
    path : 'products/:id',
    component : <SingleProduct/>
  },
  {
    name : 'Add product',
    layout : '/admin',
    path : 'products/create',
    component : <AddProduct/>
  },
  {
    layout :'/admin',
    path : 'products/:id/orders',
    component : <ProductOrders/>
  },
  {
    layout : '/admin',
    path : 'products/:id/reviews',
    component : <ProductReviews/>
  },
];
export default routes;
