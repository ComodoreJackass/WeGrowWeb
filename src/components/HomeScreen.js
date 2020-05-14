import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import TrackedCard from './TrackedCard';

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

//var mqtt = require('mqtt');

/*var topic = "s1/tmpzrak";
var topic1 = "s1/tmptlo";
var topic2 = "s1/vlzrak";
var topic3 = "s1/vltlo";
var client = mqtt.connect("mqtts://m24.cloudmqtt.com:30991", { clientId: "jelMeNekoTrazio", username: "web", password: "a" });*/

export default function HomeScreen(props) {
    const [jsonToken] = useState(props.jsonToken);
    const [userId] = useState(props.userId);
    const [progress, setProgress] = useState([]);
    const [plants, setPlants] = useState([]);
    const [lCards, setLeftCards] = useState([]);
    const [rCards, setRightCards] = useState([]);


    /*mqtt = () => {
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
        }); //single topic

        //notice this is printed even before we connect
        console.log("end of script");
    };*/


    /*useEffect(() => {
        //handle errors
        client.on("error", function (error) {
            console.log("Can't connect" + error);
            process.exit(1)
        });


        //handle incoming messages
        client.on('message', function (topic, message, packet) {
            console.log("message is " + message);
            console.log("topic is " + topic);
            setTmpZraka(message.toString());
            //client.end();
        });
    })*/


    const classes = useStyles();

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

            if (responseStatus == 200) {
                let json = await response.json();

                setProgress(json);
            }
            else {
                console.log(responseStatus + " " + userId + " " + jsonToken);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function tryToGetPlants() {
        try {
            let response = await fetch('https://afternoon-depths-99413.herokuapp.com/plants', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + jsonToken
                }
            });
            let responseStatus = await response.status;

            if (responseStatus == 200) {
                let json = await response.json();
                setPlants(json);
                tryToLogIn();
            }
            else {
                console.log(responseStatus + " " + userId + " " + jsonToken);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function tryToDelete(progId) {
        try {
            let response = await fetch('https://afternoon-depths-99413.herokuapp.com/progress', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + jsonToken
                },
                body: JSON.stringify({
                    progressId: progId
                }),
            });
            let responseStatus = await response.status;

            if (responseStatus == 200) {
                console.log("Deleted");
                tryToLogIn();
            }
            else {
                console.log(responseStatus);
            }
        } catch (error) {
            console.error(error);
        }
    }

    function elapsedTime(time) {
        let days = Math.floor((Date.now() - time) / (60000 * 60 * 24));
        let hours = Math.floor((Date.now() - time) / (60000 * 60)) % 24;

        let elapsedTime = "";

        if (days === 0) {
            elapsedTime += "0 dana ";
        } else if (days === 1) {
            elapsedTime += days + " dan ";
        } else {
            elapsedTime += days + " dana ";
        }

        if (hours === 0) {
            elapsedTime += "0 sati";
        } else if (hours === 1) {
            elapsedTime += hours + " sat ";
        } else {
            elapsedTime += hours + " sata ";
        }

        return elapsedTime

    }

    async function moveToDone(progId) {
        console.log("called")
        try {
            let response = await fetch('https://afternoon-depths-99413.herokuapp.com/progress/done', {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + jsonToken
                },
                body: JSON.stringify({
                    progressId: progId,
                    done: 1
                }),
            });
            let responseStatus = await response.status;

            if (responseStatus == 200) {
                console.log("Done");
                tryToGetPlants();
            }
            else {
                console.log(responseStatus);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        tryToGetPlants();
        //mqtt();
    }, [jsonToken, userId]);

    useEffect(() => {
        let tmp = progress.filter(prog => !prog.done).map(prog => (
            <TrackedCard 
                prog={prog} 
                image={plants[prog.plant.id - 1].image}
                elapsedTime={elapsedTime}
                //handleClickOpen={handleClickOpen}
                tryToDelete={tryToDelete}
                moveToDone={moveToDone}
            />
        ));

        let lcards = [];
        let rcards = [];

        for (var i = 0; i < tmp.length; i++) {
            if (i % 2 === 0) {
                lcards.push(tmp[i]);
            } else {
                rcards.push(tmp[i]);
            }
        }

        setLeftCards(lcards);
        setRightCards(rcards);

    }, [progress])

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', flex: 2, padding: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: "100%" }}></div>

                <div style={{ display: 'flex', flexDirection: 'column', flex: 2 }}>
                    {lCards}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 0.1, height: "100%" }}></div>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 2 }}>
                    {rCards}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: "100%" }}></div>
            </div>
        </div>
    );
}