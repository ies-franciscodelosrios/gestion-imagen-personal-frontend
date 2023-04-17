// ** Third Party Components
import classnames from 'classnames'
import { Scissors, Users, PenTool, Calendar } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'
import { getStadistics } from '../../../../services/api'

const StatsCard = ({ cols, stats }) => {
  const data = [
    {
      title: stats.students ? stats.students : '0',
      subtitle: 'Alumnos',
      color: 'light-primary',
      icon: <Users size={24} onDoubleClick={() => {reloadData()}}/>
    },
    {
      title: stats.teachers ? stats.teachers : '0',
      subtitle: 'Profesores',
      color: 'light-secondary',
      icon: <Scissors size={24} onDoubleClick={() => {reloadData()}}/>
    },
    {
      title: stats.clients ? stats.clients : '0',
      subtitle: 'Clientes',
      color: 'light-danger',
      icon: <PenTool size={24} onDoubleClick={() => {reloadData()}}/>
    },
    {
      title: stats.appointments ? stats.appointments : '0',
      subtitle: 'Citas',
      color: 'light-success',
      icon: <Calendar size={24} onDoubleClick={() => {reloadData()}}/>
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
              <h3 className='fw-bolder mb-0'>{item.title}</h3>
              <CardText className='font-small-4 mb-0'>{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h4' >Estadisticas</CardTitle>
        <CardText className='card-text font-small-2 me-25 mb-0'>{timeSince(stats.date)}</CardText>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

function reloadData(){
  getStadistics().then(data => {
    data.data.data.date = Date.now();
    localStorage.setItem('stadistics', JSON.stringify(data.data.data));
  })
}

function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

export default StatsCard
