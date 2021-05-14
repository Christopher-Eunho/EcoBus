import GMap from '../components/GoogleMap'
import Searchbar from '../components/Searchbar'
import Nav from '../components/Nav'
import MethodSelection from '../components/MethodSelection'
import TransitRouteDetails from '../components/TransitRouteDetails'
import DrivingRouteDetails from '../components/DrivingRouteDetails'
import SavedTransitRoute from '../components/SavedTransitRoute'
import SavedDrivingRoute from '../components/SavedDrivingRoute'
import '../styles/search.css'

function Search() {
  return (
    <div className="main-viewport">
      <GMap />
      <Searchbar />
      <GMap />
      <MethodSelection />
      <TransitRouteDetails />
      <DrivingRouteDetails />
      <SavedTransitRoute />
      <SavedDrivingRoute />
    </div>
  );
}

export default Search;
