// ** Reactstrap Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Imports
import axios from 'axios'

// ** Demo Components
import Faqs from './Faqs'
import FaqFilter from './FaqFilter'
import FaqContact from './FaqContact'

// ** Custom Component
import Breadcrumbs from '@components/breadcrumbs'

// ** Styles
import '@styles/base/pages/page-faq.scss'
import { ApiGetFaq } from '../../../services/api'

const Faq = () => {
  // ** States
  const [data, setData] = useState(null),
    [searchTerm, setSearchTerm] = useState('')

  const getFAQData = query => {
  const data = {
    DashBoard: {
      icon: 'Bookmark',
      title: 'Dashboard',
      subtitle: 'Dudas relacionadas con el bookmark',
      qandA: [
        {
          question: '¿Que representan las estadisticas?',
          ans: 'Las estadisticas mostradas en el Dashboard son el total de alumnos matriculados en el centro, el porcentaje de cuantos estan matriculados en el curso de peluqueria, el porcentaje de cuantos estan matriculados en el el curso de estetica  y finalmente cuantas citas hay registradas en la actualidad'
        },
        {
          question: '¿Como puedo ver mi perfil?',
          ans: 'Para ver el perfil solo hay que pulsar el boton azul de "Ver Perfil"'
        },
        {
          question: '¿Que significa GS y GM?',
          ans: 'GS significa grado superior, GM significa grado medio'
        }
      ]
    } ,
    Calendario: {
      icon: 'Calendar',
      title: 'Calendario',
      subtitle: 'Dudas relacionadas con el calendario',
      qandA: [
        {
          question: '¿Como puedo añadir citas?',
          ans: 'Pulsando el boton de "añadir cita" y rellenando el formulario.'
        }, 
        {
          question: '¿Como puedo filtrar citas?',
          ans: 'Para poder filtrar las distintas citas en el calendario puedes pulsar los botones situados a la derecha del calendario.'
        }, 
        {
          question: '¿Como se pueden ocultar citas?',
          ans: 'Para ocultar citas solo se debe clicar en la casilla del tipo de cita que quieres ocultar y se ocultaran.'
        }
      ]
    },
    Clientes: {
      icon: 'User',
      title: 'Clientes',
      subtitle: 'Dudas relacionadas con los clientes',
      qandA: [
        {
          question: '¿Como puedo ver mas clientes en la pantalla?',
          ans: 'Para cargar mas clientes en la pantalla hay que pulsar en "ver" y seleccionar la cantidad de clientes que quieres ver'
        },
        {
          question: '¿Como puedo añadir mas clientes ?',
          ans: 'Para añadir mas clientes debes pulsar el botón de "añadir nuevo cliente" y rellenar el formulario '
        },
        {
          question: '¿Se pueden exportar los clientes?',
          ans: 'Si, para exportar solo hay que pulsar el boton de "exportar clientes" y selecciona en que formato quieres exportar la lista de clientes'
        }
      ]
    },
        Profesores: {
          icon: 'User',
          title: 'Profesores',
          subtitle: 'Dudas relacionadas con el profesorado',
          qandA: [
            {
              question: '¿Cómo puedo contactar con un profesor',
              ans: 'Para poder contactar con un profesor puede buscar su nombre en la página de departamentos del centro y escribir un correo electrónico a su correo del centro personal'
            },
            {
              question:
                '¿Los profesores están presentes durante los servicios a los clientes?',
              ans: 'Los profesores están presentes durante los servicios a los clientes para supervisar a los alumnos'
            },  {
              question: '¿Como puedo ver más profesores en la pantalla?',
              ans: 'Para cargar mas profesores en la pantalla hay que pulsar en "ver" y seleccionar la cantidad de profesores que quieres ver'
            },
            {
              question: '¿Como puedo añadir mas profesores ?',
              ans: 'Para añadir mas profesores debes pulsar el botón de "añadir nuevo profesor" y rellenar el formulario '
            },
            {
              question: '¿Se pueden exportar los profesores?',
              ans: 'Si, para exportar solo hay que pulsar el boton de "exportar profesores" y selecciona en que formato quieres exportar la lista de profesores'
            }
          ]
        },
        
        Alumnos: {
          icon: 'User',
          title: 'Alumnos',
          subtitle: 'Dudas relacionadas con el alumnado',
          qandA: [
            {
              question: '¿Se necesita algún tipo de seguro para realizar las prácticas en el centro?',
              ans: 'si'
            },  {
              question: '¿Como puedo ver más alumnos en la pantalla?',
              ans: 'Para cargar mas alumnos en la pantalla hay que pulsar en "ver" y seleccionar la cantidad de alumnos que quieres ver'
            },
            {
              question: '¿Como puedo añadir mas alumnos ?',
              ans: 'Para añadir mas alumnos debes pulsar el botón de "añadir nuevo alumnos" y rellenar el formulario '
            },
            {
              question: '¿Se pueden exportar los alumnos?',
              ans: 'Si, para exportar solo hay que pulsar el boton de "exportar alumnos" y selecciona en que formato quieres exportar la lista de alumnos'
            }
          ]
        },
        Servicios: {
          icon: 'CreditCard',
          title: 'Servicios',
          subtitle: 'Dudas relacionadas con los servicios ofrecidos',
          qandA: [
            {
              question: '¿Qué servicios ofrecen en el centro?',
              ans: 'Se ofrecen servicios de peluquería y maquillaje'
            },
            {
              question: '¿Cuáles son los precios de los servicios?',
              ans: 'Los precios varían según el tratamiento recibido'
            },
            {
              question: '¿Cómo puedo realizar una cita?',
              ans: 'Para poder solicitar una cita se debe enviar un mensaje de whatsapp al siguiente correo y esperar confirmación 671 565 029'
            },
            {
              question: '¿Cómo puedo cancelar una cita?',
              ans: 'Para poder cancelar una cita se debe enviar un mensaje de whatsapp al teléfono 671 565 029'
            },
            {
              question: '¿Cómo puedo contactar con su centro para hacer preguntas o reservar una cita?',
              ans: 'Para poder contactar con el centro puede visitarnos durante el horario de apertura o llamar al telefono fijo 957 37 99 45'
            },
            {
              question: '¿Cuál es el nivel de experiencia y capacitación de los alumnos en el centro?',
              ans: ' Nuestros alumnos tienen la capacitacion adecuada para trabajar con personas'
            },
            {
              question: '¿Tienen una política de devolución o reembolso en caso de insatisfacción con los servicios?',
              ans: ' En caso de que el tratamiento no sea satisfacctorio se discutira con el profesorado las medidas de devolucion o reembolso y nunca con el alumno'
            }
          ]
        },
        SobreElCentro: {
          icon: 'Home',
          title: 'Sobre el centro',
          subtitle: 'Dudas relacionadas con el centro ',
          qandA: [
            {
              question: '¿Qué tipos de cursos ofrecen en su centro?',
              ans: ' En el centro se ofrecen un curso de Peluquería y cosmética capilar y otro cursos de  Estética y belleza'
            },
            {
              question: '¿Cuáles son los requisitos de ingreso para los diferentes cursos?',
              ans: 'Para poder acceder a los cursos de grado medio se necesitan los siguientes requisitos: 1.-Estar en posesión de un título de Técnico Auxiliar. 2.-Haber superado un curso de formación específico para el acceso a ciclos formativos de grado medio. .-Tener 17 años cumplidos en el año de finalización del curso. Para acceder a los cursos de grado superior se debe tener uno de los siguientes requisitos: 1.-Tener el Título de Bachillerato. 2.-Tener un certificado que acredite el tener superadas todas las materias del Bachillerato. 3.-Haber aprobado el segundo curso de cualquier modalidad de Bachillerato experimental. 4.-Tener un Título de Técnico de Grado Superior o equivalente.'
            },
            {
              question: '¿Cuáles son las oportunidades de empleo después de completar los cursos en su centro de formación profesional?',
              ans: 'Los alumnos matriculados en los cursos de formación profesional tienen más posibilidad de encontrar empleo tras la realización de cursos gracias a las prácticas laborales realizadas en empresas reales, ya que muchas contratan a los alumnos tras la finalización del curso. En caso de que no sean contratados la experiencia laboral ganada suele ser un factor positivo a la hora de buscar empleo en otra empresa'
            }
          ]
        },
        
       
         
       
      
    }
      /*return ApiGetFaq()
    .then((response) =>{
      console.log(response);
      //setData(response.questions.Question)
    })
    .catch(
      setData('faqData: { // payment  payment: { icon: "CreditCard", title: "Payment", subtitle: "Which license do I pollas?", qandA: [ { question: "Does my subscription automatically renew?",  ans: "Pastry pudding cookie toffee bonbon jujubes jujubes powder topping. Jelly beans gummi bears sweet roll bonbon muffin liquorice. Wafer lollipop sesame snaps. Brownie macaroon cookie muffin cupcake candy caramels tiramisu. Oat cake chocolate cake sweet jelly-o brownie biscuit marzipan. Jujubes donut marzipan chocolate bar. Jujubes sugar plum jelly beans tiramisu icing cheesecake."}')
    ) */
    
    setData(data)

  }

  useEffect(() => {
    getFAQData(searchTerm)
  }, [])

  return (
    <Fragment>
      <Breadcrumbs title='FAQ' data={[{ title: 'Pages' }, { title: 'FAQ' }]} />
      <FaqFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} getFAQData={getFAQData} />
      {data !== null ? <Faqs data={data} searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> : null}
      <FaqContact />
    </Fragment>
  )
}

export default Faq
