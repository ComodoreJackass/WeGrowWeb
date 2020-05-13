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

function Landing(props) {
    return (
        <div className="wrapper">
            <section className="section parallax bg1">
                <div className="topnav">
                    <a href="#home">O nama</a>
                    <a href="#news">Cijene</a>
                    <a href="#contact">Mapa</a>
                    <a href="#" onClick={() => { props.returnLogin(true) }}>Log in</a>
                </div>
                <div className="naslov" style={{ padding: 20 }}>
                    <h2>We grow</h2>
                    <p>Odaberite svoju željenu biljku i krenite u avanturu sadnje biljaka </p>
                </div>
            </section>

            <section id="home" className="section static">
                <div className="goreLijevo">
                    <img className="plant" src={Plant} style={{ width: "15%" }} />
                    <h1 className="aukurac">Odaberite željenu biljku za sadnju </h1>
                </div>
                <img className="strelica1" src={Strelica} />
                <div className="sredina">
                    <img className="zaljevanje" src={Zaljevanje} style={{ width: "20%" }} />
                    <h4>Pomocu senzora dobivat cete obavijesti oko biljke </h4>
                </div>
                <img className="strelica2" src={Strelica} />
                <div className="doleLijevo">
                    <img className="tegla" src={Tegla} style={{ width: "20%" }} />
                    <h1 className="aukurac" >Nakon puno pažnje dobit cete željenu biljku u punom sjaju</h1>
                </div>
            </section>

            <section id="news" className="section parallax bg2">
                <div className="lijevoPada">
                    <h3> SADNICA </h3>
                    <div className="cijena"> 0 kn </div>
                    <li> 5 biljaka </li>
                    <div className="crta"> ________ </div>
                    <li> Praćenje biljaka</li>
                    <div className="crta"> ________ </div>
                    <li> Dobivanje obavijesti</li>
                </div>
                <div className="sredinaPada">
                    <h3> VRT </h3>
                    <div className="cijena"> 75 kn </div>
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

            <section className="section static1">
                <div className="testimonials-section">
                    <input type="radio" name="slider" title="slide1" checked="checked" className="slider__nav" />
                    <input type="radio" name="slider" title="slide2" className="slider__nav" />
                    <input type="radio" name="slider" title="slide3" className="slider__nav" />
                    <input type="radio" name="slider" title="slide4" className="slider__nav" />
                    <input type="radio" name="slider" title="slide5" className="slider__nav" />
                    <div className="slider__inner">
                        <div className="slider__contents">
                            <img className="ante" src={Ante} style={{ width: "15%" }} />
                            <p className="slider__txt">Bez ove aplikacije moje biljke bi stalno propadale. Uz Wegrow to više nije slučaj</p>
                            <h2 className="slider__caption"> Ante Markić | Poliglot,škola stranih jezika</h2>
                        </div>
                        <div className="slider__contents">
                            <img className="elena" src={Elena} style={{ width: "15%" }} />
                            <p className="slider__txt">Kao teta u vrtiću, mališane smo učili sadnju, Wegrow je puno pomogo da se ta sadnja ostvari.</p>
                            <h2 className="slider__caption"> Elena Rudec | Malci i Komarci</h2>
                        </div>

                        <div className="slider__contents">
                            <img className="tomislav" src={Tomislav} style={{ width: "15%" }} />
                            <p className="slider__txt">Uspio sam zasaditi svoju omiljenu biljku koju sam vec pokusavao godinama. Veliko hvala</p>
                            <h2 className="slider__caption">Tomislav Janjić | Bravar</h2>
                        </div>

                        <div className="slider__contents">
                            <img className="duro" src={Duro} style={{ width: "15%" }} />
                            <p className="slider__txt">Moja Đurđa me uvijek gnjavila da ne znam ništa o biljkama, ali sve znam s Wegrow jednim klikom.</p>
                            <h2 className="slider__caption"> Đuro Popović | Umirovljenik</h2>
                        </div>
                        <div className="slider__contents">
                            <img className="sanja" src={Sanja} style={{ width: "15%" }} />
                            <p className="slider__txt">Želim da svake godine bude sve bolji, uz senzore i upute očekujem jos bolji vrt ove godine.</p>
                            <h2 className="slider__caption">Sanja Horvat | Doktor</h2>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section static1">
                <Map/>
            </section>
        </div>
    );
}

//TODO, expand landing with map
const Map = () => {
    const mapRef = useRef();

    useEffect(
        () => {
            // lazy load 
            loadModules(['esri/Map',
                'esri/views/MapView',
                "esri/Graphic",
                "esri/layers/GraphicsLayer",
                "esri/widgets/Popup"],
                { css: true })
                .then(([ArcGISMap, MapView, Graphic, GraphicsLayer, Popup]) => {
                    const map = new ArcGISMap({
                        basemap: 'topo-vector'
                    });

                    // Map view i ref DOM
                    const view = new MapView({
                        container: mapRef.current,
                        map: map,
                        center: [15.98, 45.81],
                        zoom: 8
                    });


                    //view.popup.autoOpenEnabled = true;
                    view.on("click", (evt) => {

                        if (evt.button === 2) {
                            console.log('right');
                        }
                        else if (evt.button === 1) {
                            console.log('left');
                        }

                        let lat = evt.mapPoint.latitude;
                        let lng = evt.mapPoint.longitude;

                        view.popup.open({
                            // Set the popup's title to the coordinates of the location
                            title: "Location: [" + lat + ", " + lng + "]",
                            location: evt.mapPoint // Set the location of the popup to the clicked location
                        });
                    });

                    let graphicsLayer = new GraphicsLayer({ id: 'Biljke' });

                    map.add(graphicsLayer);

                    var point = { type: "point", longitude: 15.9812, latitude: 45.8013 };

                    let symbol = {
                        type: "simple-marker",
                        style: "circle",
                        color: "blue",
                        size: "8px",  // pixels
                        outline: {  // autocasts as new SimpleLineSymbol()
                            color: [0, 255, 255],
                            width: 3  // points
                        }
                    };

                    var pointGraphic = new Graphic({ geometry: point, symbol: symbol, attributes: 'Neka biljcica' });
                    graphicsLayer.add(pointGraphic);

                    return () => {
                        if (view) {
                            // destroy the map view
                            view.container = null;
                        }
                    };
                });
        }
    );

    return (
        <div className="webmap" ref={mapRef} />
    );
};

export default Landing;
