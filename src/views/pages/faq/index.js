// ** Reactstrap Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Imports
import axios from 'axios'

// ** Demo Components
import Faqs from './Faqs'
import FaqFilter from './FaqFilter'
import FaqContact from './FaqContact'

// ** Custom Component
import Breadcrumbs from '@components/breadcrumbs'

// ** Styles
import '@styles/base/pages/page-faq.scss'
import { ApiGetFaq } from '../../../services/api'

const Faq = () => {
  // ** States
  const [data, setData] = useState(null),
    [searchTerm, setSearchTerm] = useState('')

  const getFAQData = query => {
    /*return ApiGetFaq()
    .then((response) =>{
      console.log(response);
      //setData(response.questions.Question)
    })
    .catch(
      setData('faqData: { // payment  payment: { icon: "CreditCard", title: "Payment", subtitle: "Which license do I pollas?", qandA: [ { question: "Does my subscription automatically renew?",  ans: "Pastry pudding cookie toffee bonbon jujubes jujubes powder topping. Jelly beans gummi bears sweet roll bonbon muffin liquorice. Wafer lollipop sesame snaps. Brownie macaroon cookie muffin cupcake candy caramels tiramisu. Oat cake chocolate cake sweet jelly-o brownie biscuit marzipan. Jujubes donut marzipan chocolate bar. Jujubes sugar plum jelly beans tiramisu icing cheesecake."}')
    ) */
  }

  useEffect(() => {
    getFAQData(searchTerm)
  }, [])

  return (
    <Fragment>
      <Breadcrumbs title='FAQ' data={[{ title: 'Pages' }, { title: 'FAQ' }]} />
      <FaqFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} getFAQData={getFAQData} />
      {data !== null ? <Faqs data={data} searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> : null}
      <FaqContact />
    </Fragment>
  )
}

export default Faq
