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

    const [enableSensors, setEnableSensors] = useState(false);
    const [open, setOpen] = React.useState(false);

    const [tmpZraka, setTmpZraka] = useState('Senzor nije spojen');
    const [progTmpZraka, setProgTmpZraka] = useState(0);

    const [tmpTla, setTmpTla] = useState('Senzor nije spojen');
    const [progTmpTla, setProgTmpTla] = useState(0);

    const [vlagaZraka, setVlagaZraka] = useState('Senzor nije spojen');
    const [progVlagaZraka, setProgVlagaZraka] = useState(0);

    const [vlagaTla, setVlagaTla] = useState('Senzor nije spojen');
    const [progVlagaTla, setProgVlagaTla] = useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const subscribeToTopics = () => {
        console.log("connected flag  " + client.connected);

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

                if(topic=="s1/tmpzrak"){
                    setTmpZraka(message.toString());
                    setProgTmpZraka(parseFloat(message.toString()) + 40);
                }
                else if(topic=="s1/tmptlo"){
                    setTmpTla(message.toString());
                    setProgTmpTla(parseFloat(message.toString()) + 40);
                }
                else if(topic=="s1/vlzrak"){
                    setVlagaZraka(message.toString());
                    setProgVlagaZraka(parseFloat(message.toString()));
                }
                else if(topic=="s1/vltlo"){
                    setVlagaTla(message.toString());
                    setProgVlagaTla(parseFloat(message.toString()));
                }
            });
        }
    })

    return (
        <div key={prog.id} style={{ paddingTop: 10 }}>
            <Card className={classes.root} variant="outlined">
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    src={`data:image/jpg;base64,${image}`}
                    title="Contemplative Reptile"
                />

                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom style={{ paddingLeft: 15 }}>
                        {prog.growth_stage.stage_title}
                    </Typography>
                    <Typography variant="h5" component="h2" style={{ paddingLeft: 15 }}>
                        {prog.plant.name}
                    </Typography>
                    <Typography variant="body2" component="p" style={{ marginTop: 10, paddingLeft: 15 }}>
                        Očekivano vrijeme uzgoja:
                        <br />
                        {prog.growth_stage.stage_duration} dana
                    </Typography>
                    <Divider style={{ marginTop: 10, marginBottom: 10, paddingLeft: 15 }} />
                    <Typography variant="body2" component="p" style={{ paddingLeft: 15 }}>
                        Proteklo vrijeme
                        <br />
                        {props.elapsedTime(Date.parse(prog.started_on))}
                    </Typography>
                    <Divider style={{ marginTop: 10, marginBottom: 10, paddingLeft: 15 }} />
                    <Button size="small" style={{ paddingLeft: 15, paddingRight: 15, marginBottom: 10, textTransform: 'none' }} onClick={handleClickOpen}>
                        <Typography variant="body2" component="p">
                            Senzori
                    </Typography>
                    </Button>
                    <br />
                    <div style={{ paddingLeft: 15, paddingRight: 15, display: "flex" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                            <div style={{ width: "80%" }}>
                                <Typography variant="body2" component="p" style={{ paddingBottom: 5 }}>
                                    Temp zemlje: {tmpTla}
                                </Typography>
                                <LinearProgress variant="determinate" value={progTmpTla} />
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                            <div style={{ width: "80%" }}>
                                <Typography variant="body2" component="p" style={{ paddingBottom: 5 }}>
                                    Vlaga zemlje: {vlagaTla}
                                </Typography>
                                <LinearProgress variant="determinate" value={progVlagaTla} />
                            </div>
                        </div>
                    </div>
                    <div style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 10, display: "flex" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                            <div style={{ width: "80%" }}>
                                <Typography variant="body2" component="p" style={{ paddingBottom: 5 }}>
                                    Temp zraka: {tmpZraka}
                                </Typography>
                                <LinearProgress variant="determinate" value={progTmpZraka} />
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                            <div style={{ width: "80%" }}>
                                <Typography variant="body2" component="p" style={{ paddingBottom: 5 }}>
                                    Vlaga zraka: {vlagaZraka}
                                </Typography>
                                <LinearProgress variant="determinate" value={progVlagaZraka} />
                            </div>
                        </div>
                    </div>

                    <Divider style={{ marginTop: 20 }} />
                    <CardActionArea>
                        <ExpansionPanel style={{ boxShadow: 'none', borderTop: 'none' }}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Briga o biljci</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails >
                                <Typography>
                                    {prog.growth_stage.next_stage_text}
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </CardActionArea>
                    <Divider />
                    <CardActionArea>
                        <ExpansionPanel style={{ boxShadow: 'none', borderTop: 'none' }}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Upute za sadnju</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails >
                                <Typography>
                                    {prog.growth_stage.description}
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </CardActionArea>
                    <Divider />
                </CardContent>
                <CardActions style={{ paddingLeft: 20 }}>
                    <Button size="small" onClick={() => props.tryToDelete(prog.id)}>Obriši</Button>
                    <Button size="small" onClick={() => props.moveToDone(prog.id)}>Gotovo</Button>
                </CardActions>
            </Card>
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
                    <Button onClick={() => {subscribeToTopics(); setEnableSensors(true); handleClose();}} color="primary">
                        Spoji me
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}