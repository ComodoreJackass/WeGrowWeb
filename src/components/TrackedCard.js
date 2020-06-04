import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import WaterIcon from '@material-ui/icons/LocalDrink';
import { withStyles } from '@material-ui/core/styles';
import { Line, Circle } from 'rc-progress';

import { uuid } from 'uuidv4';

var mqtt = require('mqtt');
var client = mqtt.connect("mqtts://m24.cloudmqtt.com:30991", { clientId: "jelMeNekoTrazio", username: "web", password: "a" });

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    media: {
        height: 140,
    }
});

export default function TrackedCard(props) {
    const classes = useStyles();
    const [prog] = useState(props.prog);
    const [image] = useState(props.image);

    const [enableSensors, setEnableSensors] = useState(props.hasSensors);
    const [open, setOpen] = React.useState(false);

    const [tmpZraka, setTmpZraka] = useState('Senzor nije spojen');
    const [progTmpZraka, setProgTmpZraka] = useState(0);

    const [tmpTla, setTmpTla] = useState('Senzor nije spojen');
    const [progTmpTla, setProgTmpTla] = useState(0);

    const [vlagaZraka, setVlagaZraka] = useState('Senzor nije spojen');
    const [progVlagaZraka, setProgVlagaZraka] = useState(0);

    const [vlagaTla, setVlagaTla] = useState('Senzor nije spojen');
    const [progVlagaTla, setProgVlagaTla] = useState(0);

    const [bckgColor, setBckgColor] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const subscribeToTopics = () => {
        console.log("connected flag  " + client.connected);

        setTmpZraka("Čekanje podataka");
        setTmpTla("Čekanje podataka");
        setVlagaTla("Čekanje podataka");
        setVlagaZraka("Čekanje podataka");

        client.on("connect", function () {
            console.log("connected  " + client.connected);
        })

        console.log("subscribing to topics");
        client.subscribe({
            "s1/tmpzrak": { qos: 0 },
            "s1/tmptlo": { qos: 0 },
            "s1/vlzrak": { qos: 0 },
            "s1/vltlo": { qos: 0 },
        });

        console.log("end of script");
    };

    const unsubscribe = () => {
        client.end();
        setTmpZraka("Senzor nije spojen");
        setTmpTla("Senzor nije spojen");
        setVlagaTla("Senzor nije spojen");
        setVlagaZraka("Senzor nije spojen");
        client = mqtt.connect("mqtts://m24.cloudmqtt.com:30991", { clientId: "jelMeNekoTrazio", username: "web", password: "a" });
    }

    useEffect(() => {
        if (enableSensors) {
            subscribeToTopics();
        }
    }, [enableSensors]);

    useEffect(() => {
        if (enableSensors) {
            console.log("listening")
            client.on("error", function (error) {
                console.log("Can't connect" + error);
                process.exit(1)
            });

            client.on('message', function (topic, message, packet) {
                console.log("message is " + message);
                console.log("topic is " + topic);

                if (topic === "s1/tmpzrak") {
                    setTmpZraka(message.toString());
                    setProgTmpZraka(parseFloat(message.toString()) + 40);
                }
                else if (topic === "s1/tmptlo") {
                    setTmpTla(message.toString());
                    setProgTmpTla(parseFloat(message.toString()) + 40);
                }
                else if (topic === "s1/vlzrak") {
                    setVlagaZraka(message.toString());
                    setProgVlagaZraka(parseFloat(message.toString()));
                }
                else if (topic === "s1/vltlo") {
                    setVlagaTla(message.toString());
                    setProgVlagaTla(parseFloat(message.toString()));
                }
            });
        }
    })

    async function setSensors(progId, sensor) {
        try {
            let response = await fetch('https://afternoon-depths-99413.herokuapp.com/progress/sensors', {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + props.jsonToken
                },
                body: JSON.stringify({
                    progressId: progId,
                    sensors: sensor
                }),
            });
            let responseStatus = await response.status;

            if (responseStatus === 200) {
                console.log("Sensors added");
            }
            else {
                console.log(responseStatus);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function watered(progId) {
        try {
            let response = await fetch('https://afternoon-depths-99413.herokuapp.com/progress/lastWateredOn', {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + props.jsonToken
                },
                body: JSON.stringify({
                    progressId: progId
                }),
            });
            let responseStatus = await response.status;

            if (responseStatus == 200) {
                console.log("Done");
                props.reset();
            }
            else {
                console.log(responseStatus);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const styles = {
        root: {
            flexGrow: 1
        },
        colorPrimary: {
            background: 'green'
        }
    };

    useEffect(() => {
        if (prog.plant.category === "Voće") {
            setBckgColor("#F5DADA");
        } else if (prog.plant.category === "Povrće") {
            setBckgColor("#CAF5B0");
        } else if (prog.plant.category === "Cvijeće") {
            setBckgColor("#F5F0BE");
        }
        else {
            setBckgColor("#E8E4FF");
        }
    }, []);

    return (
        <div style={{ paddingTop: 10 }}>
            <Card className={classes.root} variant="outlined" style={{ borderRadius: 20, backgroundColor: bckgColor }}>
                <CardMedia
                    component="img"
                    alt=""
                    height="250"
                    src={`data:image/jpg;base64,${image}`}
                    title=""
                    style={{ borderRadius: 20 }}
                />

                <CardContent>
                    <Typography variant="h5" component="h2" style={{ paddingLeft: 15 }}>
                        {prog.plant.name}
                    </Typography>
                    <Typography variant="body2" component="p" style={{ marginTop: 10, paddingLeft: 15 }}>
                        Očekivano vrijeme uzgoja: {prog.plant.duration} dana
                    </Typography>
                    <Typography variant="body2" component="p" style={{ paddingLeft: 15, marginTop: "1em" }}>
                        Proteklo vrijeme {props.elapsedTime(Date.parse(prog.started_on))}
                    </Typography>
                    <Typography variant="body2" component="p" style={{ paddingLeft: 15, marginTop: "1em" }}>
                        Zalijevano prije:
                        {props.elapsedTime(Date.parse(prog.last_watered_on))}
                        <IconButton aria-label="water" onClick={() => watered(prog.id)} style={{ marginLeft: "10px" }}>
                            <WaterIcon style={{ color: '#77B5FE' }} />
                        </IconButton>
                    </Typography>

                    <CardActionArea>
                        <ExpansionPanel style={{ boxShadow: 'none', borderTop: 'none', backgroundColor: bckgColor }}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant="body2" component="p">
                                    Senzori
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails >
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Button size="small" style={{ paddingLeft: 15, paddingRight: 15, marginBottom: 10, textTransform: 'none' }} onClick={handleClickOpen}>
                                        <Typography variant="body2" component="p">
                                            Spajanje/Odspajanje Senzora
                                        </Typography>
                                    </Button>
                                    <div style={{ paddingLeft: 15, paddingRight: 15, display: "flex" }}>
                                        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                            <div style={{ width: "80%" }}>
                                                <Typography variant="body2" component="p" style={{ paddingBottom: 5 }}>
                                                    Temp zemlje: {tmpTla}
                                                </Typography>
                                                <Line percent={progTmpTla} strokeWidth="4" strokeColor="red" />
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                            <div style={{ width: "80%" }}>
                                                <Typography variant="body2" component="p" style={{ paddingBottom: 5 }}>
                                                    Vlaga zemlje: {vlagaTla}
                                                </Typography>
                                                <Line percent={progVlagaTla} strokeWidth="4" strokeColor="blue" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 10, display: "flex" }}>
                                        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                            <div style={{ width: "80%" }}>
                                                <Typography variant="body2" component="p" style={{ paddingBottom: 5 }}>
                                                    Temp zraka: {tmpZraka}
                                                </Typography>
                                                <Line percent={progTmpZraka} strokeWidth="4" strokeColor="red" />
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                            <div style={{ width: "80%" }}>
                                                <Typography variant="body2" component="p" style={{ paddingBottom: 5 }}>
                                                    Vlaga zraka: {vlagaZraka}
                                                </Typography>
                                                <Line percent={progVlagaZraka} strokeWidth="4" strokeColor="blue" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </CardActionArea>

                    <CardActionArea>
                        <ExpansionPanel style={{ boxShadow: 'none', borderTop: 'none', backgroundColor: bckgColor }}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant="body2" component="p">Briga o biljci</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails >
                                <Typography>
                                    {prog.plant.care}
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </CardActionArea>
                    <CardActionArea>
                        <ExpansionPanel style={{ boxShadow: 'none', borderTop: 'none', backgroundColor: bckgColor }}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant="body2" component="p">Upute za sadnju</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails >
                                <Typography>
                                    {prog.plant.instructions}
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </CardActionArea>
                </CardContent>
                <CardActions style={{ paddingLeft: 20, paddingRight:20, display: 'flex', justifyContent: 'space-between' }}>
                    <Button size="small" onClick={() => props.tryToDelete(prog.id)}>Obriši</Button>
                    <Button size="small" onClick={() => props.moveToDone(prog.id)}>Gotovo</Button>
                </CardActions>
            </Card>
            {
                enableSensors
                    ?
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Raskid veze sa senzorima</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Želite li prestati pratiti biljku.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Odustani
                             </Button>
                            <Button onClick={() => { setEnableSensors(false); setSensors(prog.id, 0); unsubscribe(); handleClose(); }} color="primary">
                                Raskini vezu
                            </Button>
                        </DialogActions>
                    </Dialog>
                    :
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Povezivanje sa senzorima</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Unesite id i lozinku senzora kako bi započeli pračenje razvoja biljke.
                        </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="username"
                                label="id"
                                type="username"
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="lozinka"
                                label="lozinka"
                                type="password"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Odustani
                            </Button>
                            <Button onClick={() => { subscribeToTopics(); setEnableSensors(true); setSensors(prog.id, 1); handleClose(); }} color="primary">
                                Spoji me
                            </Button>
                        </DialogActions>
                    </Dialog>
            }
        </div>
    )
}