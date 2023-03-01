// ** Icons Imports
import { Search } from 'react-feather'
// ** Reactstrap Imports
import { Card, CardBody, CardText, Form, Input, InputGroup, InputGroupText } from 'reactstrap'
// ** Images
import logo from '@src/assets/images/logo/logo.svg'
const FaqFilter = ({ searchTerm, setSearchTerm, getFAQData }) => {
  const handleFaqFilter = e => {
    /*setSearchTerm(e.target.value)
    getFAQData(e.target.value)*/
  }

  return (
    <div id='faq-search-filter'>
      <Card
        className='faq-search'
       
      >
        <CardBody className='text-center'>
          <img
            alt='logo'
            src={logo}
            style={{ width: "100px", margin: "auto" }}
            className='img-fluid d-none d-md-block'
          />
          <h2 className='text-primary'>¿Tienes Alguna pregunta?</h2>
          <CardText className='mb-2'>Busca entre nuestras preguntas más comunes o preguntanos directamente </CardText>

        </CardBody>
      </Card>
    </div>
  )
}

export default FaqFilter
