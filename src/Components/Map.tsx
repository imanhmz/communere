import React, {useState, useRef, useMemo, useCallback, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import {useSelector} from "react-redux";
import {dataState} from "../Redux/Reducer";
export const Map:React.FC=()=>{
    const datas= useSelector<dataState,dataState["data"]>((state)=> state.data )
    return(
        <div style={{width:'300px',height:'300px'}}>
            <MapContainer style={{width:'300px',height:'300px'}} center={{lat: 50, lng: 50,}} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    datas.map(data=>{
                        if (data.lat && data.lng)
                        return(
                            <Marker position={{lat:data.lat, lng:data.lng}}>
                                <Popup>
                                    <h5>
                                        {data.locationName} / {data.locationType}
                                    </h5>
                                    <img width='40px' src={data.icon} alt=""/>
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