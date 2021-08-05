// @ts-ignore
import React, {useState, useRef, useMemo, useCallback} from 'react';
import './App.css';
import {IState} from "./Interface/Form";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import {useDispatch} from "react-redux";
import {Map} from "./Components/Map";
import {addData} from "./Store/Action";

interface InnerProps{
    loc: { lat:any,lng:any }
    setForm: (arg: string) => void
}

const DraggableMarker:React.FC<InnerProps>= ({setForm,loc}) =>{
    const center={
        lat:loc.lat,
        lng:loc.lng
    }
  const [draggable, setDraggable] = useState<boolean>(false)
  const [position, setPosition] = useState<any>(center)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker:any = markerRef.current
          if (marker != null) {
              const newLoc=marker.getLatLng()
              const formEdited={...newLoc}
              setForm(formEdited)
          }
        },
      }),
      [setForm,loc],
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  return (
      <Marker
          draggable={draggable}
          eventHandlers={eventHandlers}
          position={position}
          ref={markerRef}>
        <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
              ? 'Marker is draggable'
              : 'Click here to make marker draggable'}
        </span>
        </Popup>
      </Marker>
  )
}

const App = () =>{
    const [input,setInput]=useState<IState>({
        lat:56,
        lng:106,
        locationName:"test",
        locationType:"Business",
        icon:""
    })
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>):any=>{
        const {name,value}=e.target
        setInput({...input, [name]: value})
    }
    const loc={
        lat:56,
        lng:106,
    }
    const getBase64=(event:any)=> {
        let file = event
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setInput({...input, icon:String(reader.result)})
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    const dispatch=useDispatch()
    const reset=():void=>{
        setInput({
            lat:56,
            lng:106,
            locationName: "test",
            locationType: "Business",
            icon: ""
        })
    }
    const handleClick=(e: any):void=>{
        const {target: {value}}=e
        switch (value){
            case 'Save':
                dispatch(addData({...input}))
                reset()
                break
            case 'Cancel':
                reset()
                break
            default:reset()
        }
    }
    const handleFileInputChange=(e:any)=>{
        getBase64(e.target.files[0])
    }
    const handleLoc=(data: any)=>{
        setInput({...input, ...data})
    }
  return (
    <div className="App">
        <div className='form-holder'>
            <div className='form'>
                <div className='header'>
                    Share Location
                </div>
                <div>
                    <label htmlFor="awd">Location name : </label>
                    <input name='locationName' value={input.locationName} onChange={handleChange} type="text"/>
                </div>
                <div>
                    <label htmlFor="awd">Location On Map : </label>
                    <div id={'map-container'}>
                        <MapContainer center={loc} zoom={13} scrollWheelZoom={false} style={{height:'100%'}}>
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <DraggableMarker loc={loc} setForm={handleLoc} />
                        </MapContainer>,
                    </div>
                </div>
                <div>
                    <label >Location Type : </label>
                    <select name={'locationType'} onChange={handleChange}>
                        <option value="Business">Business</option>
                        <option value="Non Business">Non Business</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="awd">Logo : </label>
                    <input type="file" onChange={handleFileInputChange}/>
                </div>
            </div>
            <div className='button-holder'>
                <button type="submit" name='cancel' value='Cancel' style={{background:'gray'}} onClick={handleClick}>
                    Cancel</button>
                <button type="submit" name='submit' value='Save' style={{background:'#448BC9'}} onClick={handleClick}>
                    Save</button>
            </div>
        </div>
        <Map/>
    </div>
  );
}

export default App;
