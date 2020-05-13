import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import HomeScreen from './HomeScreen'
import AddPlantScreen from './AddPlantScreen'

import Background from '../assets/bckg-large.png';

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
  card: {
    minWidth: 275,
  },
}));

export default function TabsNav(props) {
  const classes = useStyles();

  const [jsonToken] = useState(props.jsonToken);
  const [userId] = useState(props.userId);

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
          <div style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: '20%', paddingTop: 20, paddingBottom: 0 }}>
            <Card className={classes.card}>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="300"
                src={Background}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2" style={{ paddingLeft: 15, marginBottom: 20 }}>
                  Upravljanje računom
                  </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ paddingLeft: 15 }}>
                  Vještina uzgoja: indikator
                </Typography>
                <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                <Typography variant="body2" color="textSecondary" component="p" style={{ paddingLeft: 15 }}>
                  Uzgojeno biljaka: koliko god
                </Typography>
                <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                <Typography variant="body2" color="textSecondary" component="p" style={{ paddingLeft: 15 }}>
                  Korisničko ime: {props.username}
                </Typography>
                <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                <Typography variant="body2" color="textSecondary" component="p" style={{ paddingLeft: 15 }}>
                  Email: {props.email}
                </Typography>
                <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                <Typography variant="body2" color="textSecondary" component="p" style={{ paddingLeft: 15 }}>
                  Datum registracije: {moment(props.date).format('DD.MM.YYYY')}
                </Typography>
                <Divider style={{ marginTop: 10 }} />
              </CardContent>
              <CardActions style={{ paddingLeft: 20 }}>
                <Button onClick={() => {props.returnLogedIn(false); props.returnLogin(false)}}>Odjavi me</Button>
                <br />
                <Button onClick={() => tryToDeleteAccount()}>Obriši račun</Button>
              </CardActions>
            </Card>
          </div>
        </TabPanel>
      </div>
    </div>
  );
}