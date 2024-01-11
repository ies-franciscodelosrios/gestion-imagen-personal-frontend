// ** Icons Import
import { Heart } from 'react-feather'

const Footer = () => {
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-start d-block d-md-inline-block mt-25'>
        Copyleft © {new Date().getFullYear()}{' '}
        <a href='https://iesfranciscodelosrios.es' target='_blank' rel='noopener noreferrer'>
          Proyecto IES EL TABLERO
        </a>
        <span className='d-none d-sm-inline-block'>, todos los derechos reservados</span>
      </span>
    </p>
  )
}

export default Footer
