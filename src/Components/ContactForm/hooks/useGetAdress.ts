import { useDispatch } from "react-redux";
import { setAdress } from "../../../Redux/Shops.slice";
import axios from "axios";
import { LatLng } from "use-places-autocomplete";
const useGetAdress = () => {
  const dispatch = useDispatch();
  return async ({ lat, lng }: LatLng) => {
    const result = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDA1mc3zMvwS7UkEvqdamEQktfGofwYKG8`
    );
    dispatch(setAdress(result.data.results[0].formatted_address));
  };
};

export default useGetAdress;
