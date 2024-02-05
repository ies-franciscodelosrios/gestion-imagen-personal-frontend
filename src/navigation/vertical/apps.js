// ** Icons Import
import {
  Mail,
  MessageSquare,
  CheckSquare,
  Calendar,
  FileText,
  Circle,
  ShoppingCart,
  Users,
} from "react-feather";

export default [
  {
    header: "Aplicación",
  },

  {
    id: "calendar",
    title: "Calendario",
    icon: <Calendar size={20} />,
    navLink: "/apps/calendar",
  },
  {
    id: "clientList",
    title: "Clientes",
    icon: <Users size={12} />,
    navLink: "/apps/client/list",
  },
  {
    id: "ProfessorList",
    title: "Profesores",
    icon: <Users size={12} />,
    navLink: "/apps/profesor/list",
  },
  {
    id: "PupilList",
    title: "Alumnos",
    icon: <Users size={12} />,
    navLink: "/apps/student/list",
  },
  {
    id: "VocEduList",
    title: "FP",
    icon: <Users size={12} />,
    navLink: "/apps/vocationaleducation/list",
  },
];
