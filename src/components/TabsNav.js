import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import HomeScreen from './HomeScreen'
import AddPlantScreen from './AddPlantScreen'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#EAD6C6"
  },
}));

export default function TabsNav(props) {
  const [jsonToken] = useState(props.jsonToken);
  const [userId] = useState(props.userId);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function tryToDeleteAccount() {
    try {
      let response = await fetch('https://afternoon-depths-99413.herokuapp.com/deleteAccount', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + jsonToken
        },
        body: JSON.stringify({
          "username": props.username,
          "password": props.password
        }),
      });
      let responseStatus = await response.status;

      if (responseStatus == 200) {
        //Look into this
        console.log(response.json);
        props.returnLogedIn(false);
      }
      else {
        console.log(responseStatus + " " + userId + " " + jsonToken);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div style={{
      display: 'flex', height: "100%", width: "100%", backgroundColor: "#EAD6C6", margin: 0
    }}>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                <Tab label="Praćenje biljke" {...a11yProps(0)} />
                <Tab label="Dodaj biljku" {...a11yProps(1)} />
                <Tab label="Upravljanje računom" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} style={{ backgroundColor: "#EAD6C6" }}>
          <HomeScreen jsonToken={jsonToken} userId={userId} />
        </TabPanel>
        <TabPanel value={value} index={1} style={{ backgroundColor: "#EAD6C6" }}>
          <AddPlantScreen jsonToken={jsonToken} userId={userId} />
        </TabPanel>
        <TabPanel value={value} index={2} style={{ backgroundColor: "#EAD6C6" }}>
          <div style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 50 }}>
            <p>Korisničko ime: {props.username}</p>
            <p>Email: {props.email}</p>
            <br />
            <Button onClick={() => (props.returnLogedIn(false))}>Odjavi me</Button>
            <br />
            <Button onClick={() => tryToDeleteAccount()}>Obriši račun</Button>
          </div>
        </TabPanel>
      </div>
    </div>
  );
}