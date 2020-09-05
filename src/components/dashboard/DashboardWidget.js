import React from "react";
import clsx from "clsx";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PostAddIcon from "@material-ui/icons/PostAdd";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { TicketContext } from "../../context";

const DashboardWidget = props => {
  const tickets = useContext(TicketContext).tickets;
  const investigators = useContext(TicketContext).investigators;
  console.log(investigators);
  return (
    <div>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(
            props.classes.drawerPaper,
            !props.open && props.classes.drawerPaperClose
          )
        }}
        open={props.open}
      >
        <div className={props.classes.toolbarIcon}>
          <IconButton onClick={props.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        {/* main list items */}
        <List>
          <ListItem button>
            <ListItemIcon>
              <Link
                to={{
                  pathname: "/dashboard",
                  state: {
                    email: props.email,
                    role: props.role,
                    name: props.name
                  }
                }}
              >
                <DashboardIcon />
              </Link>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <Divider />
          <ListSubheader inset>Main</ListSubheader>
          <ListItem button>
            <ListItemIcon>
              <Link
                to={{
                  pathname: "/dashboard/view-ticket",
                  state: {
                    email: props.email,
                    role: props.role
                  }
                }}
              >
                <PostAddIcon />
              </Link>
            </ListItemIcon>
            <ListItemText primary="Tickets" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Complainants" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Link
                to={{
                  pathname: "/dashboard/report",
                  state: {
                    email: props.email,
                    role: props.role,
                    tickets: tickets,
                    investigators: investigators
                  }
                }}
              >
                <BarChartIcon />
              </Link>
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
        </List>
        <Divider />
        {/* secondary list items */}
        <List>
          <ListSubheader inset>Saved Reports</ListSubheader>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end" />
          </ListItem>
        </List>
        <Divider />
        {/* tertiary list items */}
        <List>
          <ListSubheader inset>Help</ListSubheader>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Getting Started" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="FAQs" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Support" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
};

export default DashboardWidget;
