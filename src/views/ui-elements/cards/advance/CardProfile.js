// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardBody, CardImg, Badge } from 'reactstrap'

// ** Images
import coverImg from '@src/assets/images/banner/banner-5.jpg'
import profileImg from '@src/assets/images/portrait/small/avatar-s-7.jpg'

const CardProfile = () => {
  return (
    <Card className='card-profile'>
      <CardImg className='img-fluid' src={coverImg} top />
      <CardBody>
        <div className='profile-image-wrapper'>
          <div className='profile-image'>
            <Avatar img={profileImg} />
          </div>
        </div>
        <h3>Sonia Torres</h3>
        <h6 className='text-muted'>Peluqueria</h6>
        <Badge className='profile-badge' color='light-primary'>
          2022/2023
        </Badge>
        <hr className='mb-2' />
        <div className='d-flex justify-content-between align-items-center'>
          <div>
            <h6 className='text-muted fw-bolder'>Followers</h6>
            <h3 className='mb-0'>10.3k</h3>
          </div>
          <div>
            <h6 className='text-muted fw-bolder'>U.Clientes</h6>
            <h3 className='mb-0'>56 </h3>
          </div>
          <div>
            <h6 className='text-muted fw-bolder'>Citas</h6>
            <h3 className='mb-0'>23 </h3>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default CardProfile
