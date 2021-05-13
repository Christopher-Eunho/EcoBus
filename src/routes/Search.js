import Map from '../components/Map'
import Searchbar from '../components/Searchbar'
import Navbar from '../components/Navbar'
import MethodSelection from '../components/MethodSelection'
import TransitRouteDetails from '../components/TransitRouteDetails'
import DrivingRouteDetails from '../components/DrivingRouteDetails'
import SavedTransitRoute from '../components/SavedTransitRoute'
import SavedDrivingRoute from '../components/SavedDrivingRoute'

function Search() {
  return (
    <div className="container">
      <Map />
      <Searchbar />
      <MethodSelection />
      <TransitRouteDetails />
      <DrivingRouteDetails />
      <SavedTransitRoute />
      <SavedDrivingRoute />
      <Navbar />
    </div>
  );
}

export default Search;
