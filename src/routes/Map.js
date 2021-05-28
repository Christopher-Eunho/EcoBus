/**
 * Renders the navigation bar and the search map of the app. 
 * Also renders Taco for easter egg.
 */

import NavigationBar from '../components/NavigationBar';
import SearchMap from '../components/SearchMap';
import Tco from 'components/Taco';
import '../styles/map.css';

function Map() {
  
  return (
    <div className="main-viewport">
      <NavigationBar/>
      <SearchMap />
      <Tco />
    </div>
  );
}

export default Map;
