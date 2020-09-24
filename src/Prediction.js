import React, { useState, useEffect } from "react";
import { BackButton } from "./Team";
import logos from "./lgos.json";
import MaterialIcon from "material-icons-react";

const Prediction = () => {
    const [predictions, setPredictions] = useState([]);
    const [result, setResult] = useState([]);

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
        statsGroup: {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            margin: '10px',
            borderRadius: '5px',
        }
    };

    useEffect(() => {
        fetch('https://ic-nba.herokuapp.com/prediction_result')
            .then(res => res.json())
            .then(data => {
                setPredictions(data.games);
                setResult(data.season_result);
            })
    }, []);

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
                <div style={style.statsGroup}>
                    { result.sort((a, b) => (a.total_win > b.total_win) ? -1 : 1).map((r, i) => <PositionCard key={`position-${i}`} position={r} place={i + 1} />) }
                </div>
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
        },
        winner: {
            marginTop: '10px',
        }
    };

    return (
        <div style={style.card}>
            <p style={style.title}>Ganador: { match.winner }</p>
            <div style={style.teams}>
                <div>
                    <p style={style.label}>Local</p>
                    <img src={logos[match.home_team]} alt={match.home_team} style={style.logo} />
                    <p style={style.label}>P: {match.prediction_home_team}%</p>
                </div>
                <h1 style={style.label}>VS</h1>
                <div>
                    <p style={style.label}>Visitante</p>
                    <img src={logos[match.away_team]} alt={match.away_team} style={style.logo} />
                    <p style={style.label}>P: {match.prediction_away_team}%</p>
                </div>
            </div>
            <div style={style.winner}>
                <p style={style.label}>Ganador</p>
                <img src={logos[match.winner]} alt={match.winner} style={style.logo} />
            </div>
            <p style={style.label}>{match.date}</p>
        </div>
    )
};

const PositionCard = ({ position, place }) => {
    const style = {
        card: {
            margin: '10px 5px',
            padding: '30px 30px 0 30px',
            display: 'flex',
            alignItems: 'center',
        },
        logo: {
            width: '60px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '20px',
        },
        place: {
            color: 'white',
            marginRight: '10px',
        }
    };

    return (
        <div style={style.card}>
            <p style={style.place}>{place}. </p>
            <img src={logos[position.team]} alt={position.team} style={style.logo} />
            <div className="wins" style={style.text}>
                <MaterialIcon icon="arrow_upward" color="#5EBC00" />
                <h3>Ganados: {position.total_win}</h3>
            </div>
            <div className="loss" style={style.text}>
                <MaterialIcon icon="arrow_downward" color="#FF3D13" />
                <p>Perdidos: {position.total_loss}</p>
            </div>
        </div>
    )
};

export default Prediction;


