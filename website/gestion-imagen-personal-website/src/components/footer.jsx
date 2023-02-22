  import { } from 'react'
  import './footerStyle.css'
  import Button from 'react-bootstrap/Button';
  import Form from 'react-bootstrap/Form';
  import InputGroup from 'react-bootstrap/InputGroup';
  import 'bootstrap/dist/css/bootstrap.min.css';


  function footer() {

    return (
      <footer className="padding_2x">
        <div className="flex">

          <section className="flex-content padding_1x ">
            <h3>Horario</h3>
            <table>
              <tr>
                <th>
                  Mañana
                </th>
                <th>
                  Tarde
                </th>
              </tr>
              <tr>
                <th>
                  8:15-14:30
                </th>
                <th>
                  15:30-21:30
                </th>
              </tr>

            </table>

          </section>

          <section className="flex-content padding_1x  bl">
            <h3>Direccion</h3>
            <a href="https://goo.gl/maps/DJUnaWJxXd6oUH359">Av. de la Arruzafilla, s/n</a>
          
            <p>14011 Córdoba</p>
            <p>957 37 99 45</p>

          </section>
          <section className="flex-content padding_1x bl">
            <h3>Redes sociales</h3>
            <fieldset className="fixed_flex">
              <a className='buttonLink' href="https://www.facebook.com/people/IES-El-Tablero/100063569645527/"><img src="src/components/footerImgs/facebook.png" alt="facebook" width="50px" /></a>
              <a className='buttonLink' href="https://mobile.twitter.com/iestablero"><img src="src/components/footerImgs/twitter.png" alt="twitter" width="50px" /></a>
              <a className='buttonLink' href="mailto:"><img src="src/components/footerImgs/gmail.png" alt="gmail" width="50px" /></a>
              <a  href="https://es.linkedin.com/in/isabel-rodriguez-morales-6372b344"><img src="src/components/footerImgs/linkedin.png" alt="linkedin" width="50px" /></a>
            </fieldset>
          </section>
        </div>
      </footer>
    )
  }

  export default footer