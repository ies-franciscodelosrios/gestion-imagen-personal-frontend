// ** Reactstrap Imports
import { Card, CardBody, CardText, Button } from 'reactstrap'

// ** Images
import medal from '@src/assets/images/illustration/badge.svg'

const CardMedal = () => {
  return (
    <Card className='card-congratulations-medal'>
      <CardBody>
        <h5>Bienvenida 🎉 Sonia!</h5>
        <CardText className='font-small-3'>A nuestra plataforma en React</CardText>
        <h3 className='mb-75 mt-2 pt-50'>
          <a href='/' onClick={e => e.preventDefault()}>
            2023 !!!
          </a>
        </h3>
        <Button color='primary'>Ver Perfil</Button>
        <img className='congratulation-medal' src={medal} alt='Medal Pic' />
      </CardBody>
    </Card>
  )
}

export default CardMedal
