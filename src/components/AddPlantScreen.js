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
import { uuid } from 'uuidv4';
import TextField from '@material-ui/core/TextField';
import { Snackbar, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FileBase64 from 'react-file-base64';
import QrReader from 'react-qr-reader'

import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';

import Voce from '../assets/voce.png'
import Povrce from '../assets/povrce.png'
import Cvijece from '../assets/cvijece.png'
import Zacini from '../assets/zacini.png'
import dodajBiljku from '../assets/dodajBiljku.png'
import qr from '../assets/qr.png'


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
    const [lCards, setLeftCards] = useState([]);
    const [mCards, setMiddleCards] = useState([]);
    const [rCards, setRightCards] = useState([]);

    const [result, setResult] = useState('No result');
    const [category, setCategory] = useState('');

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
                //tryToFetchMaterials();
            }
            else {
                console.log(responseStatus + " " + userId + " " + jsonToken);
            }
        } catch (error) {
            console.error(error);
        }
    }

    /*function getGrowthStage(plantId) {
        let tmp = growthStages.filter(stage => stage.plant_id === plantId);
        return tmp[0].id;
    }*/

    async function tryToAdd(plantId) {
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
                    done: false
                }),
            });
            let responseStatus = await response.status;

            if (responseStatus === 200) {
                console.log("Added");
                props.value("", 0);
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
        let split = plantId.split(";");
        let tmp = split.map(mat => (
            <li><Typography>{mat}</Typography></li>
        ));
        return tmp;
    }

    useEffect(() => {
        let tmp = plants.filter(plant => plant.category === category).map(plant => {

            let bckgColor = "";
            if (plant.category === "Voće") {
                bckgColor = "#F5DADA";
            } else if (plant.category === "Povrće") {
                bckgColor = "#CAF5B0";
            } else if (plant.category === "Cvijeće") {
                bckgColor = "#F5F0BE";
            }
            else {
                bckgColor = "#E8E4FF";
            }

            return (
                <div key={uuid()} style={{ paddingTop: 10 }}>
                    <Card className={classes.root} key={plant.id} variant="outlined" style={{ borderRadius: 20, backgroundColor: bckgColor }}>
                        <CardMedia
                            component="img"
                            alt=""
                            height="250"
                            src={`data:image/jpg;base64,${plant.image}`}
                            title=""
                            style={{ borderRadius: 20 }}
                        />

                        <CardContent>
                            <Typography variant="h5" component="h2" style={{ paddingLeft: 15 }}>
                                {plant.name}
                            </Typography>
                            <Typography variant="body1" component="p" style={{ marginTop: 10, paddingLeft: 15 }}>By {plant.owner}</Typography>
                            <Typography variant="body1" component="p" style={{ marginTop: 10, paddingLeft: 15 }}>
                                Težina uzgoja: {plant.difficulty}
                            </Typography>
                            <CardActionArea>
                                <ExpansionPanel style={{ boxShadow: 'none', borderTop: 'none', backgroundColor: bckgColor }}>
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
                            <CardActionArea>
                                <ExpansionPanel style={{ boxShadow: 'none', borderTop: 'none', backgroundColor: bckgColor }}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Materijali</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails >
                                        <ul style={{ paddingLeft: 30 }}>
                                            {populateMaterials(plant.materials)}
                                        </ul>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </CardActionArea>
                        </CardContent>
                        <CardActions style={{ paddingLeft: 20 }}>
                            <Button size="small" onClick={() => tryToAdd(plant.id)}>Dodaj</Button>
                        </CardActions>
                    </Card>
                </div>
            )
        });

        let lcards = [];
        let mcards = [];
        let rcards = [];

        for (var i = 0; i < tmp.length; i++) {
            if (i % 3 === 0) {
                lcards.push(tmp[i]);
            } else if (i % 3 === 1) {
                mcards.push(tmp[i])
            }
            else {
                rcards.push(tmp[i]);
            }
        }

        setLeftCards(lcards);
        setMiddleCards(mcards);
        setRightCards(rcards);

    }, [plants, category])

    function validateInput() {
        if (plantName === '') {
            setAlertText('Naziv biljke ne smije biti prazan')
            setAlertOpen(true);
        } else if (plantDescription === '') {
            setAlertText('Opis biljke ne smije biti prazan')
            setAlertOpen(true);
        } else if (plantDifficulty === '') {
            setAlertText('Težina uzgoja ne smije biti prazna')
            setAlertOpen(true);
        } else if (plantCare === '') {
            setAlertText('Briga o biljci ne smije biti prazna')
            setAlertOpen(true);
        } else if (plantInstuctions === '') {
            setAlertText('Upute za sadnju ne smiju biti prazne')
            setAlertOpen(true);
        } else if (category === '') {
            setAlertText('Kategorija biljke ne smije biti prazna')
            setAlertOpen(true);
        } else if (min === '') {
            setAlertText('Min vrijeme uzgoja ne smije biti prazno')
            setAlertOpen(true);
        } else if (max == '') {
            setAlertText('Max vrijeme uzgoja ne smije biti prazno')
            setAlertOpen(true);
        } else if (materials == '') {
            setAlertText('Materijali ne smiju biti prazni')
            setAlertOpen(true);
        } else if (image == '') {
            setAlertText('Slika ne smije biti prazna')
            setAlertOpen(true);
        } else {
            setDisplayProgress(true);
            tryToInsert();
        }
    }

    async function tryToInsert() {
        try {
            let response = await fetch('https://afternoon-depths-99413.herokuapp.com/plants/insert', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + jsonToken
                },
                body: JSON.stringify({
                    name: plantName,
                    summary: plantDescription,
                    difficulty: plantDifficulty,
                    category: plantCategory,
                    owner: props.username,
                    care: plantCare,
                    instructions: plantInstuctions,
                    duration: `${min}-${max}`,
                    image: image,
                    materials: materials
                }),
            });
            let responseStatus = await response.status;

            if (responseStatus == 200) {
                console.log("Added");
                setCategory("")
                setDisplayProgress(false);
            }
            else {
                console.log(responseStatus);
                setDisplayProgress(false);
            }
        } catch (error) {
            console.error(error);
            setDisplayProgress(false);
        }
    }

    const [displayProgress, setDisplayProgress] = useState(false);
    const [progress, setProgress] = useState(0);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertText, setAlertText] = useState('');

    const [plantName, setPlantName] = useState('');
    const [plantDescription, setPlantDescription] = useState('');
    const [plantDifficulty, setPlantDifficulty] = useState('');
    const [plantCare, setPlantCare] = useState('');
    const [plantInstuctions, setPlantInstructions] = useState('');
    const [plantCategory, setPlantCategory] = useState('Voće');
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [materials, setMaterials] = useState('');
    const [image, setImage] = useState('');

    React.useEffect(() => {
        function tick() {
            // reset when reaching 100%
            setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
        }

        const timer = setInterval(tick, 20);
        return () => {
            clearInterval(timer);
        };
    }, []);

    const getFiles = files => {
        setImage(files.base64.split(",")[1]);
    }

    const handleScan = data => {
        if (data) {
            try {
                let tmp = JSON.parse(data);

                if (tmp.plantzilla != null) {
                    setResult('Scanned');
                    tryToAdd(tmp.plantzilla);
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    const handleError = err => {
        console.error(err)
    }


    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 1000;

    React.useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);

        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    function switcher() {
        if (width > breakpoint) {
            if (category === '') {
                return (
                    <div style={{ display: 'flex', flexDirection: 'row', flex: 2, padding: 20 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 2, height: "100%" }}></div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

                            <div style={{ paddingTop: "2em" }}>
                                <Card className={classes.root} variant="outlined" style={{ borderRadius: 20, backgroundColor: '#FFE3E3' }}>
                                    <Button style={{ width: "100%" }} onClick={() => setCategory("Voće")}>
                                        <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "10em" }}>
                                            <Typography style={{ padding: 2 }}>Voće</Typography>
                                            <img src={Voce} style={{ alignSelf: 'center' }} />
                                        </CardContent>
                                    </Button>
                                </Card>
                            </div>
                            <div style={{ paddingTop: "2em" }}>
                                <Card className={classes.root} variant="outlined" style={{ borderRadius: 20, backgroundColor: '#E8E4FF' }}>
                                    <Button style={{ width: "100%" }} onClick={() => setCategory("Začini")}>
                                        <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "10em" }}>
                                            <Typography style={{ padding: 2 }}>Začini</Typography>
                                            <img src={Zacini} style={{ alignSelf: 'center' }} />
                                        </CardContent>
                                    </Button>
                                </Card>
                            </div>

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 0.5, height: "100%" }}></div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

                            <div style={{ paddingTop: "2em" }}>
                                <Card className={classes.root} variant="outlined" style={{ borderRadius: 20, backgroundColor: '#CAF5B0' }}>
                                    <Button style={{ width: "100%" }} onClick={() => setCategory("Povrće")}>
                                        <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "10em" }}>
                                            <Typography style={{ padding: 2 }}>Povrće</Typography>
                                            <img src={Povrce} style={{ alignSelf: 'center' }} />
                                        </CardContent>
                                    </Button>
                                </Card>
                            </div>
                            <div style={{ paddingTop: "2em" }}>
                                <Card className={classes.root} variant="outlined" style={{ borderRadius: 20, backgroundColor: '#FFF2DE' }}>
                                    <Button style={{ width: "100%" }} onClick={() => setCategory("Add")}>
                                        <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "10em" }}>
                                            <Typography style={{ padding: 2 }}>Dodaj biljku</Typography>
                                            <img src={dodajBiljku} style={{ alignSelf: 'center', marginTop: 5 }} />
                                        </CardContent>
                                    </Button>
                                </Card>
                            </div>

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 0.5, height: "100%" }}></div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

                            <div style={{ paddingTop: "2em" }}>
                                <Card className={classes.root} variant="outlined" style={{ borderRadius: 20, backgroundColor: '#F5F0BE' }}>
                                    <Button style={{ width: "100%" }} onClick={() => setCategory("Cvijeće")}>
                                        <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "10em" }}>
                                            <Typography style={{ padding: 2 }}>Cvijeće</Typography>
                                            <img src={Cvijece} style={{ alignSelf: 'center' }} />
                                        </CardContent>
                                    </Button>
                                </Card>
                            </div>

                            <div style={{ paddingTop: "2em" }}>
                                <Card className={classes.root} variant="outlined" style={{ borderRadius: 20, backgroundColor: '#E0F4F6' }}>
                                    <Button style={{ width: "100%" }} onClick={() => setCategory("qr")}>
                                        <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "10em" }}>
                                            <Typography style={{ padding: 2 }}>QR</Typography>
                                            <img src={qr} style={{ alignSelf: 'center' }} />
                                        </CardContent>
                                    </Button>
                                </Card>
                            </div>

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 2, height: "100%" }}></div>
                    </div>
                );
            }
            else if (category === 'Add') {
                return (
                    <div style={{ display: 'flex', flexDirection: 'row', flex: 2, padding: 20 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: "100%", paddingTop: 10, justifyContent: 'center' }}>
                            <IconButton aria-label="Povratak na kategorije" onClick={() => setCategory("")} style={{ width: '25%', alignSelf: 'center' }}>
                                <ArrowBack style={{ color: 'black', fontSize: '1.2em' }} />
                            </IconButton>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 2, height: "100%" }}></div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 2 }}>
                            <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
                                Dodavanje biljke
                        </Typography>

                            <TextField
                                required
                                label="Naziv biljke"
                                fullWidth
                                autoFocus
                                value={plantName}
                                color="secondary"
                                onChange={(event) => { setPlantName(event.target.value) }}
                                style={{ marginBottom: "1em" }}
                                withPreview={true}
                            />

                            <Select
                                value={plantCategory}
                                onChange={(value) => { setPlantCategory(value.target.value) }}
                                style={{ marginTop: "1em" }}
                            >
                                <MenuItem value={'Voće'}>Voće</MenuItem>
                                <MenuItem value={'Povrće'}>Povrće</MenuItem>
                                <MenuItem value={'Cvijeće'}>Cvijeće</MenuItem>
                                <MenuItem value={'Začini'}>Začini</MenuItem>
                            </Select>

                            <TextField
                                required
                                label="Opis biljke"
                                fullWidth
                                multiline
                                rows={4}
                                value={plantDescription}
                                color="secondary"
                                onChange={(event) => { setPlantDescription(event.target.value) }}
                                style={{ marginTop: "1em" }}
                            />

                            <TextField
                                required
                                label="Težina uzgoja"
                                fullWidth
                                value={plantDifficulty}
                                color="secondary"
                                onChange={(event) => { setPlantDifficulty(event.target.value) }}
                                style={{ marginTop: "1em" }}
                            />

                            <TextField
                                required
                                label="Upute za sadnju"
                                fullWidth
                                multiline
                                rows={4}
                                value={plantInstuctions}
                                color="secondary"
                                onChange={(event) => { setPlantInstructions(event.target.value) }}
                                style={{ marginTop: "1em" }}
                            />

                            <TextField
                                required
                                label="Briga o biljci"
                                fullWidth
                                multiline
                                rows={4}
                                value={plantCare}
                                color="secondary"
                                onChange={(event) => { setPlantCare(event.target.value) }}
                                style={{ marginTop: "1em" }}
                            />

                            <div style={{
                                display: 'flex',
                                marginTop: "1em"
                            }}>
                                <TextField
                                    required
                                    label="Min vrijeme uzgoja"
                                    type="number"
                                    fullWidth
                                    value={min}
                                    color="secondary"
                                    onChange={(event) => { setMin(event.target.value) }}
                                    style={{ flex: 1 }}
                                />
                                <div style={{ flex: 0.4 }}></div>
                                <TextField
                                    required
                                    label="Max vrijeme uzgoja"
                                    type="number"
                                    fullWidth
                                    value={max}
                                    color="secondary"
                                    onChange={(event) => { setMax(event.target.value) }}
                                    style={{ flex: 1 }}
                                />
                            </div>

                            <TextField
                                required
                                label="Materijali npr. vaza;zemlja;mreža"
                                fullWidth
                                multiline
                                rows={4}
                                value={materials}
                                color="secondary"
                                onChange={(event) => { setMaterials(event.target.value) }}
                                style={{ marginTop: "1em", marginBottom: "1em" }}
                            />

                            <FileBase64
                                multiple={false}
                                onDone={getFiles} />

                            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => setAlertOpen(false)}>
                                <Alert onClose={() => setAlertOpen(false)} severity="error">
                                    {alertText}
                                </Alert>
                            </Snackbar>

                            <div style={{
                                flexDirection: "column",
                                flex: 3,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}>
                                {displayProgress ? <CircularProgress variant="determinate" value={progress} style={{ marginBottom: "1em" }} /> : <CircularProgress variant="determinate" value={0} style={{ marginBottom: "1em" }} />}

                                <Button
                                    fullWidth
                                    variant="contained"
                                    style={{
                                        backgroundColor: "#C4D0FD",
                                        color: "white",
                                        width: "60%"
                                    }}
                                    className={classes.submit}
                                    onClick={
                                        () => {
                                            validateInput();
                                        }
                                    }
                                >
                                    Dodaj biljku
                                </Button>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 3, height: "100%" }}></div>
                    </div>
                );
            }
            else if (category === 'qr') {
                return (
                    <div style={{ display: 'flex', flexDirection: 'row', flex: 2, padding: 20 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: "100%", paddingTop: 10, justifyContent: 'center' }}>
                            <IconButton aria-label="Povratak na kategorije" onClick={() => setCategory("")} style={{ width: '25%', alignSelf: 'center' }}>
                                <ArrowBack style={{ color: 'black', fontSize: '1.2em' }} />
                            </IconButton>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 2, height: "100%" }}></div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 2 }}>
                            <div>
                                <QrReader
                                    delay={300}
                                    onError={handleError}
                                    onScan={handleScan}
                                    style={{ width: '100%' }}
                                />
                                <p>{result}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 3, height: "100%" }}></div>
                    </div >
                )
            }
            else {
                return (
                    <div style={{ display: 'flex', flexDirection: 'row', flex: 2, padding: 20 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: "100%", paddingTop: 10, justifyContent: 'center' }}>
                            <IconButton aria-label="Povratak na kategorije" onClick={() => setCategory("")} style={{ width: '25%', alignSelf: 'center' }}>
                                <ArrowBack style={{ color: 'black', fontSize: '1.2em' }} />
                            </IconButton>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', flex: 2 }}>
                            {lCards}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 0.1, height: "100%" }}></div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 2 }}>
                            {mCards}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 0.1, height: "100%" }}></div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 2 }}>
                            {rCards}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: "100%" }}></div>
                    </div>
                );
            }
        } else {
            if (category === '') {
                return (
                    <div style={{ display: 'flex', flexDirection: 'row', flex: 1, padding: 20 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <div style={{ paddingTop: "2em" }}>
                                <Card className={classes.root} variant="outlined" style={{ borderRadius: 20, backgroundColor: '#FFE3E3' }}>
                                    <Button style={{ width: "100%" }} onClick={() => setCategory("Voće")}>
                                        <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "10em" }}>
                                            <Typography style={{ padding: 2 }}>Voće</Typography>
                                            <img src={Voce} style={{ alignSelf: 'center' }} />
                                        </CardContent>
                                    </Button>
                                </Card>
                            </div>
                            <div style={{ paddingTop: "2em" }}>
                                <Card className={classes.root} variant="outlined" style={{ borderRadius: 20, backgroundColor: '#E8E4FF' }}>
                                    <Button style={{ width: "100%" }} onClick={() => setCategory("Začini")}>
                                        <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "10em" }}>
                                            <Typography style={{ padding: 2 }}>Začini</Typography>
                                            <img src={Zacini} style={{ alignSelf: 'center' }} />
                                        </CardContent>
                                    </Button>
                                </Card>
                            </div>
                            <div style={{ paddingTop: "2em" }}>
                                <Card className={classes.root} variant="outlined" style={{ borderRadius: 20, backgroundColor: '#F5F0BE' }}>
                                    <Button style={{ width: "100%" }} onClick={() => setCategory("Cvijeće")}>
                                        <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "10em" }}>
                                            <Typography style={{ padding: 2 }}>Cvijeće</Typography>
                                            <img src={Cvijece} style={{ alignSelf: 'center' }} />
                                        </CardContent>
                                    </Button>
                                </Card>
                            </div>
                            <div style={{ paddingTop: "2em" }}>
                                <Card className={classes.root} variant="outlined" style={{ borderRadius: 20, backgroundColor: '#CAF5B0' }}>
                                    <Button style={{ width: "100%" }} onClick={() => setCategory("Povrće")}>
                                        <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "10em" }}>
                                            <Typography style={{ padding: 2 }}>Povrće</Typography>
                                            <img src={Povrce} style={{ alignSelf: 'center' }} />
                                        </CardContent>
                                    </Button>
                                </Card>
                            </div>
                            <div style={{ paddingTop: "2em" }}>
                                <Card className={classes.root} variant="outlined" style={{ borderRadius: 20, backgroundColor: '#FFF2DE' }}>
                                    <Button style={{ width: "100%" }} onClick={() => setCategory("Add")}>
                                        <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "10em" }}>
                                            <Typography style={{ padding: 2 }}>Dodaj biljku</Typography>
                                            <img src={dodajBiljku} style={{ alignSelf: 'center', marginTop: 5 }} />
                                        </CardContent>
                                    </Button>
                                </Card>
                            </div>
                            <div style={{ paddingTop: "2em" }}>
                                <Card className={classes.root} variant="outlined" style={{ borderRadius: 20, backgroundColor: '#E0F4F6' }}>
                                    <Button style={{ width: "100%" }} onClick={() => setCategory("qr")}>
                                        <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "10em" }}>
                                            <Typography style={{ padding: 2 }}>QR</Typography>
                                            <img src={qr} style={{ alignSelf: 'center' }} />
                                        </CardContent>
                                    </Button>
                                </Card>
                            </div>

                        </div>
                    </div>
                );
            }
            else if (category === 'Add') {
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 2, padding: 20 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: "100%", paddingTop: 10, justifyContent: 'center' }}>
                            <IconButton aria-label="Povratak na kategorije" onClick={() => setCategory("")} style={{ width: '25%', alignSelf: 'center' }}>
                                <ArrowBack style={{ color: 'black', fontSize: '1.2em' }} />
                            </IconButton>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 2, height: "100%" }}></div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 2 }}>
                            <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
                                Dodavanje biljke
                            </Typography>

                            <TextField
                                required
                                label="Naziv biljke"
                                fullWidth
                                autoFocus
                                value={plantName}
                                color="secondary"
                                onChange={(event) => { setPlantName(event.target.value) }}
                                style={{ marginBottom: "1em" }}
                                withPreview={true}
                            />

                            <Select
                                value={plantCategory}
                                onChange={(value) => { setPlantCategory(value.target.value) }}
                                style={{ marginTop: "1em" }}
                            >
                                <MenuItem value={'Voće'}>Voće</MenuItem>
                                <MenuItem value={'Povrće'}>Povrće</MenuItem>
                                <MenuItem value={'Cvijeće'}>Cvijeće</MenuItem>
                                <MenuItem value={'Začini'}>Začini</MenuItem>
                            </Select>

                            <TextField
                                required
                                label="Opis biljke"
                                fullWidth
                                multiline
                                rows={4}
                                value={plantDescription}
                                color="secondary"
                                onChange={(event) => { setPlantDescription(event.target.value) }}
                                style={{ marginTop: "1em" }}
                            />

                            <TextField
                                required
                                label="Težina uzgoja"
                                fullWidth
                                value={plantDifficulty}
                                color="secondary"
                                onChange={(event) => { setPlantDifficulty(event.target.value) }}
                                style={{ marginTop: "1em" }}
                            />

                            <TextField
                                required
                                label="Upute za sadnju"
                                fullWidth
                                multiline
                                rows={4}
                                value={plantInstuctions}
                                color="secondary"
                                onChange={(event) => { setPlantInstructions(event.target.value) }}
                                style={{ marginTop: "1em" }}
                            />

                            <TextField
                                required
                                label="Briga o biljci"
                                fullWidth
                                multiline
                                rows={4}
                                value={plantCare}
                                color="secondary"
                                onChange={(event) => { setPlantCare(event.target.value) }}
                                style={{ marginTop: "1em" }}
                            />

                            <div style={{
                                display: 'flex',
                                marginTop: "1em"
                            }}>
                                <TextField
                                    required
                                    label="Min vrijeme uzgoja"
                                    type="number"
                                    fullWidth
                                    value={min}
                                    color="secondary"
                                    onChange={(event) => { setMin(event.target.value) }}
                                    style={{ flex: 1 }}
                                />
                                <div style={{ flex: 0.4 }}></div>
                                <TextField
                                    required
                                    label="Max vrijeme uzgoja"
                                    type="number"
                                    fullWidth
                                    value={max}
                                    color="secondary"
                                    onChange={(event) => { setMax(event.target.value) }}
                                    style={{ flex: 1 }}
                                />
                            </div>

                            <TextField
                                required
                                label="Materijali npr. vaza;zemlja;mreža"
                                fullWidth
                                multiline
                                rows={4}
                                value={materials}
                                color="secondary"
                                onChange={(event) => { setMaterials(event.target.value) }}
                                style={{ marginTop: "1em", marginBottom: "1em" }}
                            />

                            <FileBase64
                                multiple={false}
                                onDone={getFiles} />

                            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => setAlertOpen(false)}>
                                <Alert onClose={() => setAlertOpen(false)} severity="error">
                                    {alertText}
                                </Alert>
                            </Snackbar>

                            <div style={{
                                flexDirection: "column",
                                flex: 3,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}>
                                {displayProgress ? <CircularProgress variant="determinate" value={progress} style={{ marginBottom: "1em" }} /> : <CircularProgress variant="determinate" value={0} style={{ marginBottom: "1em" }} />}

                                <Button
                                    fullWidth
                                    variant="contained"
                                    style={{
                                        backgroundColor: "#C4D0FD",
                                        color: "white",
                                        width: "60%"
                                    }}
                                    className={classes.submit}
                                    onClick={
                                        () => {
                                            validateInput();
                                        }
                                    }
                                >
                                    Dodaj biljku
                                </Button>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 3, height: "100%" }}></div>
                    </div>
                );
            }
            else if (category === 'qr') {
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 2, padding: 20 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: "100%", paddingTop: 10, justifyContent: 'center' }}>
                            <IconButton aria-label="Povratak na kategorije" onClick={() => setCategory("")} style={{ width: '25%', alignSelf: 'center' }}>
                                <ArrowBack style={{ color: 'black', fontSize: '1.2em' }} />
                            </IconButton>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 2, height: "100%" }}></div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 2 }}>
                            <div>
                                <QrReader
                                    delay={300}
                                    onError={handleError}
                                    onScan={handleScan}
                                    style={{ width: '100%' }}
                                />
                                <p>{result}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 3, height: "100%" }}></div>
                    </div >
                )
            }
            else {
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 2, padding: 20 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: "100%", paddingTop: 10, justifyContent: 'center' }}>
                            <IconButton aria-label="Povratak na kategorije" onClick={() => setCategory("")} style={{ width: '25%', alignSelf: 'center' }}>
                                <ArrowBack style={{ color: 'black', fontSize: '1.2em' }} />
                            </IconButton>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 2 }}>
                            {lCards}
                            {mCards}
                            {rCards}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: "100%" }}></div>
                    </div>
                );
            }
        }
    }

    return (
        <div>
            {switcher()}
        </div>
    );
}