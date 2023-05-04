import React from 'react'
import { Container, Row, Col } from 'reactstrap'

export default () => (
  <section className="s3">
    <Container>
      <div className="s3__titles">
        <h1> Amazing Features.</h1>
        <h4>Integer Cursus Bibendum Augue Ac Cursus .</h4>
      </div>
      <Row className="s3__box-wrapper">
        <Col md="6" lg="3" className="s3__box-item">
          <img
            src="https://bootstrapmade.com/demo/themes/eStartup/img/svg/paint-palette.svg"
            alt=""
          />
          <h3>creative design</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </p>
        </Col>
        <Col md="6" lg="3" className="s3__box-item">
          <img
            src="https://bootstrapmade.com/demo/themes/eStartup/img/svg/vector.svg"
            alt=""
          />
          <h3>retina ready</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </p>
        </Col>
        <Col md="6" lg="3" className="s3__box-item">
          <img
            src="https://bootstrapmade.com/demo/themes/eStartup/img/svg/design-tool.svg"
            alt=""
          />
          <h3>easy to use</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </p>
        </Col>
        <Col md="6" lg="3" className="s3__box-item">
          <img
            src="https://bootstrapmade.com/demo/themes/eStartup/img/svg/asteroid.svg"
            alt=""
          />
          <h3>free updates</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </p>
        </Col>
        <Col md="6" lg="3" className="s3__box-item">
          <img
            src="https://bootstrapmade.com/demo/themes/eStartup/img/svg/asteroid.svg"
            alt=""
          />
          <h3>free updates</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </p>
        </Col>
        <Col md="6" lg="3" className="s3__box-item">
          <img
            src="https://bootstrapmade.com/demo/themes/eStartup/img/svg/cloud-computing.svg"
            alt=""
          />
          <h3>app store support</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </p>
        </Col>
        <Col md="6" lg="3" className="s3__box-item">
          <img
            src="https://bootstrapmade.com/demo/themes/eStartup/img/svg/pixel.svg"
            alt=""
          />
          <h3>perfect pixel</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </p>
        </Col>
        <Col md="6" lg="3" className="s3__box-item">
          <img
            src="https://bootstrapmade.com/demo/themes/eStartup/img/svg/code.svg"
            alt=""
          />
          <h3>clean codes</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </p>
        </Col>
      </Row>
    </Container>
    <style>{`
    .s3 {
        font-size: 16px;
        margin-top: 10em;
    }
    .s3__titles {
        margin-bottom: 2em;
    }
    .s3__titles h1 {
        font-size: 2.6em;
        font-weight: 100;
        text-align: center;
    }
    .s3__titles h4 {
        font-size: .9em;
        font-weight: 100;
        text-align: center;
        margin-top: 1.8em;
        color: hsl(0, 2%, 48%);
    }
    .s3__box-wrapper {

    }
    .s3__box-wrapper {
        text-align: center;
    }
    .s3__box-item {
        padding: 2em;
        transition: all .5s;
    }
    .s3__box-item:hover {
        box-shadow: #ece9e9 1px 1px 15px;
    }
    .s3__box-item img {
        width: 60px;
    }
    .s3__box-item h3 {
        font-size: .9em;
        line-height: 2;
        font-weight: 700;
        letter-spacing: 1.5px;
        margin: 1.6em 0;
        text-transform: uppercase;
    }
    .s3__box-item p {
        font-weight: 100;
        font-size: .95em;
        line-height: 2;
        color: dimgray;
    }
    
    `}</style>
  </section>
)
