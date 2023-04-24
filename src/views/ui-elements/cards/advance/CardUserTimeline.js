// ** Custom Components
import Timeline from '@components/timeline'

// ** Icons Imports
import { List, MoreVertical } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'




const data = [
  {
    title: 'Corte de Pelo',
    content: 'Degradado mid-fadde y barba.',
    meta: '3 Febrero 2023',
    metaClassName: 'me-1'
  },
  {
    title: 'viejoAsesoramiento Estético',
    content: 'Indicaciones para el cuidado estético.',
    color: 'danger',
    meta: '2 Febrero 2023',
    metaClassName: 'me-1'
  },
  {
    title: 'Masaje anticontracturas',
    content: 'Masaje para la recuperación de contracturas.',
    meta: '2 Febrero 2023',
    metaClassName: 'me-1',
    color: 'warning',
  },
  {
    title: 'Corte de Pelo',
    content: 'Realización de mechas californianas.',
    color: 'info',
    meta: '1 Febrero 2023',
    metaClassName: 'me-1',
  },
  {
    title: 'Tratamiento Estético',
    content: 'Masaje exfoliante de poros.',
    color: 'danger',
    meta: '30 Enero 2023',
    metaClassName: 'me-1'
  }
]

const UserTimeline = () => {
  return (
    <Card className='card-user-timeline'>
      <CardHeader>
        <div className='d-flex align-items-center'>
          <List className='user-timeline-title-icon' />
          <CardTitle tag='h4'>Ultimas Citas</CardTitle>
        </div>
        <MoreVertical size={18} className='cursor-pointer' />
      </CardHeader>
      <CardBody>
        <Timeline className='ms-50 mb-0' data={data} />
      </CardBody>
    </Card>
  )
}

export default UserTimeline
