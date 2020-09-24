import React, { useState, useEffect } from "react";
import { BackButton } from "./Team";
import logos from "./lgos.json";

const Prediction = () => {
    const [predictions, setPredictions] = useState([]);

    const style = {
        page: {
            display: 'flex',
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        match: {
            marginTop: '15vh',
            width: '70%',
        },
        title: {
            color: 'white',
        },
        stats: {
            marginTop: '15vh',
            width: '40%',
        },
        sectionTitle: {
            color: '#FF3D13',
            textAlign: 'left',
            marginLeft: '40px',
            fontSize: '30px',
        },
    };

    useEffect(() => {
        fetch('https://ic-nba.herokuapp.com/prediction_result')
            .then(res => res.json())
            .then(data => setPredictions(data.games))
    }, []);
    console.log(predictions)
    return (
        <div style={style.page}>
            <BackButton />
            <div style={style.match}>
                <h1 style={style.sectionTitle}>Encuentros</h1>
                <div style={style.container}>
                    { predictions.map((m, i) => <MatchCard key={`match-${i}`} match={m} />  ) }
                </div>
            </div>
            <div style={style.stats}>
                <h1 style={style.sectionTitle}>Resultados</h1>
            </div>
        </div>
    )
};

const MatchCard = ({ match }) => {
    const style = {
        card: {
            margin: '20px',
            width: '350px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            padding: '30px',
        },
        logo: {
            width: '70px',
        },
        teams: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        label: {
            color: 'gainsboro',
        },
        title: {
            color: '#61dafb',
            marginBottom: '20px',
        }
    };

    return (
        <div style={style.card}>
            <p style={style.title}>Ganador: { match.winner }</p>
            <div style={style.teams}>
                <div>
                    <p style={style.label}>Local</p>
                    <img src={logos[match.home_team]} alt={match.home_team} style={style.logo} />
                </div>
                <h1>VS</h1>
                <div>
                    <p style={style.label}>Visitante</p>
                    <img src={logos[match.away_team]} alt={match.away_team} style={style.logo} />
                </div>
            </div>
            <div>
                <p style={style.label}>Ganador</p>
                <img src={logos[match.winner]} alt={match.winner} style={style.logo} />
            </div>
        </div>
    )
};

export default Prediction;


