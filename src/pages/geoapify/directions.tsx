import React, { useEffect } from 'react'
import { RouteDirections, RoutingOption, TravelMode } from '@geoapify/route-directions';
import '@geoapify/route-directions/styles/styles.css';
import Head from 'next/head';

export default function Directions() {

    const routeDirectionOptions = {

    };

    const geocoderOptions = {

    };

    useEffect(() => {
        const _el = document.querySelector("#route-directions")
        console.log({ _el });
        // window.onload = ()=>{
            const el = document.querySelector("#route-directions")
            console.log({ el });
            if (el!==null) {
                // const routeDirections = new RouteDirections(_el, 'e22941abad4846739c97fae1a1e0d36e', {
                //     waypoints: [
                //       { address: "Paris, France" },
                //       { address: "Lyon, France" },
                //       { address: "Grenoble, France" },
                //     ]
                // });
                
                // const routeDirections = new RouteDirections(_el, 'e22941abad4846739c97fae1a1e0d36e');
                // const routeDirections = new RouteDirections(document.getElementById("route-directions"), 'e22941abad4846739c97fae1a1e0d36e', routeDirectionOptions, geocoderOptions);
            }
        // }
    }, [])

    return (
        <>
            <Head>
                {/* <link rel="stylesheet" href="https://unpkg.com/@geoapify/route-directions@^1/styles/styles.css" /> */}
                {/* <script src="https://unpkg.com/@geoapify/route-directions@^1/dist/index.js"></script> */}
            </Head>
            <div id="route-directions"></div>
        </>
    )
}
