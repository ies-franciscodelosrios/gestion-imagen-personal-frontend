import { } from 'react'
import './footerStyle.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';


function footer() {

  return (
    <div>
      <footer class="footer">
        {/*  <div class="container">
          <div class="row">
            <div class="col-2">
              <h6>Contactanos</h6>
              <ul class="content">
                <li><strong>Telefono</strong>: 957 37 99 45</li>
                <li><strong>Correo</strong>:  Example@mail  </li>
              </ul>
            </div>
            <div class="col-3">
              <h6>Dudas frecuentes</h6>
              <ul class="content">
                <li><a href="">FAQS</a></li>
              </ul>
            </div>

            <div class="col-7">
              <section class="">
                <form action="">
                  <div class="row d-flex justify-content-center">
                    <h6>¿Tienes alguna pregunta?</h6>
                    <div class="col-md-5 col-12">

                      <div class="form-outline form-white mb-2 bg-white">
                        <input type="email" class="form-control text-dark" />
                        <label class="form-label text-dark" for="form5Example21">Tu Correo </label>
                      </div>
                      <div class="form-outline form-white mb-2 bg-white">
                        <input type="Text" class="form-control text-dark" />
                        <label class="form-label text-dark" for="form5Example21">Tu pregunta</label>
                      </div>
                    </div>
                    <div class="col-auto">
                      <button type="submit" id="Send" class="btn btn-outline-light">
                        Enviar
                      </button>
                    </div>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div> */}

        <div class="container">
          <div class="row">
            <div class="col-3">
              <img src="src/components/footerImgs/icon.png" alt="titleicon.png" width="300px" />
            </div>
            <div class="col-6">
              <div class="row">
                &nbsp;
              </div>
              <div class="row">
                <div class="col-12">
                  <a href=""> <img src="src/components/footerImgs/Facebook.png" alt="facebook.png" /> </a>
                  <a href=""><img src="src/components/footerImgs/Instagram.png" alt="instagram.png" /> </a>
                  <a href=""> <img src="src/components/footerImgs/Youtube.png" alt="youtube.png" /> </a>
                  <a href=""> <img src="src/components/footerImgs/Twitter.png" alt="twitter.png" /> </a>
                </div>
                <div class="row">
                  &nbsp;
                </div>
              </div>
            </div>

            <div class="col-2">
              <div class="row">
                &nbsp;
              </div>
              <div class="row">
                <div class="col-12">
                  Av. de la Arruzafilla, s/n,
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  14011 Córdoba
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  957 37 99 45
                </div>
              </div>
              <div class="row">
                <div class="col-12">

                </div>
              </div>

            </div>

          </div>
        </div>
      </footer>
      <div className='bottom'>
        <div class="row">

          <div class="col-9">
            &nbsp;
          </div>
          <div class="col-3">

          </div>
        </div>
      </div>
    </div>

  )
}

export default footer