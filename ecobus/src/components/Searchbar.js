import Search from '../images/magnifying-glass.png'

const Searchbar = () => {
    
    const onSubmit = (event) => {
        event.preventDefault();
        
        let searchFormContainer = document.getElementById("search-container");
        searchFormContainer.style["display"] = "none";

        let methodSelectionContainer = document.getElementById("method-selection-container");
        methodSelectionContainer.style["display"] = "flex";
        methodSelectionContainer.style["flexDirection"] = "column";
        methodSelectionContainer.style["justifyContent"] = "space-around";
    }
    
    return (
        <section className="search-process-container" id="search-container">
        
            <p>Where do you want to go?</p>
            
            <form id="route-search-form" onSubmit={onSubmit}>    
        
                <input id="route-origin" type="text" placeholder="Origin" required="required" />
            
                <input id="route-destination" type="text" placeholder="Destination" required="required" />
            
                <button type="submit">
                    <img src={Search} alt="Search" />
                </button>
        
            </form>
        
        </section>
    )
}

export default Searchbar
