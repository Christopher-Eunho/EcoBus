import '../styles/about_us.css';
import Caleb from 'images/Caleb.png';
import Dylan from 'images/Dylan.png';
import Austin from 'images/Austin.png';
import Chris from 'images/Chris.jpeg';
import NavigationBar from '../components/NavigationBar';

/* A page describing the developers of this page */

const About_Us = () => <main>
    <NavigationBar/>
    <aside class="aboutus">
        <p>
            A little about Ecobus
        </p>
    </aside>
    <section>
        <h id="OurMission">Our Mission</h>
        <p>Ecobus's mission is to allow the general public to be able to get from place to place without needing to worry about how large their carbon footprint has gotten. This is accomplished by our application, aptly named "Ecobus", which allows users to track their carbon emissions in relation to their means of transport. It will also allow users to plan their transportation accordingly, by finding the quickest bus route from one point to another. After finding this route, it will then calculate to see how much smaller the user's carbon footprint will be simply by taking the bus.</p>
    </section>
    <section>
        <h id="OurTeam">Our Team</h>
        <p>Our team is comprised of four students from BCIT, with varying levels of skill between us. We've all found travel to be a very difficult thing in our lives, with the world being how it is, and we wanted a way to trivialize it. This could be done by simply buying a car, but we all agreed that the more fuel-efficient solution was to take the bus, a vehicle which would run regardless of whether you are on it.</p>
    </section>
    <section>
        <h2 id="Chris"><a href='https://github.com/Christopher-Eunho'>Eunho "Chris" Jung</a></h2>
        <img class="PhotoID" src={Chris} alt="Chris"/>
        <p>
            An aspiring programmer and the Product Owner of EcoBus. While working in the semiconductor industry of South Korea as a mechanical engineer, he was fascinated by 
            how much the world was being transformed by technology  So, he decided to transform himself from a hardware engineer to a software engineer and is now studying 
            programming in Vancouver. As the Product Owner of EcoBus, he convieved of the application's features and managed the overall development of the application. He also
            worked with the Google Maps API to implement the core feature of mapping a user's route.
        </p>
    </section>
    <section>
        <h2 id="Caleb"><a href='https://github.com/fijiman24'>Caleb Verma</a></h2>
        <img class="PhotoID" src={Caleb} alt="Caleb" />
        <p>
            Caleb is an aspiring software developer. He graduated from UBC in 2020 with a major in Philosophy and, that very same year, decided to apply to BCIT's CST 
            program on a whim. He is fascinated by the seemingly limitless potential of programming; whether it's to create video games or robots that can explore Mars, 
            programming offers a way to solve any problem.   
        </p>
    </section>
    <section>
        <h2 id="Austin"><a href='https://github.com/ahe8'>Austin He</a></h2>
        <img class="PhotoID" src={Austin} alt="Austin"/>
        <p>
            Austin is a a recent graduate of Capilano University where he got his Bachelor of Business Administration degree with a concentration in Accounting.
            He joined the CST program to work on projects and learn how to automate tasks so he can enjoy the simple things in life. Austin is excited to see what 
            new technologies will be developed in the future to combat the global climate crisis.
        </p>
    </section>
    <section>
        <h2 id="Dylan"><a href='https://github.com/CDGCodes'>Dylan Punter</a></h2>
        <img class="PhotoID" src={Dylan} alt="Dylan"/>
        <p>
            Dylan is a student who recently graduated from high school. After taking a semester off to save money, he applied to CIT, before changing his mind, 
            and applying to CST the following term. He has always been interested in the world of computers, rebuilding his own countless times, and originally 
            joined CST with the intent of becoming a game developer. Now, he wants to use his programming skills to benefit the world however he can.
        </p>
    </section>
</main>;

export default About_Us;