import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker } from "@goongmaps/goong-map-react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_MAP_API_KEY;
const MAP_TOKEN = import.meta.env.VITE_MAP_TOKEN;

const Map = ({ formData, setFormData }) => {
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "400px",
        latitude: 10.762622,
        longitude: 106.660172,
        zoom: 14,
    });

    const [marker, setMarker] = useState({
        latitude: 10.762622,
        longitude: 106.660172,
    });

    const geocodeAddress = async () => {
        const { address, ward, district, city } = formData;
        if (address && ward && district && city) {
            const fullAddress = `${address}, ${ward}, ${district}, ${city}`;
            // console.log("Địa chỉ đầy đủ:", fullAddress);
            try {
                const res = await axios.get("https://rsapi.goong.io/Geocode", {
                    params: {
                        address: fullAddress,
                        api_key: API_KEY,
                    },
                });
                console.log("Kết quả geocode:", res.data);
                const result = res.data?.results?.[0];
                if (result) {
                    const { lat, lng } = result.geometry.location;
                    setMarker({ latitude: lat, longitude: lng });
                    setViewport((prev) => ({ ...prev, latitude: lat, longitude: lng }));
                }
            } catch (err) {
                console.error("Định vị map thất bại", err);
            }
        }
    };

    useEffect(() => {
        geocodeAddress();
    }, [formData.address, formData.ward, formData.district, formData.city]);

    const reverseGeocode = async (lat, lng) => {
        try {
            const res = await axios.get("https://rsapi.goong.io/Geocode", {
                params: {
                    latlng: `${lat},${lng}`,
                    api_key: API_KEY,
                },
            });
            console.log("Kết quả reverse geocode:", res.data);
            const result = res.data?.results?.[0];
            if (result) {
                setFormData((prev) => ({
                    ...prev,
                    city: result.compound.province,
                    district: result.compound.district,
                    ward: result.compound.commune,
                    address: result.formatted_address,
                }));
            }
        } catch (err) {
            console.error("Lấy thông tin marker thất bại:", err);
        }
    };

    const handleMarkerDragEnd = async (e) => {
        const [lng, lat] = e.lngLat;
        setMarker({ latitude: lat, longitude: lng });
        setViewport((prev) => ({ ...prev, latitude: lat, longitude: lng }));
        await reverseGeocode(lat, lng);
    };

    return (
        <ReactMapGL
            {...viewport}
            onViewportChange={setViewport}
            goongApiAccessToken={MAP_TOKEN}
        >
            <Marker
                latitude={marker.latitude}
                longitude={marker.longitude}
                offsetLeft={-20}
                offsetTop={-10}
                draggable
                onDragEnd={handleMarkerDragEnd}
            >
                <div style={{ fontSize: 24 }}>📍</div>
            </Marker>
        </ReactMapGL>
    );
};

export default Map;
