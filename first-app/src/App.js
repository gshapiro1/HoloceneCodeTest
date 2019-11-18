import React, {useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import ReactMapGL,{Marker,Popup} from 'react-map-gl'
import * as parkDate from "./data/skateboard-parks.json"

function App() {
  const [viewport,setViewport]=useState({
    latitude: 40.7431,
    longitude: -73.9712,
    width: "100vw",
    height: "100vh",
    zoom:12
  })
  const [selectedPark,setSelectedPark]=useState(null)
    
  useEffect(()=>{
    const listener=e=>{
      if(e.key==="Escape"){
        setSelectedPark(null)
      }
    };
    window.addEventListener("keydown",listener);

    return ()=>{
      window.removeEventListener("keydown",listener)
    }
  },[])
  
  return (
    <div>
      <div className="Navbar">
        <h1>Restaurant Finder</h1>
      </div>
      <div>

      
      <ReactMapGL {...viewport} 
      mapboxApiAccessToken={"pk.eyJ1IjoiZ3NoYXBpcm8xIiwiYSI6ImNqejhtZjI5bTAzbDEzaGxvZnV3YWdtdG8ifQ.D_DGEoSj-_eFJ-0FBKJ2yQ"}
      mapStyle="mapbox://styles/gshapiro1/ck30d4mvq0l711cpf5zd6uc62"
      onViewportChange={viewport=>{
        setViewport(viewport)
      }}
      >

      


       {parkDate.features.map(park=>(
         <Marker key={park.properties.PARK_ID}
        latitude={park.geometry.coordinates[1]}
        longitude={park.geometry.coordinates[0]}>
           <button className="marker-btn" onClick={(e)=>{
             e.preventDefault();
             setSelectedPark(park)
           }}>
             <img src="/skateboarding.svg" alt="Skate Park Icon"/>
           </button>
         </Marker>
       ))}

       {selectedPark?(
         <Popup latitude={selectedPark.geometry.coordinates[1]} 
         longitude={selectedPark.geometry.coordinates[0]}
         onClose={()=>{
           setSelectedPark(null)
         }}
         >
           <div>
             <h2>{selectedPark.properties.NAME}</h2>
             <p>{selectedPark.properties.DESCRIPTIO}</p>
           </div>
         </Popup>
       ):null}
      </ReactMapGL>
      </div>
      <div className="findBtn">
        <button>Find Closest Bathroom</button>
      </div>
      <div className="BathroomList">
        {/* only render if button is pressed */}
        <h1>List of bathrooms in order of distance</h1>
      </div>
    </div>
  );
}

export default App;
