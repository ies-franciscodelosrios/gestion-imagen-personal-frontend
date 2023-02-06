// ** Custom Components
import Avatar from '@components/avatar'
import Timeline from '@components/timeline'
import AvatarGroup from '@components/avatar-group'

// ** Icons Imports
import { List, MoreVertical } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

// ** Images
import jsonImg from '@src/assets/images/icons/json.png'

// ** Avatar Imports
import avatar6 from '@src/assets/images/portrait/small/avatar-s-6.jpg'
import avatar7 from '@src/assets/images/portrait/small/avatar-s-7.jpg'
import avatar8 from '@src/assets/images/portrait/small/avatar-s-8.jpg'
import avatar9 from '@src/assets/images/portrait/small/avatar-s-9.jpg'
import avatar20 from '@src/assets/images/portrait/small/avatar-s-20.jpg'

const avatarGroupArr = [
  {
    title: 'Daisy Weber',
    img: avatar7,
    placement: 'bottom',
    imgHeight: 33,
    imgWidth: 33
  },
  {
    title: 'Jenny Looper',
    img: avatar20,
    placement: 'bottom',
    imgHeight: 33,
    imgWidth: 33
  }
]

const data = [
  {
    title: 'Corte de Pelo',
    content: 'Degradado mid-fadde y barba.',
    meta: '3 Febrero 2023',
    metaClassName: 'me-1'
  },
  {
    title: 'Asesoramiento Estético',
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
    customContent: (
      <div className='d-flex align-items-center'>
        <Avatar img={avatar9} />
        <div className='ms-50'>
          <h6 className='mb-0'>Palbo Laguna (Client)</h6>
          <span>Jardinero</span>
        </div>
      </div>
    )
  },
  {
    title: 'Corte de Pelo',
    content: 'Realización de mechas californianas.',
    color: 'info',
    meta: '1 Febrero 2023',
    metaClassName: 'me-1',
    customContent: <AvatarGroup data={avatarGroupArr} />
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
