// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import axios from 'axios'
import classnames from 'classnames'
import * as Icon from 'react-feather'

// ** Reactstrap Imports
import { NavItem, NavLink } from 'reactstrap'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleSearchQuery } from '@store/navbar'

// ** Custom Components
import Autocomplete from '@components/autocomplete'

const NavbarSearch = () => {
  // ** Store Vars
  const dispatch = useDispatch()

  // ** States
  const [suggestions, setSuggestions] = useState([])
  const [navbarSearch, setNavbarSearch] = useState(false)

  // ** ComponentDidMount
  useEffect(() => {

  }, [])

  // ** Removes query in store
  const handleClearQueryInStore = () => dispatch(handleSearchQuery(''))

  // ** Function to handle external Input click
  const handleExternalClick = () => {
    if (navbarSearch === true) {
      setNavbarSearch(false)
      handleClearQueryInStore()
    }
  }

  // ** Function to clear input value
  const handleClearInput = setUserInput => {
    if (!navbarSearch) {
      setUserInput('')
      handleClearQueryInStore()
    }
  }

  // ** Function to close search on ESC & ENTER Click
  const onKeyDown = e => {
    if (e.keyCode === 27 || e.keyCode === 13) {
      setTimeout(() => {
        setNavbarSearch(false)
        handleClearQueryInStore()
      }, 1)
    }
  }

  // ** Function to handle search suggestion Click
  const handleSuggestionItemClick = () => {
    setNavbarSearch(false)
    handleClearQueryInStore()
  }

  // ** Function to handle search list Click
  const handleListItemClick = (func, link, e) => {
    func(link, e)
    setTimeout(() => {
      setNavbarSearch(false)
    }, 1)
    handleClearQueryInStore()
  }

  return (
    <NavItem className='nav-search' onClick={() => setNavbarSearch(true)}>

    </NavItem>
  )
}

export default NavbarSearch
