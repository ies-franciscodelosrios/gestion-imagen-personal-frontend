// ** Custom Components
import Timeline from '@components/timeline'
import TimelineDashboard from '../../../../@core/components/timeline/TimelineDashboard'

// ** Icons Imports
import { List, MoreVertical } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from 'reactstrap'
import { useEffect, useState } from 'react'
import { getAppointmentPaged } from '../../../../services/api'


const UserTimeline = () => {
  const [appointments, setappointments] = useState(null);

useEffect(() => {
  getAppointmentPaged({
    "page": 1,
    "perpage": 5,
    "searchtext": "",
    "dni_student": JSON.parse(localStorage.getItem('userData')).id
  }).then((e)=>{
    setappointments(e.data.data);
  });
  
}, [])


  return (
    <Card className='card-user-timeline'>
      <CardHeader>
        <div className='d-flex align-items-center'>
          <List className='user-timeline-title-icon' />
          <CardTitle tag='h4'>Ultimas Citas</CardTitle>
        </div>
      </CardHeader>
      <CardBody>
        <TimelineDashboard className='ms-50 mb-0' data={appointments} />
      </CardBody>
      {appointments == null || appointments.length<=0 ? <CardFooter>No se ha encontrado ninguna cita</CardFooter>:<></>}
    </Card>
  )
}

export default UserTimeline
