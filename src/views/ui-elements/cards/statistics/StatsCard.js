// ** Third Party Components
import classnames from 'classnames'
import { Scissors, Users, PenTool, Calendar } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'

const StatsCard = ({ cols }) => {
  const data = [
    {
      title: '2138',
      subtitle: 'Alumnos',
      color: 'light-primary',
      icon: <Users size={24} />
    },
    {
      title: '56.4%',
      subtitle: 'Peluqueria',
      color: 'light-secondary',
      icon: <Scissors size={24} />
    },
    {
      title: '44.6%',
      subtitle: 'Estética',
      color: 'light-danger',
      icon: <PenTool size={24} />
    },
    {
      title: '210',
      subtitle: 'Citas',
      color: 'light-success',
      icon: <Calendar size={24} />
    }
  ]

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols)
      const margin = index === 2 ? 'sm' : colMargin[0]
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1
          })}
        >
          <div className='d-flex align-items-center'>
            <Avatar color={item.color} icon={item.icon} className='me-2' />
            <div className='my-auto'>
              <h4 className='fw-bolder mb-0'>{item.title}</h4>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h4'>Estadisticas</CardTitle>
        <CardText className='card-text font-small-2 me-25 mb-0'>Actualizado hace 1 semana</CardText>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard
