import NavigationBar from '../components/NavigationBar'
import GMap from '../components/GoogleMap'
import Tco from 'components/Taco'
import '../styles/search.css'

function Search() {
  
  return (
    <div className="main-viewport">
      <NavigationBar/>
      <GMap />
    </div>
  );
}

export default Search;
