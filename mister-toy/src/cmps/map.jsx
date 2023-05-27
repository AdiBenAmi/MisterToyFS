import React from "react";
import GoogleMapReact from 'google-map-react';
import { useState } from 'react'
import { Button} from '@mui/material'

function Marker() {
    return <div style={{ height: '1em', width: '1em', borderRadius: '50%', background: 'red' }}></div>
}

export default function SimpleMap() {
    const [center, setCenter] = useState({ lat: 32.794, lng: 34.9896 })
    const zoom = 10
    const branches = [{
        city: 'Haifa',
        id: 101,
        position: {
            lat: 32.794,
            lng: 34.9896
        }
    },
    {
        city: 'Beer Sheva',
        id: 102,
        position: {
            lat: 31.2530,
            lng: 34.7915
        }
    },
    {
        city: 'Tel Aviv',
        id: 103,
        position: {
            lat: 32.085300,
            lng: 34.781769
        }
    },
    ]

    return (
        <div>
            {branches.map(branch => {
                return <Button key={branch.city} onClick={() => setCenter(branch.position)}>{branch.city}</Button>
            })}
            <div style={{ height: '60vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key:'AIzaSyDInDSnou6WkIWojQCeK39HccRLiMQuIM0' }}
                    defaultCenter={center}
                    center={center}
                    defaultZoom={zoom}
                >
                    {branches.map(branch => {
                        return <Marker lat={branch.position.lat} lng={branch.position.lng} key={branch.id} />
                    })}
                </GoogleMapReact>
            </div>
        </div>
    );
}