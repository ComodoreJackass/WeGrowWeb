import React, { useEffect, useRef } from 'react';
import './css.css';
import { loadModules } from 'esri-loader';

import Plant from './plant.png';
import Strelica from './strelica.png';
import Zaljevanje from './zaljevanje.png';
import Tegla from './tegla.png';
import Ante from './ante.png';
import Elena from './elena.jpg';
import Tomislav from './tomislav.jpg';
import Duro from './duro.png';
import Sanja from './sanja.png';

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

    return (
        <div className="wrapper">
            <section className="section parallax bg1">
                <div className="topnav">
                    <a href="#about">O nama</a>
                    <a href="#pricing">Cijene</a>
                    <a href="#reviews">Recenzije</a>
                    <a href="#map">Mapa senzora</a>
                    <a href="#login" onClick={() => { props.returnLogin(true) }}>Prijavi me</a>
                </div>
                <div className="naslov" style={{ padding: 20 }}>
                    <h2 className="n2">We grow</h2>
                    <p className="par">Odaberite svoju željenu biljku i krenite u avanturu sadnje biljaka </p>
                </div>
            </section>

            <section id="about" className="section static">
                <div className="goreLijevo">
                    <img className="plant" alt="" src={Plant} style={{ width: "15%" }} />
                    <h1 className="n1">Odaberite željenu biljku za sadnju </h1>
                </div>
                <img className="strelica1" alt="" src={Strelica} />
                <div className="sredina">
                    <img className="zaljevanje" alt="" src={Zaljevanje} style={{ width: "20%" }} />
                    <h4 className="n4">Pomoću senzora dobivat ćete obavijesti oko biljke </h4>
                </div>
                <img className="strelica2" alt="" src={Strelica} />
                <div className="doleLijevo">
                    <img className="tegla" alt="" src={Tegla} style={{ width: "20%" }} />
                    <h1 className="n1" >Nakon puno pažnje dobit ćete željenu biljku u punom sjaju</h1>
                </div>
            </section>

            <section id="pricing" className="section parallax bg2">
                <div className="lijevoPada">
                    <h3> SADNICA </h3>
                    <div className="cijena"> Free </div>
                    <li> 5 biljaka </li>
                    <div className="crta"> ________ </div>
                    <li> Praćenje biljaka</li>
                    <div className="crta"> ________ </div>
                    <li> Dobivanje obavijesti</li>
                </div>
                <div className="sredinaPada">
                    <h3> VRT </h3>
                    <div className="cijena">75kn</div>
                    <li> 2 mjeseca besplatna aplikacija, nakon 25kn/mjesec </li>
                    <div className="crta"> ________ </div>
                    <li> 25 biljaka </li>
                    <div className="crta"> ________ </div>
                    <li> Praćenje biljaka</li>
                    <div className="crta"> ________ </div>
                    <li> Dobivanje obavijesti</li>
                    <div className="crta"> ________ </div>
                    <li> Upute za sadnju</li>
                    <div className="crta"> ________ </div>
                    <li> Senzor za temperaturu i vlagu </li>
                </div>
                <div className="desnoPada">
                    <h3> ŠUMA </h3>
                    <div className="cijena"> 150 kn </div>
                    <li> 4 mjeseca besplatna aplikacija, nakon 45kn/mjesec </li>
                    <div className="crta"> ________ </div>
                    <li> Neograničen broj biljka </li>
                    <div className="crta"> ________ </div>
                    <li> Praćenje biljaka</li>
                    <div className="crta"> ________ </div>
                    <li> Dobivanje obavijesti</li>
                    <div className="crta"> ________ </div>
                    <li> Upute za sadnju</li>
                    <div className="crta"> ________ </div>
                    <li> Senzor za temperaturu i vlagu </li>
                    <div className="crta"> ________ </div>
                    <li> Senzor za temperaturu zemlje </li>
                    <div className="crta"> ________ </div>
                    <li> Senzor za vlagu zemlje </li>
                    <div className="crta"> ________ </div>
                    <li> Nema reklama </li>
                </div>
            </section>

            <section id="reviews" className="section static1">
                <div className="testimonials-section">
                    <input type="radio" name="slider" title="slide1" defaultChecked="checked" className="slider__nav" />
                    <input type="radio" name="slider" title="slide2" className="slider__nav" />
                    <input type="radio" name="slider" title="slide3" className="slider__nav" />
                    <input type="radio" name="slider" title="slide4" className="slider__nav" />
                    <input type="radio" name="slider" title="slide5" className="slider__nav" />
                    <div className="slider__inner">
                        <div className="slider__contents">
                            <img className="ante" alt="" src={Ante} style={{ width: "15%" }} />
                            <p className="slider__txt par">Bez ove aplikacije moje biljke bi stalno propadale. Uz Wegrow to više nije slučaj</p>
                            <h2 className="slider__caption n2"> Ante Markić | Poliglot,škola stranih jezika</h2>
                        </div>
                        <div className="slider__contents">
                            <img className="elena" src={Elena} alt="" style={{ width: "15%" }} />
                            <p className="slider__txt par">Kao teta u vrtiću, mališane smo učili sadnju, Wegrow je puno pomogo da se ta sadnja ostvari.</p>
                            <h2 className="slider__caption n2"> Elena Rudec | Malci i Komarci</h2>
                        </div>

                        <div className="slider__contents">
                            <img className="tomislav" src={Tomislav} alt="" style={{ width: "15%" }} />
                            <p className="slider__txt par">Uspio sam zasaditi svoju omiljenu biljku koju sam vec pokusavao godinama. Veliko hvala</p>
                            <h2 className="slider__caption n2">Tomislav Janjić | Bravar</h2>
                        </div>

                        <div className="slider__contents">
                            <img className="duro" src={Duro} alt="" style={{ width: "15%" }} />
                            <p className="slider__txt par">Moja Đurđa me uvijek gnjavila da ne znam ništa o biljkama, ali sve znam s Wegrow jednim klikom.</p>
                            <h2 className="slider__caption n2"> Đuro Popović | Umirovljenik</h2>
                        </div>
                        <div className="slider__contents">
                            <img className="sanja" src={Sanja} alt="" style={{ width: "15%" }} />
                            <p className="slider__txt par">Želim da svake godine bude sve bolji, uz senzore i upute očekujem jos bolji vrt ove godine.</p>
                            <h2 className="slider__caption n2">Sanja Horvat | Doktor</h2>
                        </div>
                    </div>
                </div>
            </section>

            <section id="map" className="section static1">
                <Map sensorValues={sensorValues}/>
            </section>
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
            <div className="webmap" ref={this.mapRef} />
        );
    }
};