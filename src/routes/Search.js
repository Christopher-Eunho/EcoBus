import NavigationBar from '../components/NavigationBar'
import SearchMap from '../components/SearchMap'
import Tco from 'components/Taco'
import '../styles/search.css'

function Search() {
  
  return (
    <div className="main-viewport">
      <NavigationBar/>
      <SearchMap />
      <Tco />
    </div>
  );
}

export default Search;
