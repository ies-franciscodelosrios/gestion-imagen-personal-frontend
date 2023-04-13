// ** React Imports
import { Outlet } from 'react-router-dom'

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'

// ** Menu Items Array
import navigation from '@src/navigation/vertical'
import studentnavigation from '@src/navigation/studentvertical'

const VerticalLayout = props => {
  // const [menuData, setMenuData] = useState([])

  // ** For ServerSide navigation
  // useEffect(() => {
  //   axios.get(URL).then(response => setMenuData(response.data))
  // }, [])
  const userdata = JSON.parse(localStorage.getItem('userData'));
if (userdata.rol >= 2) { 
  return (
    <Layout menuData={studentnavigation} {...props}>
      <Outlet />
    </Layout>
  )
} else {
  return (
    <Layout menuData={navigation} {...props}>
      <Outlet />
    </Layout>
  )
}
}

export default VerticalLayout
