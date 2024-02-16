// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
import { store } from "@store/store";
import { getVocationalEducation, deleteVocationalEducation } from "../store";

// ** Icons Imports
import {
  Slack,
  User,
  Settings,
  Database,
  Edit2,
  MoreVertical,
  FileText,
  Trash2,
  Archive,
} from "react-feather";

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// ** Renders Client Columns

const renderVocEdu = (row) => {
  if (false && row.avatar.length) {
    return <Avatar className="me-1" img={row.avatar} width="32" height="32" />;
  } else {
    return (
      <Avatar
        initials
        className="me-1"
        color={"light-primary"}
        content={row.short_name || "John Doe"}
      />
    );
  }
};

// ** Renders Role Columns
const renderRole = (row) => {
  const roleObj = {
    subscriber: {
      class: "text-primary",
      icon: User,
    },
    maintainer: {
      class: "text-success",
      icon: Database,
    },
    editor: {
      class: "text-info",
      icon: Edit2,
    },
    author: {
      class: "text-warning",
      icon: Settings,
    },
    admin: {
      class: "text-danger",
      icon: Slack,
    },
  };

  const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2;

  return (
    <span className="text-truncate text-capitalize align-middle">
      <Icon
        size={18}
        className={`${roleObj[row.role] ? roleObj[row.role].class : ""} me-50`}
      />
      {row.role}
    </span>
  );
};

const statusObj = {
  pending: "light-warning",
  active: "light-success",
  inactive: "light-secondary",
};

export const columns = [
  {
    name: "Ciclo",
    sortable: true,
    minWidth: "300px",
    sortField: "cycle",
    selector: (row) => row.short_name,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderVocEdu(row)}
        <div className="d-flex flex-column">
          <Link
            to={`/apps/vocationaleducation/view/${row.id}`}
            className="user_name text-truncate text-body"
            onClick={() => store.dispatch(getVocationalEducation(row.id))}
          >
            <span className="fw-bolder">
              {row.short_name}
            </span>
          </Link>
        </div>
      </div>
    ),
  },
  {
    name: "Nombre Completo",
    sortable: true,
    minWidth: "300px",
    sortField: "cycle_long",
    selector: (row) => row.long_name,
    cell: (row) => <span>{row.long_name}</span>,
  },
];
