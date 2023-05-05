import React from 'react'
import { Container, Row, Col } from 'reactstrap'

export default () => (
  <section className="s6">
    <Container>
      <div className="s6__titles">
        <h1>team member</h1>
        <h4>Integer Cursus Bibendum Augue Ac Cursus .</h4>
      </div>
      <Row>
        <Col md="6" lg="3">
          <div className="s6__frame">
            <img
              src="https://bootstrapmade.com/demo/themes/eStartup/img/team/1.jpg"
              alt=""
            />
            <div className="s6__in-out-alert">
              <div className="s6__social-icons">
                <i className="fab fa-facebook-f" />
                <i className="fab fa-twitter" />
                <i class="fab fa-linkedin-in" />
              </div>
              <h3>manager</h3>
              <h3>kimberly tran</h3>
            </div>
          </div>
        </Col>
        <Col md="6" lg="3">
          <div className="s6__frame">
            <img
              src="https://bootstrapmade.com/demo/themes/eStartup/img/team/2.jpg"
              alt=""
            />
            <div className="s6__in-out-alert">
              <div className="s6__social-icons">
                <i className="fab fa-facebook-f" />
                <i className="fab fa-twitter" />
                <i class="fab fa-linkedin-in" />
              </div>
              <h3>manager</h3>
              <h3>kimberly tran</h3>
            </div>
          </div>
        </Col>
        <Col md="6" lg="3">
          <div className="s6__frame">
            <img
              src="https://bootstrapmade.com/demo/themes/eStartup/img/team/3.jpg"
              alt=""
            />
            <div className="s6__in-out-alert">
              <div className="s6__social-icons">
                <i className="fab fa-facebook-f" />
                <i className="fab fa-twitter" />
                <i class="fab fa-linkedin-in" />
              </div>
              <h3>manager</h3>
              <h3>kimberly tran</h3>
            </div>
          </div>
        </Col>
        <Col md="6" lg="3">
          <div className="s6__frame">
            <img
              src="https://bootstrapmade.com/demo/themes/eStartup/img/team/4.jpg"
              alt=""
            />
            <div className="s6__in-out-alert">
              <div className="s6__social-icons">
                <i className="fab fa-facebook-f" />
                <i className="fab fa-twitter" />
                <i class="fab fa-linkedin-in" />
              </div>
              <h3>manager</h3>
              <h3>kimberly tran</h3>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    <style>{`
          .s6 {
              font-size: 16px;
              margin-top: 10em;
          }
          .s6__titles {
              margin-bottom: 4em;
              text-align: center;
          }

        .s6__titles h1 {
              font-size: 3em;
              margin-bottom: .8em;
              font-weight: 100;
              text-transform: capitalize;
              letter-spacing: 2px;
          }
            .s6__titles h4 {
                font-size: .9em;
                font-weight: 100;
                color: dimgray;
            }
            .s6__frame {
                position: relative;
                height: 255px;
                margin-bottom: 3em;
                overflow: hidden;
                box-shadow: #615d5da1 0px 3px 10px;
            }
            
            .s6__frame img {
                width: 100%;
            }
            .s6__frame:hover>.s6__in-out-alert {
                transform: translateY(0);
            }
            .s6__in-out-alert {
                position: absolute;
                display: flex;
                padding: 2em 0;
                flex-direction: column;
                justify-content: flex-end;
                align-items: center;
                width: 100%;
                left: 0;
                bottom: 0;
                background: white;
                transition: all .5s;
                transform: translateY(100%);
            }
            .s6__social-icons {
                font-size: .55em;
                color: #636567;
                margin-bottom: 2em;
            }
            .s6__social-icons > i:not(.fa-linkedin-in) {
                margin-right: 2em;
            }
            .s6__social-icons > i:hover {
                cursor: pointer;
                color: var(--brand-color);
            }
            
            

            .s6__in-out-alert > h3 {
                margin: 0;
                line-height: 1.3;
            }
            .s6__in-out-alert > h3:first-of-type {
                font-size: 1em;
                font-weight: 400;
                letter-spacing: 1.6px;
                color: #545252;
            }
            .s6__in-out-alert > h3:last-child {
                font-size: .65em;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 2px;
            }
            
            
        `}</style>
  </section>
)
