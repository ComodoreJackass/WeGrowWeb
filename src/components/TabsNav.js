import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Line, Circle } from 'rc-progress';

import 'react-circular-progressbar/dist/styles.css';

import HomeScreen from './HomeScreen'
import AddPlantScreen from './AddPlantScreen'

import Background from '../assets/accImage.png';

import A1 from '../assets/a1.png';
import A2 from '../assets/a2.png';
import A3 from '../assets/a3.png';
import A4 from '../assets/a4.png';

import { ReactComponent as Logo } from '../assets/logo.svg';
import Banner from '../assets/header.png'

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
    backgroundColor: "#FFF"
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

  const [done, setDone] = useState(0);
  const [doneC, setDoneC] = useState(0);
  const [doneP, setDoneP] = useState(0);
  const [doneZ, setDoneZ] = useState(0);
  const [doneV, setDoneV] = useState(0);

  async function tryToLogIn() {
    try {
      let response = await fetch('https://afternoon-depths-99413.herokuapp.com/progress/byId', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + jsonToken
        },
        body: JSON.stringify({
          userId: userId
        }),
      });
      let responseStatus = await response.status;

      if (responseStatus === 200) {
        let json = await response.json();

        let count = 0;
        let cVoce = 0;
        let cPovrce = 0;
        let cCvijece = 0;
        let cZacini = 0;
        json.forEach(element => {
          if (element.done) count++;
          if (element.plant.category === "Voće") {
            cVoce++;
          } else if (element.plant.category === "Povrće") {
            cPovrce++;
          } else if (element.plant.category === "Cvijeće") {
            cCvijece++
          }
          else {
            cZacini++;
          }
        });

        setDone(count);
        setDoneV(cVoce);
        setDoneP(cPovrce);
        setDoneZ(cZacini);
        setDoneC(cCvijece);
      }
      else {
        console.log(responseStatus + " " + userId + " " + jsonToken);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
    if (newValue === 2) {
      tryToLogIn();
    }
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

      if (responseStatus === 200) {
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

  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 1000;

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  function layout() {
    if (width < breakpoint) {
      return (
        <div style={{
          display: 'flex', height: "100%", width: "100%", backgroundColor: "#FFF", margin: 0
        }}>
          <div className={classes.root}>
            <AppBar position="static" title={<img src={Logo} />} style={{ backgroundColor: '#fff', color: '#000', width: "100%" }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                  <Tab label="Praćenje" {...a11yProps(0)} style={{ marginRight: 0 }} />
                  <Tab label="Dodaj" {...a11yProps(1)} style={{ marginRight: 0 }} />
                  <Tab label="Upravljanje" {...a11yProps(2)} />
                </Tabs>
              </div>
              <div style={{
                display: 'flex', height: "8em", width: "100%", backgroundColor: "#F1E4C7", backgroundImage: `url(${Banner})`, backgroundPosition: 'center bottom',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat', margin: 0, padding: 0,
              }}></div>
            </AppBar>
            <TabPanel value={value} index={0} style={{ backgroundColor: "#FFF" }}>
              <HomeScreen jsonToken={jsonToken} userId={userId} />
            </TabPanel>
            <TabPanel value={value} index={1} style={{ backgroundColor: "#FFF" }}>
              <AddPlantScreen jsonToken={jsonToken} userId={userId} value={handleChange} username={props.username} />
            </TabPanel>
            <TabPanel value={value} index={2} style={{ backgroundColor: "#FFF" }}>
              <div style={{ display: 'flex', flex: 1, justifyContent: "center", alignItems: "center", paddingBottom: 0 }}>
                <Card className={classes.card} style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                  <CardContent style={{ width: '60%' }}>
                    <Typography gutterBottom variant="h5" component="h2" style={{ marginBottom: 20 }}>
                      Bok, {props.username}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                      Vaša Postignuća (lvl {`${Math.floor(done / 5)}`}):
                    </Typography>
                    <div style={{ width: "100%", marginTop: 30, marginBottom: 50 }}>
                      <Line percent={((done % 5) * 20)} strokeWidth="1" strokeColor="#51A1FF" />
                      <div style={{ display: 'flex', flex: '1', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40 }}>
                        <img
                          alt=""
                          src={A1}
                          title=""
                          style={{ height: 50 }}
                        />
                        <img
                          alt=""
                          src={A2}
                          title=""
                          style={{ height: 50 }}
                        />
                        <img
                          alt=""
                          src={A3}
                          title=""
                          style={{ height: 50 }}
                        />
                        <img
                          alt=""
                          src={A4}
                          title=""
                          style={{ height: 50 }}
                        />
                      </div>
                    </div>

                    <Typography variant="body2" color="textSecondary" component="p">
                      Uzgojeno sveukupno biljaka: {done}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: 10 }}>
                      Uzgojeno Voća: {doneV}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: 10 }}>
                      Uzgojeno Povrća: {doneP}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: 10 }}>
                      Uzgojeno Cvijeća: {doneC}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: 10, marginBottom: 50 }}>
                      Uzgojeno Začina: {doneZ}
                    </Typography>

                    <Typography variant="body1" color="textSecondary" component="p" style={{ marginTop: 40, marginBottom: 10 }}>
                      Postavke računa:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: 10, marginBottom: 10 }}>
                      Korisničko ime: {props.username}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: 10, marginBottom: 10 }}>
                      Email: {props.email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: 10, marginBottom: 30 }}>
                      Datum registracije: {moment(props.date).format('DD.MM.YYYY')}
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: -5 }}>
                      <Button onClick={() => { props.returnLogedIn(false); props.returnLogin(false) }}>Odjava</Button>
                      <Button onClick={() => tryToDeleteAccount()}>Obriši račun</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabPanel>
          </div>
        </div>
      )
    } else {
      return (
        <div style={{
          display: 'flex', height: "100%", width: "100%", backgroundColor: "#FFF", margin: 0
        }}>
          <div className={classes.root}>
            <AppBar position="static" title={<img src={Logo} />} style={{ backgroundColor: '#fff', color: '#000' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <Logo style={{ height: '4em' }} />
                </div>
                <div style={{ flex: 1 }}></div>
                <div style={{ flex: 5 }}>
                  <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                    <Tab label="Praćenje biljke" {...a11yProps(0)} style={{ marginRight: "5em" }} />
                    <Tab label="Dodaj biljku" {...a11yProps(1)} style={{ marginRight: "5em" }} />
                    <Tab label="Upravljanje računom" {...a11yProps(2)} />
                  </Tabs>
                </div>
                <div style={{ flex: 2 }}></div>
              </div>
              <div style={{
                display: 'flex', height: "8em", width: "100%", backgroundColor: "#F1E4C7", backgroundImage: `url(${Banner})`, backgroundPosition: 'center bottom',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat', margin: 0, padding: 0,
              }}></div>
            </AppBar>
            <TabPanel value={value} index={0} style={{ backgroundColor: "#FFF" }}>
              <HomeScreen jsonToken={jsonToken} userId={userId} />
            </TabPanel>
            <TabPanel value={value} index={1} style={{ backgroundColor: "#FFF" }}>
              <AddPlantScreen jsonToken={jsonToken} userId={userId} value={handleChange} username={props.username} />
            </TabPanel>
            <TabPanel value={value} index={2} style={{ backgroundColor: "#FFF" }}>
              <div style={{ display: 'flex', flex: 1, justifyContent: "center", alignItems: "center", paddingLeft: '20%', paddingRight: '20%', paddingBottom: 0 }}>
                <Card className={classes.card} style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                  <CardContent style={{ width: '60%' }}>
                    <Typography gutterBottom variant="h5" component="h2" style={{ marginBottom: 20 }}>
                      Bok, {props.username}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                      Vaša Postignuća (lvl {`${Math.floor(done / 5)}`}):
                    </Typography>
                    <div style={{ width: "100%", marginTop: 30, marginBottom: 50 }}>
                      <Line percent={((done % 5) * 20)} strokeWidth="1" strokeColor="#51A1FF" />
                      <div style={{ display: 'flex', flex: '1', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40 }}>
                        <img
                          alt=""
                          src={A1}
                          title=""
                          style={{ height: 50 }}
                        />
                        <img
                          alt=""
                          src={A2}
                          title=""
                          style={{ height: 50 }}
                        />
                        <img
                          alt=""
                          src={A3}
                          title=""
                          style={{ height: 50 }}
                        />
                        <img
                          alt=""
                          src={A4}
                          title=""
                          style={{ height: 50 }}
                        />
                      </div>
                    </div>

                    <Typography variant="body2" color="textSecondary" component="p">
                      Uzgojeno sveukupno biljaka: {done}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: 10 }}>
                      Uzgojeno Voća: {doneV}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: 10 }}>
                      Uzgojeno Povrća: {doneP}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: 10 }}>
                      Uzgojeno Cvijeća: {doneC}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: 10, marginBottom: 50 }}>
                      Uzgojeno Začina: {doneZ}
                    </Typography>

                    <Typography variant="body1" color="textSecondary" component="p" style={{ marginTop: 40, marginBottom: 10 }}>
                      Postavke računa:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: 10, marginBottom: 10 }}>
                      Korisničko ime: {props.username}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: 10, marginBottom: 10 }}>
                      Email: {props.email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: 10, marginBottom: 30 }}>
                      Datum registracije: {moment(props.date).format('DD.MM.YYYY')}
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: -5 }}>
                      <Button onClick={() => { props.returnLogedIn(false); props.returnLogin(false) }}>Odjavi me</Button>
                      <Button onClick={() => tryToDeleteAccount()}>Obriši račun</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabPanel>
          </div>
        </div>
      )
    }
  }

  return (
    <div>
      {layout()}
    </div>
  );
}