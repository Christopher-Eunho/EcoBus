import GMap from '../components/GoogleMap'
import RouteDetails from '../components/routeDetails'
import SavedTransitRoute from '../components/SavedTransitRoute'
import '../styles/search.css'

function Search() {

  // const saveChanges = () => {
  //   var user = firebase.auth().currentUser;
  //   var email, uid;

  //   var newEmail = document.getElementById("email-change");
  //   if (user != null) {
  //     email = user.email;
  //     uid = user.uid;
  //     user.updateEmail(newEmail.value).then(function () {
  //       // Update successful.
  //     }).catch(function (error) {
  //       console.log(error);
  //     });
  //   }
  // };


  return (
    <div className="main-viewport">
      <GMap />
      <RouteDetails />
      <SavedTransitRoute />
    </div>
  );
}

export default Search;
