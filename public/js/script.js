// const socket = io();
// console.log("hey");

// if(navigator.geolocation){
//     navigator.geolocation.watchPosition(
//         (position) =>{
//         const {latitude, longitude} = position.coords;
//         socket.emit("send-location", {latitude, longitude});
//     }, 
//     (error) =>{
//         console.log(error);
//     },
//     {
//         enableHighAccuracy : true,
//         timeout : 5000,
//         maximumAge : 0
//     }
// );
// }

// const map = L.map("map").setView([0,0],15);

// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
//     attribution : "tracKing -- Because Waiting is Overrated! A Project By Ananta Khurana and Janvi Saxena"
// }).addTo(map)

// const markers = {};

// socket.on("receive-location", (data)=>{
//     const{id, latitude,longitude} =data;
//     map.setView([latitude, longitude]);
//     if(markers[id]){
//         markers[id].setLatLng([latitude, longitude]);
//     }

//     else{
//         markers[id] = L.marker([latitude, longitude]).addTo(map);
//     }

//     const bounds = L.latLngBounds(Object.values(markers).map(marker => marker.getLatLng()));
//     map.fitBounds(bounds, { padding: [50, 50] });
// });

// socket.on("user-disconnected", (id)=>{
//     if(markers[id]){
//         map.removeLayer(markers[id]);
//         delete markers[id];
//     }
// })


// const socket = io();
// console.log("hey");

// if (navigator.geolocation) {
//     navigator.geolocation.watchPosition(
//         (position) => {
//             const { latitude, longitude } = position.coords;
//             socket.emit("send-location", { latitude, longitude });
//         },
//         (error) => {
//             console.log(error);
//         },
//         {
//             enableHighAccuracy: true,
//             timeout: 5000,
//             maximumAge: 0,
//         }
//     );
// }

// const map = L.map("map").setView([0, 0], 15);

// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution: "tracKing -- Because Waiting is Overrated! A Project By Ananta Khurana and Janvi Saxena",
// }).addTo(map);

// const markers = {};

// socket.on("receive-location", (data) => {
//     const { id, latitude, longitude } = data;

//     // Check if this ID already has a marker
//     if (markers[id]) {
//         markers[id].setLatLng([latitude, longitude]);
//     } else {
//         // Create a new marker for this ID
//         markers[id] = L.marker([latitude, longitude]).addTo(map);
//     }
// });

// socket.on("user-disconnected", (id) => {
//     if (markers[id]) {
//         map.removeLayer(markers[id]);
//         delete markers[id];
//     }
// });

// 

const socket = io();

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit("send-location", { latitude, longitude });
        },
        (error) => {
            console.log(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
    );
}

const map = L.map("map").setView([0, 0], 50);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "tracKing -- Because Waiting is Overrated! A Project By Ananta Khurana",
}).addTo(map);

const markers = {};

socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;
    console.log(`Received location for ID ${id}:`, { latitude, longitude });

    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
        console.log(`Marker created for ID ${id}`);
    }

    // const bounds = L.latLngBounds(Object.values(markers).map(marker => marker.getLatLng()));
    // map.fitBounds(bounds, { padding: [50, 50] });

    // Calculate bounds and fit map to the markers only when there are multiple markers
if (Object.keys(markers).length > 1) {
    const bounds = L.latLngBounds(Object.values(markers).map(marker => marker.getLatLng()));
    map.fitBounds(bounds, { padding: [50, 50] });
}

});

socket.on("user-disconnected", (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
        console.log(`Marker removed for ID ${id}`);
    }
});
