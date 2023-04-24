// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'

// ** Custom Components
import UILoader from '@components/ui-loader'
import Breadcrumbs from '@components/breadcrumbs'

// ** Reactstrap Imports
import { Row, Col, Button } from 'reactstrap'

// ** Demo Components
import ProfilePoll from './ProfilePolls'
import ProfileAbout from './ProfileAbout'
import ProfilePosts from './ProfilePosts'
import ProfileHeader from './ProfileHeader'
import ProfileLatestPhotos from './ProfileLatestPhotos'
import ProfileSuggestedPages from './ProfileSuggestedPages'
import ProfileFriendsSuggestions from './ProfileFriendsSuggestions'

// ** Styles
import '@styles/react/pages/page-profile.scss'

const Profile = () => {
  // ** States
  const [data, setData] = useState('')
  const [block, setBlock] = useState(false)

  const handleBlock = () => {
    setBlock(true)
    setTimeout(() => {
      setBlock(false)
    }, 2000)
  }

  useEffect(() => {
    //axios.get('/profile/data').then(response => setData(response.data))
  }, [])
  return (
    <Fragment>
      <Breadcrumbs title='Perfil' data={[{ title: 'Pages' }, { title: 'Profile' }]} />
      {data !== null ? (
        <div id='user-profile'>
          {/* <Row>
            <Col sm='12'>
              <ProfileHeader data={data.header} />
            </Col>
          </Row> */}
          <section id='profile-info'>
            {/* <Row>
              <Col lg={{ size: 3, order: 1 }} sm={{ size: 12 }} xs={{ order: 2 }}>
                <ProfileAbout data={data.userAbout} />
                <ProfileSuggestedPages data={data.suggestedPages} />
              </Col>
              <Col lg={{ size: 6, order: 2 }} sm={{ size: 12 }} xs={{ order: 1 }}>
                <ProfilePosts data={data.post} />
              </Col>
              <Col lg={{ size: 3, order: 3 }} sm={{ size: 12 }} xs={{ order: 3 }}>
                <ProfileLatestPhotos data={data.latestPhotos} />
                <ProfileFriendsSuggestions data={data.suggestions} />
                <ProfilePoll data={data.polls} />
              </Col>
            </Row> */}
          </section>
        </div>
      ) : null}
    </Fragment>
  )
}

export default Profile
