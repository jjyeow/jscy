import styles from '../styles/Home.module.css'
import Head from 'next/head'
import React, {useState, useEffect, useRef} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import NavigationBar from '../components/navigationbar';
import ReactPlayer from 'react-player';
import VisibilitySensor from 'react-visibility-sensor';
import { Carousel } from 'react-responsive-carousel';
import FloatingWhatsApp from "react-floating-whatsapp";
import Image from 'next/image'
import { MdCalendarToday, MdLocationOn, MdAccessTime, MdNavigateNext, MdNavigateBefore, MdPause, MdPlayArrow } from "react-icons/md";
import {FaWaze,FaMapMarkedAlt} from "react-icons/fa"
import {weddingPhotos} from '../data.js'


export default function Home() {
    const [width, setWidth] = useState(undefined)
    const [headerVisible, setHeaderVisible] = useState(false)
    const [carouselVisible, setCarouselVisible] = useState(false)
    const [videoVisible, setVideoVisible] = useState(false)
    const [hasWindow, setHasWindow] = useState(false);
    const [audio, setAudio] = useState()
    const [playing, setPlaying] = useState(false);
    const [modal, setModal] = useState(true)

    const Avatar='/asset/images/groom_bride.jpg'
    const Header='/asset/images/1.jpg'
    const ECard='/asset/images/ecard.jpg'
    const Border='/asset/images/border2.jpg'
    const Underline='/asset/images/underline.png'
    const WeddingLogo='/asset/logo/wedding.png'


    useEffect(() => {
        setAudio(new Audio('/asset/tracks/Westlife_-_Beautiful_in_White_(Jesusful.com).mp3'))
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
        const updateWidth = () => {
          setWidth(window.innerWidth > 600 ? true : false)
        }
        updateWidth()
        window.removeEventListener('resize', updateWidth)
        window.addEventListener('resize', updateWidth)
        return () => {
            audio?.play()
            window.removeEventListener('resize', updateWidth)
        }
    }, [])

    useEffect(() => {
        if (audio === undefined || audio === null) {
            return;
        }
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, [audio]);

    const toggle = () => {
        setModal(!modal)
        setAudio(null)
    }

    return (
        <div style={{backgroundColor: "white", color: "#062440"}}>
            <Head>
                <title>Jiing Shyi & Chai Ying Wedding</title>
                <meta name="description" content="Jiing Shyi & Chai Ying Wedding" />
                <link rel="icon" href={WeddingLogo} />
            </Head>
            <NavigationBar/>
            <FloatingWhatsApp phoneNumber="+60122881272" chatMessage={"Hi, feel free to ask me anything! :)"} accountName={"Jiing Shyi (The Groom)"} avatar={Avatar}/>
            { audio != null ?  
                <div style={{
                    width: 55,
                    height: 55,
                    borderRadius: "50%",
                    backgroundColor: "#303f9f",
                    zIndex: 9999,
                    position: "fixed",
                    bottom: "1.9rem",
                    left: 32,
                    display: "flex",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                {playing ? <MdPause color="white" onClick={()=> {audio?.pause(); setPlaying(false)}}/> : <MdPlayArrow color="white" onClick={()=> {audio?.play(); setPlaying(true)}}/>}
                </div> 
            : null}
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Music!</ModalHeader>
                <ModalBody>
                    <div style={{textAlign: "center"}}>
                        <p>Play music for a better experience ;)</p>
                        <div style={{textAlign: "center", display: "flex", justifyContent: "center"}}>
                            <div style={{
                                width: 60,
                                height: 60,
                                borderRadius: "50%",
                                backgroundColor: "#303f9f",
                                zIndex: 9999,
                                display: "flex",
                                textAlign: "center",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <MdPlayArrow color="primary" onClick={()=> {audio?.play(); setModal(false); setPlaying(true)}} />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <div style={{width: "100vw", height: "100%", position: "relative"}}>
                <Image src={Header} alt={"Mr and Mrs"} width="100%" height={width ? "75%" : "100%"} layout="responsive" objectFit="contain"></Image>
            </div>
            {width 
            ?
            <VisibilitySensor
                    partialVisibility
                    onChange={(isVisible) => {
                        if(!headerVisible) {
                            setHeaderVisible(isVisible)
                        }
                    }}
            >
                <div className={headerVisible ? "fade-in-section-is-visible" : ""} style={{display: "flex"}}>
                    <div id="ecard" style={{width: "50vw", height: "100%", position: "relative"}}>
                        <Image src={ECard} alt={"E-Card"} width="50vw" height="50%" layout="responsive" objectFit="contain"></Image>
                    </div> 
                    <div id="schedule" style={{width: "50vw", height: "100%", position: "relative"}}>
                        <Image src={Border} alt={"Schedule"} width="50vw" height="50%" layout="responsive" objectFit="contain"></Image>
                        <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "justify"}}>
                            <h1 style={{fontFamily: "Grypen-Bold", fontSize: "4rem", textAlign: "center"}}>- Schedule -</h1>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td style={{padding:30, fontFamily: "Laila", fontSize: "1.5rem"}}>6.00pm</td>
                                            <td style={{padding:30, fontFamily: "Laila", fontSize: "1.5rem"}}>Guest Arrival</td>
                                        </tr>
                                        <tr>
                                            <td style={{padding:30, fontFamily: "Laila", fontSize: "1.5rem"}}>6.30pm</td>
                                            <td style={{padding:30, fontFamily: "Laila", fontSize: "1.5rem"}}>Tea Ceremony</td>
                                        </tr>
                                        <tr>
                                            <td style={{padding:30, fontFamily: "Laila", fontSize: "1.5rem"}}>7.00pm</td>
                                            <td style={{padding:30, fontFamily: "Laila", fontSize: "1.5rem"}}>Wedding Dinner begins</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* <p style={{fontFamily: "Laila", fontSize: "1.5rem"}}>
                                
                            </p> */}
                        </div>
                    </div> 
                </div>
            </VisibilitySensor>
            :
            <VisibilitySensor
                    partialVisibility
                    onChange={(isVisible) => {
                        if(!headerVisible) {
                            setHeaderVisible(isVisible)
                        }
                    }}
            >
                <div className={headerVisible ? "fade-in-section-is-visible" : ""} style={{display: "flex", flexDirection: "column", "justifyContent": "center", textAlign: "center"}}>
                    <div id="ecard" style={{width: "100vw", height: "100%", position: "relative"}}>
                        <Image src={ECard} alt={"E-Card"} width="50vw" height="50%" layout="responsive" objectFit="contain"></Image>
                    </div> 
                    <div style={{width: "100vw", height: "100%", position: "relative", marginTop: 20}}>
                        <Image src={Underline} alt={"Underline"} width="100%" height="10%" layout="responsive" objectFit="contain"></Image>
                    </div>
                    <div id="schedule" style={{width: "95vw", height: "100%", position: "relative"}}>
                        <Image src={Border} alt={"Schedule"} width="50vw" height="50%" layout="responsive" objectFit="contain"></Image>
                        <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "justify"}}>
                            <h3 style={{fontFamily: "Grypen-Bold", fontSize: "3rem", textAlign: "center"}}>- Schedule -</h3>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td style={{padding:15, fontFamily: "Laila", fontSize: "0.7rem"}}>6.00pm</td>
                                            <td style={{padding:15, fontFamily: "Laila", fontSize: "0.7rem"}}>Guest Arrival</td>
                                        </tr>
                                        <tr>
                                            <td style={{padding:15, fontFamily: "Laila", fontSize: "0.7rem"}}>6.30pm</td>
                                            <td style={{padding:15, fontFamily: "Laila", fontSize: "0.7rem"}}>Tea Ceremony</td>
                                        </tr>
                                        <tr>
                                            <td style={{padding:15, fontFamily: "Laila", fontSize: "0.7rem"}}>6.00pm</td>
                                            <td style={{padding:15, fontFamily: "Laila", fontSize: "0.7rem"}}>Wedding Dinner begins</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* <p style={{fontFamily: "Laila", fontSize: "0.7rem"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> */}
                        </div>
                    </div> 
                </div>
            </VisibilitySensor>
            }
            <VisibilitySensor
                partialVisibility
                onChange={(isVisible) => {
                    if(!carouselVisible) {
                        setCarouselVisible(isVisible)
                    }
                }}
            >
                <div id="details" className={carouselVisible ? "fade-in-right-section-is-visible" : ""}>
                    <div style ={{marginTop: 50, paddingTop: 50, backgroundColor: "#e1f5fe", color: "#303f9f", }}>
                        <h1 style={{textAlign: "center", marginBottom: 50, fontFamily: "Grypen-Bold", fontSize: "3.5rem"}}>- Details -</h1>
                        <div style={{width: "100vw", height: "100%", position: "relative", marginTop: -20}}>
                            <Image src={Underline} alt={"Underline"} width="100%" height="10%" layout="responsive" objectFit="contain"></Image>
                        </div>
                    </div>
                    <div style ={{paddingTop: 30, backgroundColor: "#e1f5fe", color: "#303f9f", }}>
                        <div style={width ? {display: "flex", flexDirection: "row", justifyContent: "center"} : {display: "flex", flexDirection: "column"}}>
                            <div style={ width ? {display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center", maxWidth: "25vw", width: "25vw"} : {display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center", marginBottom: 50}}>
                                <MdCalendarToday size={width ? 64 : 50} color="#303f9f"/>
                                <div style={{fontFamily: "Grypen-Bold", fontSize: "2rem"}}>10th September 2022</div>
                            </div>
                            <div style={ width ? {display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center", maxWidth: "25vw", width: "25vw"} : {display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center", marginBottom: 50}}>
                                <MdLocationOn size={width ? 64 : 50} color="#303f9f"/>
                                <div style={{fontFamily: "Grypen-Bold", fontSize: "2rem"}}>Sheraton Hotel, PJ</div>
                                <div style={{display: "flex", marginTop: 20, justifyContent: "space-between", width: "50%"}}>
                                    <div style={{display: "flex", flexDirection: "column"}}>
                                        <Button href="https://g.page/sheratonpetalingjaya?share" target="_blank" style={{backgroundColor:"transparent",padding:0,paddingBottom:5,paddingLeft:7,paddingRight:7,borderStyle:"none"}}>
                                            <FaMapMarkedAlt className={"map-icon"} style={{color:"#303f9f",width:40,height:40}}/>
                                        </Button>
                                        <div style={width ? {} : {fontSize: "0.8rem"}}>Google Maps</div>
                                    </div>
                                    <div style={{display: "flex", flexDirection: "column"}}>
                                        <Button href="https://ul.waze.com/ul?place=ChIJP2BMP91LzDERltdMs3iHW4k&ll=3.10397240%2C101.64028470&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location" target="_blank" style={{backgroundColor:"transparent",padding:0,paddingBottom:5,paddingLeft:7,paddingRight:7,borderStyle:"none"}}>
                                            <FaWaze className={"map-icon"} style={{color:"#303f9f",width:40,height:40}}/>
                                        </Button>
                                        <div style={width ? {} : {fontSize: "0.8rem"}}>Waze</div>
                                    </div> 
                                </div>
                            </div>
                            <div style={ width ? {display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center", maxWidth: "25vw", width: "25vw"} : {display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center", marginBottom: 50}}>
                                <MdAccessTime size={width ? 64 : 50} color="#303f9f"/>
                                <div style={{fontFamily: "Grypen-Bold", fontSize: "2rem"}}>7.00pm</div>
                            </div>
                        </div>
                        <div id="weddingphotos" className={carouselVisible ? "fade-in-section-is-visible" : ""} style={{paddingTop: 60}}>
                            <h1 style={{textAlign: "center", fontFamily: "Grypen-Bold", fontSize: "3.5rem"}}>- Wedding Photos -</h1>
                            <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%",color:"white",
                                backgroundSize: 'cover',backgroundRepeat: 'no-repeat',backgroundPosition: 'center',}}>
                                <div style={{width:"100%",maxWidth:1150}}>
                                    <Carousel
                                        showThumbs={false}
                                        showStatus={false}
                                        emulateTouch
                                        showIndicators={weddingPhotos.length>0?true:false}
                                        width="100%"
                                        autoPlay={carouselVisible ? true : false}
                                        renderArrowPrev={(clickHandler, hasPrev, labelPrev)=>{
                                            if(weddingPhotos.length==0)return null
                                            if(hasPrev){
                                                return(
                                                    <div onClick={clickHandler}
                                                        style={{position:"absolute",left:0,zIndex:10,backgroundColor:"transparent",borderStyle:"none",cursor:"pointer",
                                                            height:"100%",display:"flex",flexDirection:"row",alignItems:"center"}}>
                                                        {
                                                        width ?
                                                            <MdNavigateBefore style={{width:55,height:55,color:"#1769aa"}} />
                                                            :
                                                            <MdNavigateBefore style={{width:100,height:100,color:"#1769aa"}} />
                                                        }
                                                    </div>
                                                )
                                            }else{
                                                return(
                                                    <div style={{position:"absolute",left:0,zIndex:10,backgroundColor:"transparent",borderStyle:"none",cursor:"pointer",
                                                            height:"100%",display:"flex",flexDirection:"row",alignItems:"center"}}>
                                                        {
                                                        width ?
                                                            <MdNavigateBefore style={{width:55,height:55,color:"#062440"}} />
                                                            :
                                                            <MdNavigateBefore style={{width:100,height:100,color:"#062440"}} />
                                                        }
                                                    </div>
                                                )
                                            }
                                        }}
                                        renderArrowNext={(clickHandler, hasNext, labelNext) =>{
                                            if(weddingPhotos.length==0)return null
                                            if(hasNext){
                                                return(
                                                    <div onClick={clickHandler}
                                                        style={{position:"absolute",right:0,bottom:0,backgroundColor:"transparent",borderStyle:"none",cursor:"pointer",
                                                            height:"100%",display:"flex",flexDirection:"row",alignItems:"center"}}>
                                                        {
                                                        width ?
                                                            <MdNavigateNext style={{width:55,height:55,color:"#1769aa"}}/>
                                                            :
                                                            <MdNavigateNext style={{width:100,height:100,color:"#1769aa"}}/>
                                                        }
                                                    </div>
                                                )
                                            }else{
                                                return(
                                                    <div style={{position:"absolute",right:0,bottom:0,backgroundColor:"transparent",borderStyle:"none",cursor:"pointer",
                                                            height:"100%",display:"flex",flexDirection:"row",alignItems:"center"}}>
                                                        {
                                                        width ?
                                                            <MdNavigateNext style={{width:55,height:55,color:"#062440"}}/>
                                                            :
                                                            <MdNavigateNext style={{width:100,height:100,color:"#062440"}}/>
                                                        }
                                                    </div>
                                                )
                                            }
                                        }}
                                    >
                                    {
                                        weddingPhotos.map((item)=>{
                                            return(
                                                <div key={item.title} style={{display:"flex",flexDirection:"row",justifyContent:"center",paddingBottom:15}}>
                                                    <div style={width ? {display:"flex",flexDirection:"column",margin:20,alignItems:"center",textAlign:"center",
                                                        backgroundColor:"white",width:"45vw",cursor:"pointer"} : {display:"flex",flexDirection:"column",margin:20,alignItems:"center",textAlign:"center",
                                                        backgroundColor:"white",width:"80vw",cursor:"pointer"}} onClick={()=>{
                                                        }}>
                                                        <Image src={item.original} width={1500} height={1000} />
                                                        {/* <div style={{display:"flex",flexDirection:"column",padding:10}}>
                                                            <div style={width ? {fontWeight:"bold",fontSize:20, color: "#303f9f", fontFamily: "Laila"} : {fontWeight:"bold",fontSize:14, color: "#303f9f", fontFamily: "Laila"}}>{item.title}</div>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </VisibilitySensor>
            <VisibilitySensor
                partialVisibility
                onChange={(isVisible) => {
                    if(!videoVisible) {
                        setVideoVisible(isVisible)
                    }
                }}
            >
                <div id="direction" className={videoVisible ? "fade-in-section-is-visible" : ""} style={{backgroundColor: "white", paddingTop: 60, paddingBottom: 50, marginBottom: 100}}>
                    <h1 style={{textAlign: "center", paddingTop: 40, fontFamily: "Grypen-Bold", color: "black", fontSize: "3.5rem"}}>- DIRECTION -</h1>
                    <div style={width ? {display: "flex", justifyContent: "space-evenly", padding: "20px 20px 100px 20px"} : {display: "flex", flexDirection: "column", justifyContent: "space-evenly", padding: 20}}>
                        <div style={{width:"100%",height:"80vh",padding:20}}>
                            {hasWindow && <ReactPlayer url='https://www.youtube.com/embed/W6-dA08M9DA' width="100%" height="100%"  controls={true}/>}
                        </div>
                    </div>
                </div>
            </VisibilitySensor>
        </div>
    )
}
