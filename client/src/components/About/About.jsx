import html from '../../imgs/HTML5.png';
import css from '../../imgs/CSS.png';
import react from '../../imgs/React.png';
import redux from '../../imgs/Redux.png';
import nodejs from '../../imgs/nodeJS.png';
import express from '../../imgs/Express.png';
import sequelize from '../../imgs/Sequelize.png';
import postgresql from '../../imgs/PostgreSQL.png';
import linkedIn from '../../imgs/LinkedIn.png';
import github from '../../imgs/Github.png';
import styles from './About.module.css';



function About () {



    return (
        <div className={styles.About}>
            <div className={styles.contPag}>
                <h1>Country App</h1>
                <p>This SPA was made as part of an Individual Project of SoyHenry's bootcamp.</p>
                <p>Here you can find the information of different countries of the world.</p>
                <p>You can also search and create differemt tourist activities for each country.</p>
                <br></br>
                <p>Some features of this app are:</p>
                <p>-Get and filter the information of the countries from the <a href='https://www.restcountries.com' target='_blank' rel='noreferrer' >RESTCOUNTRIES API</a>
                    , then save them to a database.
                </p>
                <p>-Show a list of the countries in the main page.</p>
                <p>-Have search filters by country and by activities.</p>
                <p>-Have a detail page that shows more information about a country and the tourist activities related to it.</p>
                <p>-Have a form to add tourist activities to different countries.</p>
            </div>
            <div className={styles.contTools}>
                <h2>Tools</h2>
                <div>
                    <div className={styles.tool}>
                        <img src={html} alt='HTML5'></img>
                        <span>HTML5</span>
                    </div>
                    <div className={styles.tool}>
                        <img src={css} alt='CSS'></img>
                        <span>CSS</span>
                    </div>
                    <div className={styles.tool}>
                        <img src={react} alt='REACT'></img>
                        <span>React</span>
                    </div>
                    <div className={styles.tool}>
                        <img src={redux} alt='REDUX'></img>
                        <span>Redux</span>
                    </div>
                    <div className={styles.tool}>
                        <img src={nodejs} alt='NODEJS'></img>
                        <span>NodeJS</span>
                    </div>
                    <div className={styles.tool}>
                        <img src={express} alt='EXPRESS'></img>
                        <span>Express</span>
                    </div>
                    <div className={styles.tool}>
                        <img src={sequelize} alt='SEQUELIZE'></img>
                        <span>Sequelize</span>
                    </div>
                    <div className={styles.tool}>
                        <img src={postgresql} alt='POSTGRESQL'></img>
                        <span>PostgreSQL</span>
                    </div>
                </div>
            </div>
            <div className={styles.contMe}>
                <h2>About me</h2>
                <p>My name is Sebastian Gonzales and I'm 22 years old</p>
                <p>I live in Buenos Aires, Argentina</p>
                <p>I love programming and my goal is to improve every day to continue growing as a Full Stack Web Developer</p>
                <div className={styles.links}>
                    <div>
                        <a href='https://www.linkedin.com/in/asgonzalesr/' target='_blank' rel='noreferrer'>
                            <img src={linkedIn} alt='LinkedIn' />
                            <span>LinkedIn</span>
                        </a>
                    </div>
                    <div>
                        <a href='https://www.github.com/asgonzales' target='_blank' rel='noreferrer'>
                            <img src={github} alt='Github' />
                            <span>Github</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;