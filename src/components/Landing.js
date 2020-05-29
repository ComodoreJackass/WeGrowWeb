import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

import { ReactComponent as Logo } from '../assets/logo.svg';
import LandingPic from '../assets/landing.png';
import Soon from '../assets/soon.png';
import Garden from '../assets/garden.png';
import Sprout from '../assets/sprout.png';
import Planty from '../assets/plant.png';
import Book from '../assets/book.png';
import Hot from '../assets/hot.png';
import Facebook from '../assets/facebook.png';
import Instagram from '../assets/instagram.png';

export default function Landing(props) {
    const sensorValues = {
        data: {
            s1: {
                tmpzrak: 10,
                vlzrak: 78,
                tmptlo: 18,
                vltlo: 90
            },
            s2: {
                tmpzrak: 24,
                vlzrak: 80,
                tmptlo: 9,
                vltlo: 60
            },
            s3: {
                tmpzrak: 24,
                vlzrak: 81,
                tmptlo: 19,
                vltlo: 10
            }
        }
    }

    const navbar = {
        display: 'flex',
        flex: 0.5,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center'
    };

    const navLink = {
        textDecoration: 'none',
        fontFamily: 'Rubik',
        color: 'black',
        fontSize: '1.1em'
    };

    const navLink2 = {
        textDecoration: 'none',
        fontFamily: 'Rubik',
        color: 'white',
        fontSize: '1.1em'
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '420vh', backgroundColor: 'green' }}>
            <div id="Top" style={navbar}>
                <div style={{ display: 'flex', flex: 6, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Logo style={{ height: '4em' }} />
                    <a style={navLink} href="#About">O Plantzilli</a>
                    <a style={navLink} href="#Pricing">Opcije</a>
                    <a style={navLink} href="#Map">Esri mapa</a>
                    <a style={navLink} href="#Contact">Kontakt</a>
                </div>
                <div style={{ flex: 8 }}></div>
                <div style={{ flex: 2 }}>
                    <a style={navLink} href="#" onClick={() => { props.returnLogin(true) }}>Prijavi me</a>
                </div>

            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 9,
                backgroundImage: `url(${LandingPic})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                alignItems: 'center'
            }}>
                <div style={{ flex: 2 }}></div>
                <div style={{ textAlign: 'center', padding: '1em' }}>
                    <p style={{ flex: 4, fontSize: '3em', paddingBottom: '1em' }}>Plantzilla</p>
                    <p style={{ fontSize: '1.5em' }}>Naša aplikacija nudi novo iskustvo za Vas i Vaše biljke</p>
                    <p style={{ fontSize: '1.5em', paddingBottom: '5em' }}>Vrijeme je sad i zato krenite</p>
                    <img alt="" src={Soon} style={{ width: "25%" }} />
                </div>
                <div style={{ flex: 4 }}></div>
            </div>

            <div id="About" style={{ display: 'flex', flex: 9, backgroundColor: 'white' }}>
                <div style={{ flex: 2 }}></div>
                <div style={{ display: 'flex', flex: 5, flexDirection: 'column' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 13, textAlign: 'center', justifyContent: 'space-around', alignItems: 'center' }}>
                        <p style={{ fontSize: '2em', color: '#4D974E', paddingTop: '0.5em' }}>Zašto koristiti Plantzillu?</p>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img alt="" src={Garden} style={{}} />
                            <p style={{ fontSize: '1.5em', lineHeight: '1.2em', paddingTop: '2em', paddingBottom: '0.5em', paddingLeft: "10%", paddingRight: "10%" }}>Vrtlarenje je odavno prestalo biti omiljeni 'hobi' rezerviran za ljude koji žive u ruralnim područjima ili kućama s dvorištem. Ako vam se uzgoj vlastitog povrća, salata ili začinskog bilja na balkonu, prozorskim klupicama ili pred ulaznim vratima čini kao zanimljiva razbibriga, pravi je trenutak da se okušate u ovom korisnom hobiju.</p>
                        </div>
                    </div>
                    <div style={{ flex: 2 }}></div>
                </div>
                <div style={{ flex: 2 }}></div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 6, backgroundColor: '#F0F0F0' }}>
                <div style={{ flex: 3 }}>
                    <p style={{ fontSize: '2em', color: '#4D974E', padding: '1em', textAlign: 'center' }}>Kako izgleda sadnja uz Plantzillu</p>
                </div>
                <div style={{ display: 'flex', flex: 6, justifyContent: 'space-evenly', padding: '1em', paddingTop: "2em", textAlign: 'center' }}>
                    <div style={{ flex: 1 }}></div>
                    <div style={{ flex: 2 }}>
                        <img alt="" src={Sprout} style={{}} />
                        <p style={{ fontSize: '1.5em', textAlign: 'center', marginTop: "-0.85em" }}>Odabirite željenu biljku za sadnju i dodajte je u Vaš popis</p>
                    </div>

                    <div style={{ flex: 0.8 }}></div>
                    <div style={{ flex: 2 }}>
                        <img alt="" src={Planty} style={{}} />
                        <p style={{ fontSize: '1.5em', textAlign: 'center', }}>Pratite uputstva za sadnju i brigu o Vašim biljkama</p>
                    </div>

                    <div style={{ flex: 0.8 }}></div>
                    <div style={{ flex: 2 }}>
                        <img alt="" src={Hot} style={{}} />
                        <p style={{ fontSize: '1.5em', textAlign: 'center' }}>Uz pomoć senzora pratite rast Vaše biljke i izvan kuće</p>
                    </div>

                    <div style={{ flex: 0.8 }}></div>
                    <div style={{ flex: 2 }}>
                        <img alt="" src={Book} style={{}} />
                        <p style={{ fontSize: '1.5em', textAlign: 'center' }}>U tren oka Vaša biljka će potpuno izrasti</p>
                    </div>
                    <div style={{ flex: 1 }}></div>
                </div>
            </div>

            <div id="Pricing" style={{ display: 'flex', flex: 10, backgroundColor: 'white', flexDirection: 'column' }}>
                <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '2em', color: '#4D974E', padding: '1em', textAlign: 'center' }}>Opcije</p>
                </div>
                <div style={{ display: 'flex', flex: 8, justifyContent: 'space-evenly', padding: '1em', paddingTop: "2em", textAlign: 'center' }}>
                    <div style={{ display: 'flex', flex: 1 }}></div>
                    <div style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: "1em" }}>
                            <div style={{ flex: 0.5 }}></div>
                            <p style={{ flex: 1, fontSize: '1.5em', textAlign: 'left' }}>Sadnica za početak</p>
                            <p style={{ flex: 1, fontSize: '2em', textAlign: 'left', paddingLeft: '0.5em' }}>Free</p>
                            <div style={{ flex: 0.5 }}></div>
                        </div>
                        <div style={{ flex: 8, display: 'flex', flexDirection: 'column', paddingTop: '1em', paddingBottom: '1em', backgroundColor: '#F0F0F0', justifyContent: 'space-evenly' }}>
                            <p style={{ fontSize: '1.5em', textAlign: 'center' }}>5 biljaka</p>
                            <p style={{ fontSize: '1.5em', textAlign: 'center' }}>Praćenje biljaka</p>
                            <p style={{ fontSize: '1.5em', textAlign: 'center' }}>Dobivanje obavijesti</p>
                            <p style={{ fontSize: '1.5em', textAlign: 'center' }}>Upute za sadnju</p>
                            <p style={{ fontSize: '1.5em', textAlign: 'center', textDecoration: 'line-through', color: 'gray' }}>Senzor za temperaturu i vlagu</p>
                            <p style={{ fontSize: '1.5em', textAlign: 'center', textDecoration: 'line-through', color: 'gray' }}>Senzor za temperaturu zemlje</p>
                            <p style={{ fontSize: '1.5em', textAlign: 'center', textDecoration: 'line-through', color: 'gray' }}>Senzor za vlagu</p>
                        </div>
                    </div>

                    <div style={{ flex: 1 }}></div>
                    <div style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: "1em" }}>
                            <div style={{ flex: 0.5 }}></div>
                            <p style={{ flex: 1, fontSize: '1.5em', textAlign: 'left' }}>Vrt za napredak</p>
                            <p style={{ flex: 1, fontSize: '2em', textAlign: 'left', paddingLeft: '0.5em' }}>75kn</p>
                            <div style={{ flex: 0.5 }}></div>
                        </div>
                        <div style={{ flex: 8, display: 'flex', flexDirection: 'column', paddingTop: '1em', paddingBottom: '1em', backgroundColor: '#F0F0F0', justifyContent: 'space-evenly' }}>
                            <p style={{ fontSize: '1.5em', textAlign: 'center' }}>25 biljaka</p>
                            <p style={{ fontSize: '1.5em', textAlign: 'center' }}>Praćenje biljaka</p>
                            <p style={{ fontSize: '1.5em', textAlign: 'center' }}>Dobivanje obavijesti</p>
                            <p style={{ fontSize: '1.5em', textAlign: 'center' }}>Upute za sadnju</p>
                            <p style={{ fontSize: '1.5em', textAlign: 'center' }}>Senzor za temperaturu i vlagu</p>
                            <p style={{ fontSize: '1.5em', textAlign: 'center', textDecoration: 'line-through', color: 'gray' }}>Senzor za temperaturu zemlje</p>
                            <p style={{ fontSize: '1.5em', textAlign: 'center', textDecoration: 'line-through', color: 'gray' }}>Senzor za vlagu</p>
                        </div>
                    </div>

                    <div style={{ flex: 1 }}></div>
                    <div style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: "1em" }}>
                            <div style={{ flex: 0.5 }}></div>
                            <p style={{ flex: 1.2, fontSize: '1.5em', textAlign: 'left' }}>Šuma za prave vrtlare</p>
                            <p style={{ flex: 1, fontSize: '2em', textAlign: 'left', paddingLeft: '0.5em' }}>150kn</p>
                            <div style={{ flex: 0.5 }}></div>
                        </div>
                        <div style={{ flex: 8, display: 'flex', flexDirection: 'column', paddingTop: '1em', paddingBottom: '1em', backgroundColor: '#F0F0F0', justifyContent: 'space-evenly' }}>
                            <p style={{ fontSize: '1.5em', textAlign: 'center' }}>∞ biljaka</p>
                            <p style={{ fontSize: '1.5em', textAlign: 'center' }}>Praćenje biljaka</p>
                            <p style={{ fontSize: '1.5em', textAlign: 'center' }}>Dobivanje obavijesti</p>
                            <p style={{ fontSize: '1.5em', textAlign: 'center' }}>Upute za sadnju</p>
                            <p style={{ fontSize: '1.5em', textAlign: 'center' }}>Senzor za temperaturu i vlagu</p>
                            <p style={{ fontSize: '1.5em', textAlign: 'center' }}>Senzor za temperaturu zemlje</p>
                            <p style={{ fontSize: '1.5em', textAlign: 'center' }}>Senzor za vlagu</p>
                        </div>
                    </div>
                    <div style={{ flex: 1 }}></div>
                </div>
                <div style={{ flex: 1 }}></div>
            </div>

            <div id="Map" style={{ display: 'flex', flexDirection: 'column', flex: 10, backgroundColor: '#F0F0F0', paddingTop:"0.5em", paddingBottom:"0.5em" }}>
                <div style={{ flex: 1 }}></div>
                <div style={{ flex: 12, display: 'flex' }}>
                    <div style={{ flex: 1 }}></div>
                    <div style={{ flex: 7, backgroundColor: 'white', display: 'flex' }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '3em' }}>
                            <p style={{ fontSize: '1.5em', flex: 0.5, paddingBottom: '1em' }}>Javite nam se</p>
                            <form style={{ flex: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                <input type="text" placeholder="Ime" style={{ backgroundColor: '#F0F0F0', padding: '0.5em', marginBottom: '0.5em' }} />
                                <input type="text" placeholder="Email" style={{ backgroundColor: '#F0F0F0', padding: '0.5em', marginBottom: '0.5em' }} />
                                <textarea placeholder="Vaša poruka" rows="15" style={{ backgroundColor: '#F0F0F0', padding: '0.5em', marginBottom: '0.5em' }} />
                                <input type="submit" value="Pošalji" style={{ textAlign: 'left', width: '3.2em' }} />
                            </form>
                            <div style={{ flex: 1 }}></div>
                        </div>
                        <div style={{ flex: 2 }}>
                            <Map sensorValues={sensorValues} />
                        </div>
                    </div>
                    <div style={{ flex: 1 }}></div>
                </div>
                <div style={{ flex: 1 }}></div>
            </div>
            <div id="Contact" style={{ display: 'flex', flex: 0.5, backgroundColor: '#424242', padding: '1em', flexDirection: 'column', fontSize: '1.2em' }}>
                <div style={{ flex: 2, display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flex: 3, justifyContent: 'space-between', alignItems: 'flex-Start', paddingLeft: '0.6em' }}>
                        <a style={navLink2} href="#Top">Na vrh</a>
                        <a style={navLink2} href="#About">O Plantzilli</a>
                        <a style={navLink2} href="#Pricing">Opcije</a>
                        <a style={navLink2} href="#Map">Esri mapa</a>
                    </div>
                    <div style={{ flex: 5 }}></div>
                    <div style={{ flex: 1 }}>
                        <p style={{ color: 'white', padding: '0.5em' }}>Pronađite nas na:</p>
                        <img alt="" src={Facebook} style={{ marginBottom: '0.1em' }} />
                        <img alt="" src={Instagram} style={{}} />
                    </div>
                </div>
                <div style={{ flex: 1, borderTop: "1px solid white" }}>
                    <p style={{ color: 'white', padding: '0.5em' }}>Made with love Plantzilla, 2020</p>
                </div>
            </div>
        </div>
    );
}


class Map extends React.Component {

    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
    }


    componentDidMount() {
        loadModules(['esri/Map',
            'esri/views/MapView',
            "esri/Graphic",
            "esri/layers/GraphicsLayer"],
            { css: true })
            .then(([ArcGISMap, MapView, Graphic, GraphicsLayer]) => {
                const map = new ArcGISMap({
                    basemap: 'topo-vector'
                });

                this.view = new MapView({
                    container: this.mapRef.current,
                    map: map,
                    center: [15.98, 45.79],
                    zoom: 11
                });

                let graphicsLayer = new GraphicsLayer({ id: 'Biljke', title: 'Biljke' });
                map.add(graphicsLayer);

                const lokacijeSenzora = [[15.982, 45.804], [15.971, 45.801], [15.983, 45.809]];
                const urlSlike = ["https://i.ibb.co/Tr79kkx/download.jpg", "https://i.ibb.co/nCRSyWy/images.jpg", "https://i.ibb.co/0ZwgQBZ/peperomija-biljka-kakva-je-za-uzgoj-i-sto-biljku-krasi-5328867311ad51a03e0ca8d8f5a00502-view-article-new.jpg"]

                function createMapGraphics(sensorsData) {
                    Object.entries(sensorsData).forEach(([key, sensor], index) => {
                        createMapPoints(sensor, key, lokacijeSenzora[index], urlSlike[index]);
                    });
                }

                if (this.props.sensorValues.data) {
                    createMapGraphics(this.props.sensorValues.data);
                }

                function createMapPoints(sensor, sensorName, lokacija, slika) {
                    var point = { type: "point", longitude: lokacija[0], latitude: lokacija[1] };
                    let color = "blue";
                    if (sensor.tmpzrak < 11) {
                        color = "red";
                    }
                    let symbol = {
                        type: "simple-marker",
                        style: "circle",
                        color,
                        size: "8px",  // pixels
                        outline: {  // autocasts as new SimpleLineSymbol()
                            color,
                            width: 1  // points
                        }
                    };

                    let popup = {
                        title: `${sensorName}`,
                        content: [{
                            // Pass in the fields to display
                            type: "fields",
                            fieldInfos: [{
                                fieldName: "tmpzrak",
                                label: "Temperatura zraka",
                            }, {
                                fieldName: "vlzrak",
                                label: "Vlažnost zraka",
                            },
                            {
                                fieldName: "tmptlo",
                                label: "Temperatura tla"
                            }, {
                                fieldName: "vltlo",
                                label: "Vlažnost tla"
                            }],
                        }, {
                            type: "media",
                            mediaInfos: {
                                title: "<b>Slika biljke</b>",
                                type: "image",
                                value: {
                                    sourceURL: slika
                                }
                            }
                        }]
                    }

                    var pointGraphic = new Graphic({
                        geometry: point,
                        symbol: symbol,
                        attributes: sensor,
                        popupTemplate: popup,
                        putFields: []
                    });

                    graphicsLayer.add(pointGraphic);

                };
            });
    }
    componentWillUnmount() {
        if (this.view) {
            // destroy the map view
            this.view.container = null;
        }
    }
    render() {
        return (
            <div style={{ height: '100%', width: '100%' }} ref={this.mapRef} />
        );
    }
};