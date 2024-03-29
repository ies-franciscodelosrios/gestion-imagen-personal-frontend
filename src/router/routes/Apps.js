// ** React Imports
import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Calendar = lazy(() => import("../../views/apps/calendar"));
const FAQ = lazy(() => import("../../views/pages/faq"));

const EcommerceShop = lazy(() => import("../../views/apps/ecommerce/shop"));
const EcommerceDetail = lazy(() => import("../../views/apps/ecommerce/detail"));
const EcommerceWishlist = lazy(() =>
  import("../../views/apps/ecommerce/wishlist")
);
const EcommerceCheckout = lazy(() =>
  import("../../views/apps/ecommerce/checkout")
);

const UserList = lazy(() => import("../../views/apps/student/list"));
const ListaProfesor = lazy(() => import("../../views/apps/profesor/list"));
const ClientList = lazy(() => import("../../views/apps/client/list"));
const VocEduList = lazy(() => import("../../views/apps/vocationaleducation/list"));

const ClientView = lazy(() => import("../../views/apps/client/view"));
const TeacherView = lazy(() => import("../../views/apps/profesor/view"));
const UserView = lazy(() => import("../../views/apps/student/view"));
const VocEduView = lazy(() => import("../../views/apps/vocationaleducation/view"));

const AppRoutes = [
  {
    element: <Calendar />,
    path: "/apps/calendar",
  },
  {
    element: <FAQ />,
    path: "/apps/faq",
  },
  {
    element: <EcommerceShop />,
    path: "/apps/ecommerce/shop",
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    element: <EcommerceWishlist />,
    path: "/apps/ecommerce/wishlist",
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    path: "/apps/ecommerce/product-detail",
    element: (
      <Navigate to="/apps/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26" />
    ),
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    path: "/apps/ecommerce/product-detail/:product",
    element: <EcommerceDetail />,
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    path: "/apps/ecommerce/checkout",
    element: <EcommerceCheckout />,
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    element: <ClientList />,
    path: "/apps/client/list",
  },
  {
    element: <ClientView />,
    path: "/apps/client/view/:id",
  },
  {
    element: <ListaProfesor />,
    path: "/apps/profesor/list",
  },
  {
    element: <TeacherView />,
    path: "/apps/profesor/view/:id",
  },
  {
    element: <UserList />,
    path: "/apps/student/list",
  },
  {
    path: "/apps/student/view",
    element: <Navigate to="/apps/student/view/1" />,
  },
  {
    element: <UserView />,
    path: "/apps/student/view/:id",
  },
  {
    element: <VocEduList />,
    path: "/apps/vocationaleducation/list",
  },
  {
    path: "/apps/vocationaleducation/view",
    element: <Navigate to="/apps/vocationaleducation/view/1" />,
  },
  {
    element: <VocEduView />,
    path: "/apps/vocationaleducation/view/:id",
  },
];

export default AppRoutes;
