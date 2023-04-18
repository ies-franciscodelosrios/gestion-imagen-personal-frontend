// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Modal,
  Badge,
  Label,
  Input,
  Button,
  CardBody,
  CardTitle,
  ModalBody,
  CardHeader,
  InputGroup,
  ModalHeader,
  FormFeedback,
  InputGroupText
} from 'reactstrap'

// ** Third Party Components
import classnames from 'classnames'
import Cleave from 'cleave.js/react'
import { Plus, Check, X } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'

// ** Card Images
import visaIcon from '@src/assets/images/icons/payments/visa.png'
import jcbCC from '@src/assets/images/icons/payments/jcb-cc.png'
import amexCC from '@src/assets/images/icons/payments/amex-cc.png'
import uatpCC from '@src/assets/images/icons/payments/uatp-cc.png'
import visaCC from '@src/assets/images/icons/payments/visa-cc.png'
import dinersCC from '@src/assets/images/icons/payments/diners-cc.png'
import maestroCC from '@src/assets/images/icons/payments/maestro-cc.png'
import discoverCC from '@src/assets/images/icons/payments/discover-cc.png'
import mastercardIcon from '@src/assets/images/icons/payments/mastercard.png'
import americanExIcon from '@src/assets/images/icons/payments/american-ex.png'
import mastercardCC from '@src/assets/images/icons/payments/mastercard-cc.png'

const cardsObj = {
  jcb: jcbCC,
  uatp: uatpCC,
  visa: visaCC,
  amex: amexCC,
  diners: dinersCC,
  maestro: maestroCC,
  discover: discoverCC,
  mastercard: mastercardCC
}

const data = [
  {

    name: 'Examen Peluqueria',
    date: '04/3/2023',

  },
  {


    name: 'Charla sobre practicas laborales',
    date: '10/03/2023',
  },
  {

    name: 'Reunion de profesorado',
    date: '08/04/2023',
  }
]

const PaymentMethods = () => {
  // ** States
  const [show, setShow] = useState(false)
  const [cardType, setCardType] = useState('')
  const [selected, setSelected] = useState(null)

  // ** Hooks
  const {
    reset,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({ cardNumber: '' })

  const selectedCondition = selected !== null

  const openEditModal = card => {
    setValue('cardNumber', card.cardNumber)
    setSelected(card)
    setShow(true)
  }

  const openAddModal = () => {
    setSelected(null)
    setShow(true)
  }

  const onSubmit = data => {
    if (data.cardNumber && data.cardNumber.length > 0) {
      setShow(show)
    } else {
      setError('cardNumber', {
        type: 'manual'
      })
    }
  }

  const onModalClosed = () => {
    reset()
    setCardType('')
    setSelected(null)
    setShow(false)
  }

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Proximos eventos</CardTitle>
          {/*    <Button color='primary' size='sm' onClick={openAddModal}>
            <Plus className='me-50' size={14} />
            <span>Add Card</span>
          </Button> */}
        </CardHeader>
        <CardBody>
          <div className='added-cards'>
            {data.map((card, index) => {
              const isLastCard = index === data.length - 1
              return (
                <div
                  key={index}
                  className={classnames('cardMaster rounded border p-2', {
                    'mb-1': !isLastCard
                  })}
                >
                  <div className='d-flex justify-content-between flex-sm-row flex-column'>
                    <div className='card-information'>

                      <div className='d-flex align-items-center mb-50'>
                        <h6 className='mb-0'>{card.name}</h6>

                      </div>

                    </div>
                    <div className='d-flex flex-column text-start text-lg-end'>

                      <span >Fecha del evento: {card.date}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardBody>
      </Card>

    </Fragment>
  )
}

export default PaymentMethods
