// ** Reactstrap Imports
import {
  Button,
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardSubtitle,
  CardLink,
  CardImg,
  Row,
  Col,
  CardImgOverlay,
} from 'reactstrap';

// ** Images
import img1 from '@src/assets/images/slider/11.jpg';
import img2 from '@src/assets/images/slider/12.jpg';
import img3 from '@src/assets/images/slider/13.jpg';
import img4 from '@src/assets/images/slider/14.jpg';

const CardTitles = () => {
  return (
    <>
      <Row className="match-height bg-transparent">
        <Col xl="6" md="6" className='card-fp'>
          <Card className="text-white border-0 ">
            <CardImg top src={img1} alt="card-overlay" className='rounded-2' />
            <CardImgOverlay className="rounded-2 card-fp">
              <CardTitle className="text-white font-weight-bold" tag="h4">
              GS PELUQUERIA
              </CardTitle>
              <CardText className='sh-card-tx '>
                This is a wider card with supporting text below as a natural lead-in to additional content. This content
                is a little bit longer.
              </CardText>
              <CardText className='sh-card-tx '>
                <small className='text-muted'>Dos Años de Formación</small>
              </CardText>
            </CardImgOverlay>
          </Card>
        </Col>
        <Col xl="6" md="6" className='card-fp'>
          <Card className="text-white border-0">
            <CardImg top src={img2} alt="card-overlay" className='rounded-2'/>
            <CardImgOverlay className="rounded-2 card-fp">
              <CardTitle className="text-white" tag="h4">
                GS ESTÉTICA
              </CardTitle>
              <CardText className='sh-card-tx'>
                This is a wider card with supporting text below as a natural lead-in to additional content. This content
                is a little bit longer.
              </CardText>
              <CardText className='sh-card-tx'>
                <small className='text-muted'>Dos Años de Formación</small>
              </CardText>
            </CardImgOverlay>
          </Card>
        </Col>
      </Row>
      <Row className="match-height">
        <Col xl="6" md="6" className='card-fp'>
          <Card className="text-white border-0">
            <CardImg top src={img3} alt="card-overlay" className='rounded-2'/>
            <CardImgOverlay className="rounded-2 card-fp">
              <CardTitle className="text-white" tag="h4">
                GM PELUQUERIA
              </CardTitle>
              <CardText className='sh-card-tx'>
                This is a wider card with supporting text below as a natural lead-in to additional content. This content
                is a little bit longer.
              </CardText>
              <CardText className='sh-card-tx'>
                <small className='text-muted'>Dos Años de Formación</small>
              </CardText>
            </CardImgOverlay>
          </Card>
        </Col>
        <Col xl="6" md="6" className='card-fp'>
          <Card className="text-white border-0">
            <CardImg top src={img4} alt="card-overlay" className='rounded-2'/>
            <CardImgOverlay className="rounded-2 card-fp">
              <CardTitle className="text-white" tag="h4">
                GM ESTÉTICA
              </CardTitle>
              <CardText className='sh-card-tx'>
                This is a wider card with supporting text below as a natural lead-in to additional content. This content
                is a little bit longer.
              </CardText>
              <CardText className='sh-card-tx'>
                <small className='text-muted'>Dos Años de Formación</small>
              </CardText>
            </CardImgOverlay>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CardTitles;
