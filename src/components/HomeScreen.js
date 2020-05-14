import React, { useState, useEffect } from 'react';
import TrackedCard from './TrackedCard';
import { uuid } from 'uuidv4';

export default function HomeScreen(props) {
    const [jsonToken] = useState(props.jsonToken);
    const [userId] = useState(props.userId);
    const [progress, setProgress] = useState([]);
    const [plants, setPlants] = useState([]);
    const [lCards, setLeftCards] = useState([]);
    const [rCards, setRightCards] = useState([]);

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

            if (responseStatus === 200) {
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

            if (responseStatus === 200) {
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

            if (responseStatus === 200) {
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
                key={uuid()}
                prog={prog} 
                image={plants[prog.plant.id - 1].image}
                elapsedTime={elapsedTime}
                //handleClickOpen={handleClickOpen}
                tryToDelete={tryToDelete}
                moveToDone={moveToDone}
                hasSensors={prog.has_sensors}
                jsonToken={jsonToken}
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