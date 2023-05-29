import React, { ChangeEvent, useRef } from "react";
import { useState } from "react";
import { Controller, Control } from "react-hook-form";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { TextInput, Flex, Select } from "@mantine/core";
import styled from "styled-components";
import axios from "axios";
import "../../index.scss";
import { LatLng } from "../../interfaces/map";
import { IContact } from "../../interfaces/contact-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { setAdress } from "../../Redux/Shops.slice";
import useGetAdress from "./hooks/useGetAdress";
const ContactForm = ({ control }: { control: Control<IContact, any> }) => {
  let newData: any = [];
  const {
    ready,
    value,
    setValue,
    suggestions: { data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const dispatch = useDispatch();
  const getAdress = useGetAdress();

  const [selected, setSelected] = useState<LatLng | null>(null);
  const [directions, setDirections] = useState<any>("");
  const [travelTime, setTravelTime] = useState<string | undefined>("");
  const newAdress = useSelector((state: RootState) => state.shops.adress);
  const shopCoordinates: LatLng = useSelector(
    (state: RootState) => state.cart.shop.coordinates
  );
  const shopCover: string = useSelector(
    (state: RootState) => state.cart.shop.cover
  );
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDA1mc3zMvwS7UkEvqdamEQktfGofwYKG8",
    libraries: ["places"],
  });
  const handleSelect = async (adress: ChangeEvent<HTMLInputElement>) => {
    if (!adress.target.value) setSelected(null);
    dispatch(setAdress(adress.target.value));
    clearSuggestions();
    try {
      const results = await getGeocode({ address: adress.target.value });
      const { lat, lng } = getLatLng(results[0]);
      setSelected({ lat, lng });
    } catch (err: any) {
      console.log(err);
    }
  };
  if (ready) {
    newData = data.map(({ place_id, description }) => {
      return description;
    });
  }
  const calculateRoute = async ({ lat, lng }: LatLng) => {
    const directionService = new google.maps.DirectionsService();
    const results = await directionService.route({
      origin: shopCoordinates,
      destination: {
        lat,
        lng,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirections(results);
    setTravelTime(results.routes[0].legs[0].duration?.text);
  };
  const onSearchChange = async (value: string) => {
    if (!value) setSelected(null);
    dispatch(setAdress(value));

    try {
      const results = await getGeocode({ address: value });
      const LatLng = getLatLng(results[0]);
      calculateRoute(LatLng);
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <Wrapper>
      {isLoaded ? (
        <>
          <GoogleMap
            onClick={(e) => {
              setSelected({
                lat: e.latLng?.lat() as number,
                lng: e.latLng?.lng() as number,
              });
              getAdress({
                lat: e.latLng?.lat() as number,
                lng: e.latLng?.lng() as number,
              });
              calculateRoute({
                lat: e.latLng?.lat() as number,
                lng: e.latLng?.lng() as number,
              });
            }}
            zoom={12}
            center={selected ? selected : shopCoordinates}
            mapContainerClassName="map"
          >
            {selected && (
              <>
                <Marker
                  onDragEnd={(e) => {
                    getAdress({
                      lat: e.latLng?.lat() as number,
                      lng: e.latLng?.lng() as number,
                    });
                    calculateRoute({
                      lat: e.latLng?.lat() as number,
                      lng: e.latLng?.lng() as number,
                    });
                  }}
                  draggable
                  position={selected}
                />
                {directions ? (
                  <DirectionsRenderer
                    options={{ markerOptions: { visible: false } }}
                    directions={directions}
                  />
                ) : null}
              </>
            )}
            <Marker
              position={shopCoordinates}
              icon={{
                url: shopCover,
                scaledSize: new google.maps.Size(40, 40),
              }}
            />
          </GoogleMap>
          <SpentTime>Примерное время доставки: {travelTime}</SpentTime>
        </>
      ) : null}
      <FormWrapper
        align="center"
        justify="space-between"
        gap="lg"
        direction="column"
      >
        <Controller
          name={"adress"}
          control={control}
          render={({ field }) => (
            <FullwidthSelect
              {...field}
              withAsterisk
              onSelect={handleSelect}
              onSearchChange={(e) => onSearchChange(e)}
              searchValue={newAdress}
              placeholder="Input your adress here or choose on the map"
              searchable
              data={newData}
              required
              disabled={!ready}
              size="lg"
            />
          )}
        />
        <Controller
          name={"name"}
          control={control}
          render={({ field }) => (
            <FullwidthInput
              withAsterisk
              size="lg"
              required
              placeholder="Name"
              {...field}
            />
          )}
        />
        <Controller
          name={"email"}
          control={control}
          render={({ field }) => (
            <FullwidthInput
              withAsterisk
              size="lg"
              required
              placeholder="Email"
              {...field}
            />
          )}
        />
        <Controller
          name={"phone"}
          control={control}
          render={({ field }) => (
            <FullwidthInput
              withAsterisk
              required
              size="lg"
              placeholder="Phone"
              {...field}
            />
          )}
        />
      </FormWrapper>
    </Wrapper>
  );
};
const SpentTime = styled.h4`
  margin-left: 10px;
`;
const FormWrapper = styled(Flex)`
  padding: 0 10px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
`;
const FullwidthInput = styled(TextInput)`
  width: 100%;
`;
const FullwidthSelect = styled(Select)`
  width: 100%;
`;
export default ContactForm;
