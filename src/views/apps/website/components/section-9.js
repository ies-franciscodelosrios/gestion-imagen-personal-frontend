import React from 'react'
import { Container, Row, Col, Form, FormGroup, Input, Button } from 'reactstrap'

export default () => (
  <section className="s9">
    <Container className="ref-pos">
      <Form>
        <FormGroup row className="m-0">
          <Col md="9" className="p-0">
            <Input
              type="email"
              placeholder="Email adress"
              className="s9__email"
            />
          </Col>
          <Col md="3" className="p-0">
            <Button className="s9__submit">
              <i class="fas fa-location-arrow" /> suscribirse
            </Button>
          </Col>
        </FormGroup>
      </Form>
      <div className="social-icons">
        <i className="fab fa-facebook-f" />
        <i className="fab fa-twitter" />
        <i className="fab fa-google" />
        <i className="fab fa-linkedin-in" />
      </div>
    </Container>
    <style>
      {`
        .s9 {
            font-size: 16px;
            margin-top: 10em;
            background-image: url(https://bootstrapmade.com/demo/themes/eStartup/img/newsletter-bg.jpg);
            padding: 3em 0;
            background-position: center;
            background-attachment: fixed;
            background-repeat: no-repeat;
            position: relative;
        }
        @media (min-width: 990px) {
            .s9 {
                padding: 6em 0;
            }
        }
        .s9:after {
            content: '';
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: white;
            opacity: .4;
        }
        .s9 .ref-pos {
            position: relative;
            z-index: 1;
        }
        .s9 form {
            margin: 0 auto;
        }
        @media (min-width: 768px) {
            .s9 form {
                width: 65%;
            }
        }
        .s9 form input, .s9 form button{
            height: 60px;
            border-radius: 0;
        }
        .s9__email {
            text-align: center;
            font-size: .8em;
            margin-bottom: 2em;
        }
        
        .s9__email:focus {
            outline: 1px solid hsl(120, 53%, 77%);
            box-shadow: none;
            border-color: transparent;
        }
        .s9__submit {
            font-size: .8em;
            width: 100%;
            background-color: hsl(120, 50%, 58%);
            border: none;
        }
        
        .s9__submit:hover {
            background-color: hsl(122, 39%, 49%);
        }
        .s9__submit i {
            margin-right: .5em;
        }
        .social-icons {
            font-size: .75em;
            text-align: center;
            color: white;
            margin-top: 3em;
        }
        i.fab {
            display: inline-block;
            transition: all .5s;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: hsl(120, 50%, 58%);
            line-height: 40px;
            cursor: pointer;
        }
        i.fab:hover {
            background-color: hsl(120, 27%, 56%);
        }
        i.fab + i.fab {
            margin-left: 1em;
        }
     
     `}
    </style>
  </section>
)
