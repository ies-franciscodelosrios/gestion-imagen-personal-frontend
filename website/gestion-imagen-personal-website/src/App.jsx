import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Portada from './assets/img/portada.jpg';
import Logo from './assets/img/Logo.jpg'
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBBtn,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';


function App() {

  return (
    <div class="App">
      <div class="contenedor">
        <div class="texto">
          <h1>IES EL TABLERO</h1>
          <br></br>
        
        </div>
      </div>
      <div className='targeta-SN'>
        <MDBCard style={{ maxWidth: '740px' }}>
          <MDBRow className='g-0'>
            <MDBCol md='4'>
              <MDBCardImage src={Logo} alt='...' fluid />
            </MDBCol>
            <MDBCol md='8'>
              <MDBCardBody>
                <MDBCardTitle  id="SN" className='text-center'>Sobre nosotros</MDBCardTitle>
                <MDBCardText>
                  This is a wider card with supporting text below as a natural lead-in to additional content. This
                  content is a little bit longer.
                </MDBCardText>
                <MDBCardText>
                  <small className='text-muted'>Last updated 3 mins ago</small>
                </MDBCardText>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </div>
    </div>

  )
}
export default App