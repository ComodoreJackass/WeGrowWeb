import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import './css.css';
import { ReactComponent as Logo } from '../assets/logo.svg';
import LandingPic from '../assets/landing.png';
import Soon from '../assets/soon.png';
import Garden from '../assets/garden.png';
import Sprout from '../assets/sprout.png';
import Planty from '../assets/plant.png';
import Book from '../assets/book.png';
import Hot from '../assets/hot.png';

import IconButton from '@material-ui/core/IconButton';
import Facebook from '@material-ui/icons/Facebook';
import Instagram from '@material-ui/icons/Instagram';
import Button from '@material-ui/core/Button';

import GoogleLogin from 'react-google-login';

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
        display: 'block',
        whiteSpace: 'nowrap',
        textDecoration: 'none',
        fontFamily: 'Rubik',
        color: 'black',
        fontSize: '1.1em',
        marginRight: '0.2em'
    };

    const navLink2 = {
        display: 'block',
        whiteSpace: 'nowrap',
        textDecoration: 'none',
        fontFamily: 'Rubik',
        color: 'white',
        fontSize: '1.1em',
        marginRight: '0.2em'
    };

    const responseGoogle = (response) => {
        console.log(response);
    }

    function changeBackground(e) {
        e.target.style.background = '#2EB77D';
        e.target.style.color = 'white';
    }

    function restoreBackground(e) {
        e.target.style.background = '#F0F0F0';
        e.target.style.color = 'black';
    }

    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 1000;

    React.useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);

        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    function layout() {
        if (width < breakpoint) {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '420vh', width: '100%', backgroundColor: 'white' }}>
                    <div id="Top" style={navbar}>
                        <div style={{ display: 'flex', flex: 6, justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                            <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', flex: 6, justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                                <li><Logo style={{ height: '4em' }} /></li>
                                <li><a style={navLink} href="#" onClick={() => { props.returnLogin(true) }}>Prijava</a></li>
                                <li><GoogleLogin
                                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                    buttonText="Login"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                /></li>
                            </ul>
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 9,
                        backgroundImage: `url(${LandingPic})`,
                        backgroundPosition: 'center left',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        alignItems: 'center'
                    }}>
                        <div style={{ flex: 2 }}></div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                                padding: '1em'
                            }}>
                                <p style={{ flex: 4, fontSize: '3em', paddingBottom: '1em' }}>Plantzilla</p>
                                <p style={{ fontSize: '1.2em' }}>Naša aplikacija nudi novo iskustvo za Vas i Vaše biljke</p>
                                <p style={{ fontSize: '1.2em', paddingBottom: '2em' }}>Vrijeme je sad i zato krenite</p>
                                <img alt="" src={Soon} style={{
                                    width: '100%',
                                    maxWidth: '100px',
                                    height: 'auto'
                                }} />
                            </div>
                        </div>
                        <div style={{ flex: 4 }}></div>
                    </div>

                    <div id="About" style={{ display: 'flex', flex: 9, backgroundColor: 'white', width: '100%' }}>
                        <div style={{ flex: 1 }}></div>
                        <div style={{ display: 'flex', flex: 5, flexDirection: 'column' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', flex: 13, textAlign: 'center', justifyContent: 'space-around', alignItems: 'center' }}>
                                <p style={{ fontSize: '2em', color: '#4D974E', paddingTop: '0.5em' }}>Zašto koristiti Plantzillu?</p>
                                <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                    <img alt="" src={Garden} style={{
                                        width: '100%',
                                        maxWidth: '80%',
                                        height: 'auto',
                                        marginTop: "1em"
                                    }} />
                                    <p style={{ fontSize: '1.2em', lineHeight: '1.2em', paddingTop: '2em', paddingBottom: '0.5em' }}>Vrtlarenje je odavno prestalo biti omiljeni 'hobi' rezerviran za ljude koji žive u ruralnim područjima ili kućama s dvorištem. Ako vam se uzgoj vlastitog povrća, salata ili začinskog bilja na balkonu, prozorskim klupicama ili pred ulaznim vratima čini kao zanimljiva razbibriga, pravi je trenutak da se okušate u ovom korisnom hobiju.</p>
                                </div>
                            </div>
                            <div style={{ flex: 1 }}></div>
                        </div>
                        <div style={{ flex: 1 }}></div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 6, backgroundColor: '#F0F0F0' }}>
                        <div style={{ flex: 3 }}>
                            <p style={{ fontSize: '2em', color: '#4D974E', padding: '1em', textAlign: 'center' }}>Kako izgleda sadnja uz Plantzillu</p>
                        </div>
                        <div style={{ display: 'flex', flex: 6, justifyContent: 'space-evenly', flexDirection: 'column', padding: '1em', paddingTop: "2em", textAlign: 'center' }}>
                            <div style={{ flex: 1 }}></div>
                            <div style={{ flex: 2 }}>
                                <img alt="" src={Sprout} style={{
                                    width: '100%',
                                    maxWidth: '100px',
                                    height: 'auto'
                                }} />
                                <p style={{ fontSize: '1.2em', textAlign: 'center', marginTop: "-0.85em" }}>Odabirite željenu biljku za sadnju i dodajte je u Vaš popis</p>
                            </div>

                            <div style={{ flex: 0.8 }}></div>
                            <div style={{ flex: 2, marginTop: "1em" }}>
                                <img alt="" src={Planty} style={{
                                    width: '100%',
                                    maxWidth: '100px',
                                    height: 'auto'
                                }} />
                                <p style={{ fontSize: '1.2em', textAlign: 'center', }}>Pratite uputstva za sadnju i brigu o Vašim biljkama</p>
                            </div>

                            <div style={{ flex: 0.8 }}></div>
                            <div style={{ flex: 2, marginTop: "1em" }}>
                                <img alt="" src={Hot} style={{
                                    width: '100%',
                                    maxWidth: '100px',
                                    height: 'auto'
                                }} />
                                <p style={{ fontSize: '1.2em', textAlign: 'center' }}>Uz pomoć senzora pratite rast Vaše biljke i izvan kuće</p>
                            </div>

                            <div style={{ flex: 0.8 }}></div>
                            <div style={{ flex: 2, marginTop: "1em" }}>
                                <img alt="" src={Book} style={{
                                    width: '100%',
                                    maxWidth: '100px',
                                    height: 'auto'
                                }} />
                                <p style={{ fontSize: '1.2em', textAlign: 'center' }}>U tren oka Vaša biljka će potpuno izrasti</p>
                            </div>
                            <div style={{ flex: 1 }}></div>
                        </div>
                    </div>

                    <div id="Pricing" style={{ display: 'flex', flex: 10, backgroundColor: 'white', flexDirection: 'column' }}>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '2em', color: '#4D974E', padding: '1em', textAlign: 'center' }}>Opcije</p>
                        </div>
                        <div style={{ display: 'flex', flex: 8, justifyContent: 'space-evenly', flexDirection: 'column', padding: '1em', paddingTop: "2em", textAlign: 'center' }}>
                            <div style={{ display: 'flex', flex: 1 }}></div>
                            <div style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: "1em" }}>
                                    <div style={{ flex: 0.5 }}></div>
                                    <p style={{ flex: 1, fontSize: '1.5em', textAlign: 'center' }}>Sadnica za početak</p>
                                    <p style={{ flex: 1, fontSize: '2em', textAlign: 'center', paddingLeft: '0.5em' }}>Free</p>
                                    <div style={{ flex: 0.5 }}></div>
                                </div>
                                <div
                                    style={{ flex: 8, display: 'flex', flexDirection: 'column', paddingTop: '1em', paddingBottom: '1em', backgroundColor: '#F0F0F0', justifyContent: 'space-evenly' }}
                                    className="opcije"
                                    onMouseOver={changeBackground}
                                    onMouseLeave={restoreBackground}
                                >
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
                            <div style={{ flex: 2, display: 'flex', flexDirection: 'column', marginTop: "1em" }}>
                                <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: "1em" }}>
                                    <div style={{ flex: 0.5 }}></div>
                                    <p style={{ flex: 1, fontSize: '1.5em', textAlign: 'center' }}>Vrt za napredak</p>
                                    <p style={{ flex: 1, fontSize: '2em', textAlign: 'center', paddingLeft: '0.5em' }}>75kn</p>
                                    <div style={{ flex: 0.5 }}></div>
                                </div>
                                <div
                                    style={{ flex: 8, display: 'flex', flexDirection: 'column', paddingTop: '1em', paddingBottom: '1em', backgroundColor: '#F0F0F0', justifyContent: 'space-evenly' }}
                                    className="opcije"
                                    onMouseOver={changeBackground}
                                    onMouseLeave={restoreBackground}
                                >
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
                            <div style={{ flex: 2, display: 'flex', flexDirection: 'column', marginTop: "1em" }}>
                                <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: "1em" }}>
                                    <div style={{ flex: 0.5 }}></div>
                                    <p style={{ flex: 1.2, fontSize: '1.5em', textAlign: 'center' }}>Šuma za prave vrtlare</p>
                                    <p style={{ flex: 1, fontSize: '2em', textAlign: 'center', paddingLeft: '0.5em' }}>150kn</p>
                                    <div style={{ flex: 0.5 }}></div>
                                </div>
                                <div
                                    style={{ flex: 8, display: 'flex', flexDirection: 'column', paddingTop: '1em', paddingBottom: '1em', backgroundColor: '#F0F0F0', justifyContent: 'space-evenly' }}
                                    className="opcije"
                                    onMouseOver={changeBackground}
                                    onMouseLeave={restoreBackground}
                                >
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

                    <div id="Map" style={{ display: 'flex', flexDirection: 'column', flex: 10, backgroundColor: '#F0F0F0', paddingTop: "0.5em", paddingBottom: "0.5em" }}>
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
                                        <Button style={{ width: "2em" }}>
                                            <input type="submit" value="Pošalji" style={{ textAlign: 'left', width: '3.2em' }} />
                                        </Button>
                                    </form>
                                    <div style={{ flex: 1 }}></div>
                                </div>
                            </div>
                            <div style={{ flex: 1 }}></div>
                        </div>
                        <div style={{ flex: 1 }}></div>
                    </div>
                    <div id="Contact" style={{ display: 'flex', flex: 0.5, backgroundColor: '#424242', padding: '1em', flexDirection: 'column', fontSize: '1.2em' }}>
                        <div style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ flex: 5, display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
                                <p style={{ color: 'white', padding: '0.5em' }}>Pronađite nas na:</p>
                                <div style={{ paddingRight: "1em" }}>
                                    <IconButton aria-label="facebook">
                                        <a href="https://www.facebook.com/Plantzilla-103503864727030/?modal=admin_todo_tour" target="_blank">
                                            <Facebook style={{ color: 'white', fontSize: '1.5em' }} />
                                        </a>
                                    </IconButton>
                                    <IconButton aria-label="instagram">
                                        <a href="https://www.instagram.com/Plantzilla_App/" target="_blank">
                                            <Instagram style={{ color: 'white', fontSize: '1.5em' }} />
                                        </a>
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                        <div style={{ flex: 1, borderTop: "1px solid white" }}>
                            <p style={{ color: 'white', padding: '0.5em' }}>Made with love Plantzilla, 2020</p>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '420vh', backgroundColor: 'white' }}>
                    <div id="Top" style={navbar}>
                        <div style={{ display: 'flex', flex: 6, justifyContent: 'space-around', alignItems: 'center' }}>
                            <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', flex: 6, justifyContent: 'space-between', alignItems: 'center' }}>
                                <li><Logo style={{ height: '4em' }} /></li>
                                <a style={navLink} href="#About"><li>O Plantzilli</li></a>
                                <li><a style={navLink} href="#Pricing">Opcije</a></li>
                                <li><a style={navLink} href="#Map">Esri Mapa</a></li>
                                <li><a style={navLink} href="#Contact">Kontakt</a></li>
                            </ul>
                        </div>
                        <div style={{ flex: 8 }}></div>
                        <div style={{ display: 'flex', flexDirection: 'row', flex: 2, alignItems: 'center', justifyContent: 'space-around' }}>
                            <a style={navLink} href="#" onClick={() => { props.returnLogin(true) }}>Prijava</a>
                            <GoogleLogin
                                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
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
                                <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                    <img alt="" src={Garden} style={{ height: 400 }} />
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
                                <div
                                    style={{ flex: 8, display: 'flex', flexDirection: 'column', paddingTop: '1em', paddingBottom: '1em', backgroundColor: '#F0F0F0', justifyContent: 'space-evenly' }}
                                    className="opcije"
                                    onMouseOver={changeBackground}
                                    onMouseLeave={restoreBackground}
                                >
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
                                <div
                                    style={{ flex: 8, display: 'flex', flexDirection: 'column', paddingTop: '1em', paddingBottom: '1em', backgroundColor: '#F0F0F0', justifyContent: 'space-evenly' }}
                                    className="opcije"
                                    onMouseOver={changeBackground}
                                    onMouseLeave={restoreBackground}
                                >
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
                                <div
                                    style={{ flex: 8, display: 'flex', flexDirection: 'column', paddingTop: '1em', paddingBottom: '1em', backgroundColor: '#F0F0F0', justifyContent: 'space-evenly' }}
                                    className="opcije"
                                    onMouseOver={changeBackground}
                                    onMouseLeave={restoreBackground}
                                >
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

                    <div id="Map" style={{ display: 'flex', flexDirection: 'column', flex: 10, backgroundColor: '#F0F0F0', paddingTop: "0.5em", paddingBottom: "0.5em" }}>
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
                                        <Button style={{ width: "2em" }}>
                                            <input type="submit" value="Pošalji" style={{ textAlign: 'left', width: '3.2em' }} />
                                        </Button>
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
                        <div style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', flex: 2, justifyContent: 'space-between', alignItems: 'flex-Start', paddingLeft: '0.6em' }}>
                                <a style={navLink2} href="#Top">Na vrh</a>
                                <a style={navLink2} href="#About">O Plantzilli</a>
                                <a style={navLink2} href="#Pricing">Opcije</a>
                                <a style={navLink2} href="#Map">Esri mapa</a>
                            </div>
                            <div style={{ flex: 5, display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
                                <p style={{ color: 'white', padding: '0.5em' }}>Pronađite nas na:</p>
                                <div style={{ paddingRight: "1em" }}>
                                    <IconButton aria-label="facebook">
                                        <a href="https://www.facebook.com/Plantzilla-103503864727030/?modal=admin_todo_tour" target="_blank">
                                            <Facebook style={{ color: 'white', fontSize: '1.5em' }} />
                                        </a>
                                    </IconButton>
                                    <IconButton aria-label="instagram">
                                        <a href="https://www.instagram.com/Plantzilla_App/" target="_blank">
                                            <Instagram style={{ color: 'white', fontSize: '1.5em' }} />
                                        </a>
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                        <div style={{ flex: 1, borderTop: "1px solid white" }}>
                            <p style={{ color: 'white', padding: '0.5em' }}>Made with love Plantzilla, 2020</p>
                        </div>
                    </div>
                </div>
            );
        }
    }

    return (
        <div>
            {layout()}
        </div>
    );

}


class Map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dimenzion: '3D',
            chart: 'tmpzrak',
            isActive: 'tmpzrak',
            sensorsData: '',
            Ime: ["Rajčica", "Kaktus", "Sobna biljka"],
            lokacijeSenzora: [[15.972, 45.814], [15.971, 45.801], [15.983, 45.809]],
            urlSlike: ["https://i.ibb.co/Tr79kkx/download.jpg", "https://i.ibb.co/nCRSyWy/images.jpg", "https://i.ibb.co/0ZwgQBZ/peperomija-biljka-kakva-je-za-uzgoj-i-sto-biljku-krasi-5328867311ad51a03e0ca8d8f5a00502-view-article-new.jpg"]
        };

        this.mapRef = React.createRef();
        this.legend = React.createRef();
        this.switchButton = React.createRef();
    }

    tempValues;
    graphicsLayer;
    Graphic;
    Polyline;
    TextSymbol;
    Point;
    create2DView;
    create3DView;
    LineSymbol3DLayer;

    componentDidMount() {
        // lazy load za ArcGIS api module i css
        loadModules(['esri/Map',
            'esri/views/MapView',
            "esri/Graphic",
            "esri/layers/GraphicsLayer",
            "esri/widgets/ScaleBar",
            "esri/widgets/Search",
            "esri/widgets/BasemapToggle",
            "esri/views/SceneView",
            "esri/geometry/Polyline",
            "esri/symbols/TextSymbol",
            "esri/geometry/Point",
            "esri/widgets/Compass",
            "esri/symbols/LineSymbol3DLayer"],
            { css: true })
            .then(([ArcGISMap, MapView, Graphic, GraphicsLayer, ScaleBar, Search, BasemapToggle, SceneView, Polyline, TextSymbol, Point, Compass, LineSymbol3DLayer]) => {

                this.Graphic = Graphic;
                this.Polyline = Polyline;
                this.TextSymbol = TextSymbol;
                this.Point = Point;
                this.LineSymbol3DLayer = LineSymbol3DLayer;

                let map = new ArcGISMap({
                    basemap: 'topo',
                    ground: "world-elevation"
                });

                const createViewElements = () => {
                    var search = new Search({
                        view: this.view
                    });

                    this.view.ui.add(search, "top-right");

                    var basemapToggle = new BasemapToggle({
                        view: this.view,
                        nextBasemap: "streets-night-vector"
                    });

                    this.view.ui.add(this.legend.current, "bottom-left");
                    this.view.ui.add(this.switchButton.current, "top-right");

                    this.view.ui.add(basemapToggle, "bottom-right");

                    this.graphicsLayer = new GraphicsLayer({ id: 'Biljke', title: 'Biljke' });

                    map.add(this.graphicsLayer);

                    if (this.graphicsLayer) {
                        try {
                            this.graphicsLayer.removeAll();
                        } catch (e) {
                            console.log('Unable to remove graphics');
                            console.log('error' + e)
                        }
                    }

                    var currentElevationInfo = {
                        mode: "relative-to-ground",
                        offset: 0,
                        unit: "meters"
                    };

                    this.graphicsLayer.elevationInfo = currentElevationInfo;

                    if (this.props.sensorValues.data) {
                        this.setState({
                            sensorsData: this.props.sensorValues.data
                        }, () => {
                            this.createMapGraphics(this.state.sensorsData, this.state.lokacijeSenzora, this.state.urlSlike);
                        });
                    }
                }

                //Scalebar can not be rendered for 3d map
                const addAditinal2DElements = () => {
                    var scaleBar = new ScaleBar({
                        view: this.view,
                        unit: "metric"
                    });

                    this.view.ui.add(scaleBar, {
                        position: "bottom-left"
                    });

                    var compass = new Compass({
                        view: this.view
                    });

                    // adds the compass to the top left corner of the MapView
                    this.view.ui.add(compass, "top-left");
                }

                this.create2DView = () => {
                    if (this.graphicsLayer) {
                        this.graphicsLayer.removeAll();
                    }
                    // Map view i ref DOM
                    this.view = new MapView({
                        container: this.mapRef.current,
                        map: map,
                        center: [15.98, 45.79],
                        zoom: 11
                    });
                    createViewElements();
                    addAditinal2DElements();
                    this.createMapGraphics(this.props.sensorValues.data, this.state.lokacijeSenzora, this.state.urlSlike);
                }

                this.create3DView = () => {
                    if (this.graphicsLayer) {
                        this.graphicsLayer.removeAll();
                    }
                    // Map view i ref DOM
                    this.view = new SceneView({
                        container: this.mapRef.current,
                        map: map,
                        center: [15.98, 45.79],
                        zoom: 11,
                        camera: {
                            position: [
                                15.98, // lon
                                45.74, // lat
                                3000  // elevation in meters
                            ],
                            tilt: 65
                        }
                    });
                    createViewElements();
                    this.createMapGraphics(this.props.sensorValues.data, this.state.lokacijeSenzora, this.state.urlSlike);
                }
                this.create3DView();
            });
    }
    createMapGraphics = (sensorsData, lokacijeSenzora, urlSlike) => {

        //Object destructuring
        Object.entries(sensorsData).forEach(([key, sensor], index) => {
            //Dodavanje lokacije na svaki senzor
            if (this.state.dimenzion === '3D') {
                this.createMap3DPoints(sensor, key, lokacijeSenzora[index], urlSlike[index], index);
            } else {
                this.createMap2DPoints(sensor, key, lokacijeSenzora[index], urlSlike[index], index);
            }
        });
    }

    createMap2DPoints(sensor, sensorName, lokacija, slika, index) {

        var point = {
            type: "point",
            longitude: lokacija[0],
            latitude: lokacija[1]
        };

        var simpleMarkerSymbol = {
            type: "simple-marker",
            color: [0, 120, 200]
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

        var pointGraphic = new this.Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol,
            attributes: sensor,
            popupTemplate: popup,
            putFields: []
        });

        this.graphicsLayer.add(pointGraphic);

        var pnt = new this.Point({
            longitude: lokacija[0],
            latitude: lokacija[1],
            z: sensor[this.state.chart] * 9
        });
        var txtSym = new this.TextSymbol({
            text: `${this.state.Ime[index]} \n ${this.state.chart === "tmpzrak" ? "Temperatura zraka" : this.state.chart === "vlzrak" ? "Vlaga zraka" : this.state.chart === "tmptlo" ? "Temperatura tla" : "Vlagažnost tla"}: ${sensor[this.state.chart]} `,
            color: "white",
            haloColor: "black",
            haloSize: "2px",
            xoffset: 3,
            yoffset: 3,
        });
        var lblGraphic = new this.Graphic(pnt, txtSym);
        this.graphicsLayer.add(lblGraphic);
    }

    createMap3DPoints(sensor, sensorName, lokacija, slika, index) {
        var paths = [
            [lokacija[0], lokacija[1], 0],
            [lokacija[0], lokacija[1], sensor[this.state.chart] * 7]];

        var line = new this.Polyline({
            hasZ: true,
            hasM: false,
            paths: paths,
            spatialReference: { wkid: 4326 }
        });

        let popup = {
            title: `${sensorName}`,
            content: [{
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

        var symbol = {
            type: "line-3d",  // autocasts as new LineSymbol3D()
            symbolLayers: [{
                type: "path",  // autocasts as new PathSymbol3DLayer()
                profile: "circle",
                width: 100,    // width of the tube in meters
                material: { color: [0, 120, 200] }
            },
            {
                type: "text",
                material: {
                    color: [0, 0, 0, 0.8]
                }
            }]
        };

        var pointGraphic = new this.Graphic({
            geometry: line,
            symbol: symbol,
            attributes: sensor,
            popupTemplate: popup,
            putFields: []
        });


        this.graphicsLayer.add(pointGraphic);

        var pnt = new this.Point({
            longitude: lokacija[0],
            latitude: lokacija[1],
            z: sensor[this.state.chart] * 9
        });
        var txtSym = new this.TextSymbol({
            text: `${this.state.Ime[index]} \n ${this.state.chart === "tmpzrak" ? "Temperatura zraka" : this.state.chart === "vlzrak" ? "Vlaga zraka" : this.state.chart === "tmptlo" ? "Temperatura tla" : "Vlagažnost tla"}: ${sensor[this.state.chart]} `,
            color: "white",
            haloColor: "black",
            haloSize: "2px",
            xoffset: 3,
            yoffset: 3,
        });
        var lblGraphic = new this.Graphic(pnt, txtSym);
        this.graphicsLayer.add(lblGraphic);
    };

    changeValue = (chart) => {
        this.setState({ chart: chart.target.id, isActive: chart.target.id }, () => {
            this.graphicsLayer.removeAll();
            this.createMapGraphics(this.state.sensorsData, this.state.lokacijeSenzora, this.state.urlSlike)
        });
    }
    componentWillUnmount() {
        if (this.view) {
            this.view.container = null;
        }
    }
    render() {
        return (
            <div style={{ height: '100%', width: '100%' }}>
                <div className="webmap" style={{ height: '100%', width: '100%' }} ref={this.mapRef} />
                <div className="legend" ref={this.legend}>
                    <h4>Legenda</h4>
                    <ul style={{
                        listStyleType: 'none'
                    }}>
                        <li>
                            <p>Vrijednost u granici normale</p>
                        </li>
                        <li>
                            <svg width="15" height="15">
                                <circle cx="7.5" cy="7.5" r="6" stroke-width="4" fill="rgb(0, 120, 200)" />
                            </svg>
                        </li>
                    </ul>
                    <ul style={{
                        listStyleType: 'none'
                    }}>
                        <li>
                            <p>Vrijednost nije u granici normale</p>
                        </li>
                        <li>
                            <svg width="15" height="15">
                                <circle cx="7.5" cy="7.5" r="6" stroke-width="4" fill="red" />
                            </svg>
                        </li>
                    </ul>
                </div>
                <div onClick={() => {
                    let dimenzionState = this.state.dimenzion === "3D" ? "2D" : "3D";
                    this.setState({ dimenzion: dimenzionState }, () => {
                        dimenzionState === "3D" ? this.create3DView() : this.create2DView();
                    })
                }} ref={this.switchButton}>
                    <input
                        className="esri-component esri-widget--button esri-widget esri-interactive"
                        type="button"
                        id="switch-btn"
                        value={this.state.dimenzion === "3D" ? "2D" : "3D"}
                    />
                </div>
            </div >
        );
    }
};