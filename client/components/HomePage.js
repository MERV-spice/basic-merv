import React from 'react'
import { StyleSheet } from 'react-native'
import NavBar from './NavBar';
import CluePage from './CluePage';
import GamesPage from './GamesPage';

const HomePage = () => {
    const buttons = ['home', 'games', 'clue'];
    const [page, setPage] = React.useState('home');

    let renderedPage;
    if (page === 'games') {
	renderedPage = <GamesPage />
    } else if (page === 'clue') {
	renderedPage = <CluePage />
    } else {
	renderedPage = <GamesPage />
    }

    return (
	<React.Fragment>
	    {renderedPage}
	    <NavBar
		fn={page => setPage(buttons[page])}
		selected={page}
	    />
	</React.Fragment>
    );
}

export default HomePage;
