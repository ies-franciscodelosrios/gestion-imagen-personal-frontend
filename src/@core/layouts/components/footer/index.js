// ** Icons Import
import { Heart } from 'react-feather'

const Footer = () => {
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-start d-block d-md-inline-block mt-25'>
        COPYRIGHT © {new Date().getFullYear()}{' '}
        <a href='https://iesfranciscodelosrios.es' target='_blank' rel='noopener noreferrer'>
          Proyecto Pericles
        </a>
        <span className='d-none d-sm-inline-block'>, todos los derechos reservados</span>
      </span>
      <span className='float-md-end d-none d-md-block'>
        Diseñado Artesanalmente y con 
        <Heart size={14} />
      </span>
    </p>
  )
}

export default Footer
