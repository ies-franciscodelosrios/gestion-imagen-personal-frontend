// ** React Imports
import { lazy } from 'react'

const Login = lazy(() => import('../../views/pages/authentication/Login'))

const ForgotPassword = lazy(() => import('../../views/pages/authentication/ForgotPassword'))
const ForgotPasswordBasic = lazy(() => import('../../views/pages/authentication/ForgotPasswordBasic'))
const ForgotPasswordCover = lazy(() => import('../../views/pages/authentication/ForgotPasswordCover'))

const ResetPasswordBasic = lazy(() => import('../../views/pages/authentication/ResetPasswordBasic'))
const ResetPasswordCover = lazy(() => import('../../views/pages/authentication/ResetPasswordCover'))

const VerifyEmailBasic = lazy(() => import('../../views/pages/authentication/VerifyEmailBasic'))
const VerifyEmailCover = lazy(() => import('../../views/pages/authentication/VerifyEmailCover'))

const TwoStepsBasic = lazy(() => import('../../views/pages/authentication/TwoStepsBasic'))
const TwoStepsCover = lazy(() => import('../../views/pages/authentication/TwoStepsCover'))

const AuthenticationRoutes = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  },

  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    layout: 'BlankLayout',
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: '/pages/forgot-password-basic',
    element: <ForgotPasswordBasic />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/pages/forgot-password-cover',
    element: <ForgotPasswordCover />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/pages/reset-password-basic',
    element: <ResetPasswordBasic />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/pages/reset-password-cover',
    element: <ResetPasswordCover />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/pages/verify-email-basic',
    element: <VerifyEmailBasic />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/pages/verify-email-cover',
    element: <VerifyEmailCover />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/pages/two-steps-basic',
    element: <TwoStepsBasic />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/pages/two-steps-cover',
    element: <TwoStepsCover />,
    meta: {
      layout: 'blank'
    }
  }
]

export default AuthenticationRoutes
