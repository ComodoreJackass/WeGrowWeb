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

export default function AddPlantScreen(props) {
    const [jsonToken] = useState(props.jsonToken);
    const [userId] = useState(props.userId);

    const [plants, setPlants] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [growthStages, setGrowthStages] = useState([]);
    const [cards, setCards] = useState([]);

    const classes = useStyles();

    async function tryToLogIn() {
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
                tryToFetchMaterials();
            }
            else {
                console.log(responseStatus + " " + userId + " " + jsonToken);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function tryToFetchMaterials() {
        try {
            let response = await fetch('https://afternoon-depths-99413.herokuapp.com/materials', {
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
                setMaterials(json);
                tryToFetchGrowthStages();
            }
            else {
                console.log(responseStatus + " " + userId + " " + jsonToken);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function tryToFetchGrowthStages() {
        try {
            let response = await fetch('https://afternoon-depths-99413.herokuapp.com/growthStages', {
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
                setGrowthStages(json);
            }
            else {
                console.log(responseStatus + " " + userId + " " + jsonToken);
            }
        } catch (error) {
            console.error(error);
        }
    }

    function getGrowthStage(plantId) {
        let tmp = growthStages.filter(stage => stage.plant_id == plantId);
        return tmp[0].id;
    }

    async function tryToAdd(plantId, stageId) {
        try {
            let response = await fetch('https://afternoon-depths-99413.herokuapp.com/progress/insert', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + jsonToken
                },
                body: JSON.stringify({
                    userId: userId,
                    plantId: plantId,
                    stageId: stageId,
                    done: false
                }),
            });
            let responseStatus = await response.status;

            if (responseStatus == 200) {
                console.log("Added");
            }
            else {
                console.log(responseStatus);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        tryToLogIn();
    }, [jsonToken, userId]);

    /*function populateMaterials(plantId) {
        let tmp = materials.filter(mat => mat.plant_id == plantId).map(mat => (
            <List.Item key={mat.id} title={mat.material} style={{ marginLeft: -64 }} />
        ));
        return tmp;
    }*/

    useEffect(() => {
        let tmp = plants.map(plant => (
            <Card className={classes.root} key={plant.id} variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {plant.name}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Opis
                     <br />
                        {plant.summary}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Težina uzgoja
                     <br />
                        {plant.difficulty}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => tryToAdd(plant.id, getGrowthStage(plant.id))}>Dodaj</Button>
                </CardActions>
            </Card>
        ));

        setCards(tmp);

    }, [growthStages])

    return (
        <div>
            {cards}
        </div>
    );
}