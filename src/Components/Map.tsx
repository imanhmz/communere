import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import {useSelector} from "react-redux";
import {dataState} from "../Store/Reducer";

export const Map:React.FC=()=>{
    const values= useSelector<dataState,dataState["data"]>((state)=> state.data )
    return(
        <div style={{width:'300px',height:'300px'}}>
            <MapContainer style={{width:'300px',height:'300px'}} center={{lat: 56, lng: 106,}} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    values.map(value=>{
                        if (value.lat && value.lng)
                        return(
                            <Marker position={{lat:value.lat, lng:value.lng}}>
                                <Popup>
                                    <h5>
                                        {value.locationName} / {value.locationType}
                                    </h5>
                                    <img width='40px' src={value.icon} alt=""/>
                                </Popup>
                            </Marker>
                        )
                    })
                }
            </MapContainer>
        </div>
    )
}
export default Map