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
    const [lCards, setLeftCards] = useState([]);
    const [rCards, setRightCards] = useState([]);

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

            if (responseStatus === 200) {
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

            if (responseStatus === 200) {
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

            if (responseStatus === 200) {
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
        let tmp = growthStages.filter(stage => stage.plant_id === plantId);
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

            if (responseStatus === 200) {
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

    function populateMaterials(plantId) {
        let tmp = materials.filter(mat => mat.plant_id === plantId).map(mat => (
            <li><Typography>{mat.material}</Typography></li>
        ));
        return tmp;
    }

    useEffect(() => {
        let tmp = plants.map(plant => (
            <div style={{ paddingTop: 10 }}>
                <Card className={classes.root} key={plant.id} variant="outlined">
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        src={`data:image/jpg;base64,${plant.image}`}
                        title="Contemplative Reptile"
                    />

                    <CardContent>
                        <Typography variant="h5" component="h2" style={{ paddingLeft: 15 }}>
                            {plant.name}
                        </Typography>
                        <Typography variant="body1" component="p" style={{ marginTop: 10, paddingLeft: 15 }}>
                            Težina uzgoja:
                        </Typography>
                        <Typography variant="body2" component="p" style={{ paddingLeft: 15 }}>
                            {plant.difficulty}
                        </Typography>
                        <Divider style={{ marginTop: 10 }} />
                        <CardActionArea>
                            <ExpansionPanel style={{ boxShadow: 'none', borderTop: 'none' }}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Opis</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails >
                                    <Typography>
                                        {plant.summary}
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
                                    <Typography>Materijali</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails >
                                    <ul style={{ paddingLeft: 30 }}>
                                        {populateMaterials(plant.id)}
                                    </ul>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </CardActionArea>
                        <Divider />
                    </CardContent>
                    <CardActions style={{ paddingLeft: 20 }}>
                        <Button size="small" onClick={() => tryToAdd(plant.id, getGrowthStage(plant.id))}>Dodaj</Button>
                    </CardActions>
                </Card>
            </div>
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

    }, [growthStages])

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