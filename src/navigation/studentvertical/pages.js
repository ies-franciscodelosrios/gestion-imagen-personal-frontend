// ** Icons Import
import { FileText, Circle, Square, HelpCircle } from 'react-feather'

export default [
  {
    header: 'Preguntas & Documentación'
  },
  {
    id: 'faq',
    title: 'FAQ',
    icon: <HelpCircle size={12} />,
    permissions: ['admin', 'editor'],
    navLink: '/apps/faq'

  }

]