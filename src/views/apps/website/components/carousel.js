import React, { Component } from 'react'
import { Container } from 'reactstrap'
export default class extends Component {
  componentDidMount() {
    $('.owl-carousel').owlCarousel({
      items: 4,
      autoplay: true,
      loop: true,
      margin: 30,
      dots: true,
      responsiveClass: true,
      responsive: {
        320: { items: 1 },
        480: { items: 2 },
        600: { items: 2 },
        767: { items: 3 },
        768: { items: 3 },
        992: { items: 4 }
      }
    })
  }

  render() {
    return (
      <section className="s4">
        <Container>
          <div className="s4__titles">
            <h1>app gallery</h1>
            <h4>Integer Cursus Bibendum Augue Ac Cursus .</h4>
          </div>
          <div class="owl-carousel owl-theme">
            <div>
              <img
                src="https://bootstrapmade.com/demo/themes/eStartup/img/screen/1.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://bootstrapmade.com/demo/themes/eStartup/img/screen/2.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://bootstrapmade.com/demo/themes/eStartup/img/screen/3.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://bootstrapmade.com/demo/themes/eStartup/img/screen/4.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://bootstrapmade.com/demo/themes/eStartup/img/screen/5.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://bootstrapmade.com/demo/themes/eStartup/img/screen/6.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://bootstrapmade.com/demo/themes/eStartup/img/screen/7.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://bootstrapmade.com/demo/themes/eStartup/img/screen/8.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://bootstrapmade.com/demo/themes/eStartup/img/screen/9.jpg"
                alt=""
              />
            </div>
          </div>
        </Container>

        <style>
          {`
           .s4 {
               font-size: 16px;
               margin-top: 10em;
           }
           .s4__titles {
               margin-bottom: 4em;
               text-align: center;
           }
           .s4__titles h1 {
               font-size: 3em;
               font-weight: 100;
               text-transform: capitalize;
               letter-spacing: 5px;
           }
           .s4__titles h4 {
               font-size: .9em;
               font-weight: 100;
               margin-top: 2em;
               color: #949090;
           }
            .owl-dots .owl-dot {
                outline: none;
            }
            .owl-dots .owl-dot.active span, .owl-dots .owl-dot:hover span {
                background: hsl(108, 47%, 57%) !important;
            }
            
            `}
        </style>
      </section>
    )
  }
}
