// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardText,
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
          <Card className="text-white border-0">
            <CardImg top src={img1} alt="card-overlay" className='rounded-2  dark-fp' />
            <CardImgOverlay className="rounded-2 card-fp">
              <CardTitle className="text-white font-weight-bold" tag="h4">
              GS PELUQUERIA
              </CardTitle>
              <CardText className='sh-card-tx '>
              Los estudiantes aprenden a aplicar técnicas innovadoras y a utilizar los últimos productos y herramientas 
              del mercado para crear looks personalizados y adaptados a las necesidades y deseos de cada cliente. 
              </CardText>
              <CardText className='sh-card-tx '>
                <small className='text-muted'>Dos Años de Formación</small>
              </CardText>
            </CardImgOverlay>
          </Card>
        </Col>
        <Col xl="6" md="6" className='card-fp'>
          <Card className="text-white border-0">
            <CardImg top src={img2} alt="card-overlay" className='rounded-2  dark-fp'/>
            <CardImgOverlay className="rounded-2 card-fp">
              <CardTitle className="text-white" tag="h4">
                GS ESTÉTICA
              </CardTitle>
              <CardText className='sh-card-tx'>
              El Grado Superior en Estética es una formación avanzada en el cuidado y el tratamiento de la piel y el cuerpo.
              Liderando la industria de la belleza y el cuidado personal.
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
            <CardImg top src={img3} alt="card-overlay" className='rounded-2  dark-fp'/>
            <CardImgOverlay className="rounded-2 card-fp">
              <CardTitle className="text-white" tag="h4">
                GM PELUQUERIA
              </CardTitle>
              <CardText className='sh-card-tx'>
              El Grado Medio en Peluquería es una formación intermedia donde aprendes técnicas básicas y a utilizar herramientas 
              y productos del mercado para crear peinados y estilos capilares.
              </CardText>
              <CardText className='sh-card-tx'>
                <small className='text-muted'>Dos Años de Formación</small>
              </CardText>
            </CardImgOverlay>
          </Card>
        </Col>
        <Col xl="6" md="6" className='card-fp'>
          <Card className="text-white border-0">
            <CardImg top src={img4} alt="card-overlay" className='rounded-2  dark-fp'/>
            <CardImgOverlay className="rounded-2 card-fp">
              <CardTitle className="text-white" tag="h4">
                GM ESTÉTICA
              </CardTitle>
              <CardText className='sh-card-tx'>
              En Estética es una formación intermedia en el cuidado y el tratamiento de la piel y el cuerpo. Los estudiantes aprenden 
              técnicas básicas y el uso de productos y herramientas del mercado. 
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
