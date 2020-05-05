import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
});

export default function HomeScreen(props) {
    const [jsonToken] = useState(props.jsonToken);
    const [userId] = useState(props.userId);
    const [progress, setProgress] = useState([]);
    const [cards, setCards] = useState([]);

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

            if (responseStatus === 200) {
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

    useEffect(() => {
        tryToLogIn();
    }, [jsonToken, userId]);

    useEffect(() => {
        let tmp = progress.map(prog => (
            <Card className={classes.root} key={prog.id} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {prog.growth_stage.stage_title}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {prog.plant.name}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Proteklo vrijeme
                     <br />
                        {elapsedTime(Date.parse(prog.started_on))}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => tryToDelete(prog.id)}>Obriši</Button>
                </CardActions>
            </Card>
        ));

        setCards(tmp);

    }, [progress])

    return (
        <div>
            {cards}
        </div>
    );
}