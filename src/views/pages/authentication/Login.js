// ** React Imports
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin';
import { ApiLogin } from '../../../services/api';
import { setToken, getToken } from '../../../services/UseToken';
import { getAllUserData } from '../../../services/api';
// ** Third Party Components
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { HelpCircle, Coffee, X } from 'react-feather';

// ** Actions
import { handleLogin } from '@store/authentication';

// ** Context
import { AbilityContext } from '@src/utility/context/Can';

// ** Custom Components
import Avatar from '@components/avatar';
import InputPasswordToggle from '@components/input-password-toggle';

// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Alert,
  Button,
  CardText,
  CardTitle,
  FormFeedback,
  UncontrolledTooltip,
} from 'reactstrap';

// ** Illustrations Imports
import illustrationsLight from '@src/assets/images/pages/login-v3.svg';
import illustrationsDark from '@src/assets/images/pages/login-v3-dark.svg';
import logo from '@src/assets/images/logo/pericles.svg';

// ** Styles
import '@styles/react/pages/page-authentication.scss';

const ToastContent = ({ t, name, role }) => {
  return (
    <div className="d-flex">
      <div className="me-1">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
      </div>
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between">
          <h6>{name}</h6>
          <X
            size={12}
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
          />
        </div>
        <span>
          Has accedido correctamente con el rol {role} al Dashboard. Ahora puede
          comenzar con el trabajo. Disfruta!
        </span>
      </div>
    </div>
  );
};

const defaultValues = {
  password: 'root',
  loginEmail: 'admin@iestablero',
};

const Login = () => {
  // ** Hooks
  const { skin } = useSkin();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ability = useContext(AbilityContext);
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const source = skin === 'dark' ? illustrationsDark : illustrationsLight;

  function getrol(params) {
    return params >= 2 ? 'Alumno' : 'Profesor';
  }

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {

        ApiLogin(data.loginEmail, data.password)
          .then((response) => {
            setToken(response.data.token);
            ability.update([{"action": "manage","subject": "all"}]);

            /**
             * UserData Request to login
             */
            getAllUserData(data.loginEmail).then((promis) => {
              const data = {
                ...promis.data.users,
                token: getToken(),
                ability : [{"action": "manage","subject": "all"}],
                rol : getrol(promis.data.users.Rol),
                fullName : ''.concat(promis.data.users.Name,' ', promis.data.users.Surname)
              };
              dispatch(handleLogin(data));
              navigate(getHomeRouteForLoggedInUser(promis.data.users.Rol));
              toast((t) => (
                <ToastContent
                  t={t}
                  role={data.rol || 'admin'}
                  name={data.fullName || data.username || 'Sonia Torres'}
                />
              ));
            });
          })
          .catch((err) => {
            for (const key in data) {
              if (key.toString() == 'password') {
                setError(key, {
                  type: 'manual',
                  message: 'Correo o contrase??a incorecta'
                });
              }else{
                setError(key, {
                  type: 'manual',
                });
              }
            }
            
          });

    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual',
          });
        }
      }
    }
  };

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link
          className="brand-logo d-flex align-items-center"
          to="/"
          onClick={(e) => e.preventDefault()}
        >
          <img
            src={logo}
            alt="insertar SVG con la etiqueta image"
            width="64"
            height="72"
          ></img>
          <h1 className="brand-text text-primary ms-1 my-0">I.E.S. TABLERO</h1>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Bienvenido al I.E.S. TABLERO! ????
            </CardTitle>
            <CardText className="mb-2">
              Inicie sesi??n con su cuenta y empize un nuevo dia
            </CardText>
            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  Usuario / Email
                </Label>
                <Controller
                  id="loginEmail"
                  name="loginEmail"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type="email"
                      placeholder="john@example.com"
                      invalid={errors.loginEmail && true}
                      {...field}
                    />
                  )}
                />
                {errors.loginEmail && (
                  <FormFeedback>{errors.loginEmail.message}</FormFeedback>
                )}
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="password">
                    Contrase??a
                  </Label>
                  <Link to="/forgot-password">
                    <small>Olvidaste la Contrase??a?</small>
                  </Link>
                </div>
                <Controller
                  id="password"
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      className="input-group-merge"
                      invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />
              {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
              </div>
              <div className="form-check mb-1">
                <Input type="checkbox" id="remember-me" />
                <Label className="form-check-label" for="remember-me">
                  Recuerdame
                </Label>
              </div>
              <Button type="submit" color="primary" block>
                Iniciar Sesi??n
              </Button>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
