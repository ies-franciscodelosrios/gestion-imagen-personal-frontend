// ** React Imports
import { Fragment, useEffect } from 'react'

// ** Custom Components
import classnames from 'classnames'

// ** Reactstrap Imports
import { Card, CardBody, Button, Input, Label } from 'reactstrap'

// ** illustration import
import illustration from '@src/assets/images/pages/ilustracion-calendario.png'
import { fetchEvents } from './store'

// ** Filters Checkbox Array
const filters = [
  { label: 'Peluquería',  className: 'form-check-danger mb-1', value:0 },
  { label: 'Estética', className: 'form-check-warning mb-1',value:1 },
]




const SidebarLeft = props => {
  // ** Props
  const { handleAddEventSidebar, toggleSidebar, updateFilter, updateAllFilters, store, dispatch } = props

  // ** Function to handle Add Event Click
  const handleAddEventClick = () => {
    toggleSidebar(false)
    handleAddEventSidebar()
  }
  console.log(filters.length);
  console.log(store.selectedCalendars);
  
  return (
    <Fragment>
      <Card className='sidebar-wrapper shadow-none'>
        <CardBody className='card-body d-flex justify-content-center my-sm-0 mb-3'>
          <Button color='primary' block onClick={handleAddEventClick}>
            <span className='align-middle'>Añadir Cita</span>
          </Button>
        </CardBody>
               
        <CardBody>
          <h5 className='section-label mb-1'>
            <span className='align-middle'>Filtro</span>
          </h5>
          <div className='form-check mb-1'>
            <Input
              id='view-all'
              type='checkbox'
              label='View All'
              className='select-all'
              checked={store.selectedCalendars.length === filters.length}
              onChange={e => dispatch(updateAllFilters(e.target.checked))}
            />
            <Label className='form-check-label' for='view-all'>
              Ver Todo
            </Label>
          </div>
   
          <div className='calendar-events-filter'>
            {filters.length &&
              filters.map(filter => {
                return (
                  <div
                    key={`${filter.label}-key`}
                    className={classnames('form-check', {
                      [filter.className]: filter.className
                    })}
                  >
                    <Input
                      type='checkbox'
                      key={filter.label}
                      label={filter.label}
                      className='input-filter'
                      id={`${filter.label}-event`}
                      checked={store.selectedCalendars.includes(filter.value)}
                      onChange={() => {
                        dispatch(updateFilter(filter.value))
                        console.log(store);
                        dispatch(fetchEvents(store))
                      }}
                    />
                    <Label className='form-check-label' for={`${filter.label}-event`}>
                      {filter.label}
                    </Label>
                  </div>
                )
              })}
          </div> 
        </CardBody>
      </Card>
      <div className='mt-auto'>
        <img className='img-fluid' src={illustration} alt='illustration' />
      </div>
    </Fragment>
  )
}

export default SidebarLeft