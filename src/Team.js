import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import logos from "./lgos.json";
import MaterialIcon from "material-icons-react";

const Team = () => {
    const { team } = useParams();
    const [seasonResults, setSeasonResult] = useState([]);
    const [players, setPlayers] = useState([]);
    const [percentageTeam, setPercentageTeam] = useState([]);
    const [statsTeam, setStatsTeam] = useState([]);

    useEffect(() => {
        fetch(`https://ic-nba.herokuapp.com/team_season_results/${team}`)
            .then(res => res.json())
            .then(data => setSeasonResult(data))

        fetch(`https://ic-nba.herokuapp.com/team_players/${team}`)
            .then(res => res.json())
            .then(data => setPlayers(data))

        fetch(`https://ic-nba.herokuapp.com/percentage_made_by_teams`)
            .then(res => res.json())
            .then(data => setPercentageTeam(data))

        fetch(`https://ic-nba.herokuapp.com/total_stats_by_team`)
            .then(res => res.json())
            .then(data => setStatsTeam(data))
    }, [team]);

    const style = {
        page: {
            width: '100%',
            paddingLeft: '7%',
        },
        header: {
            display: 'flex',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-14%)',
            alignItems: 'center',
            margin: '40px 0',
        },
        name: {
            color: 'antiquewhite',
            fontWeight: '400',
            marginLeft: '20px',
        },
        title: {
            color: '#61dafb',
            fontWeight: 400,
            fontSize: '20px',
            marginBottom: '20px',
            position: 'sticky',
            top: '0',
            backgroundColor: 'rgba(42, 44, 46, 1)',
            padding: '10px',
            borderRadius: '5px',
        },
        season: {
            position: 'relative',
            left: '5vw',
            maxWidth: '40%',
        },
        stats: {
            maxWidth: '60%',
            position: 'relative',
            left: '15%',
            display: 'flex',
            flexDirection: 'row'
        },
        results: {
            display: 'flex',
        },
        table: {
            backgroundColor: 'rgba(255, 255, 255, 0.0)',
        },
        th: {
            color: '#E7F4DA',
            fontWeight: '500',
        },
        td: {
            color: 'gainsboro',
        },
        tHead: {
            position: 'sticky',
            top: 0
        },
        stat: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '10px 15px',
        },
        back: {
            position: 'absolute',
            left: '3vw',
            top: '5vh',
            cursor: 'pointer',
        }
    };

    const seasonHeader = ["Fecha", "Asistencias", "Puntos", "Tiros", "Libres", "3pts", "Resultado"];

    const playersHeader = ["Nombre", "Edad", "Juegos", "Minutos", "Pts", "posición"];

    return (
        <div style={style.page}>
            <BackButton />
            <div style={style.header}>
                <img src={logos[team]} alt="" width="60px" />
                <p style={style.name}>{team}</p>
            </div>
            <div style={style.stats} className="custom-card">
                <div style={style.stat}>
                    <span role="img" className="statTitle" aria-label="donut">🎲 Juegos</span>
                    <p className="statText">{statsTeam.find(t => t.team === team)?.games_played}</p>
                </div>
                <div style={style.stat}>
                    <span role="img" className="statTitle" aria-label="donut">🤩 Puntos</span>
                    <p className="statText">{statsTeam.find(t => t.team === team)?.made_points}</p>
                </div>
                <div style={style.stat}>
                    <span role="img" className="statTitle" aria-label="donut">⛹ Rebotes</span>
                    <p className="statText">
                        {parseInt(statsTeam.find(t => t.team === team)?.made_defensive_rebounds) + parseInt(statsTeam.find(t => t.team === team)?.made_defensive_rebounds) || 0}
                    </p>
                </div>
                <div style={style.stat}>
                    <span role="img" className="statTitle" aria-label="donut">&#127746; Bloqueos</span>
                    <p className="statText">{statsTeam.find(t => t.team === team)?.made_blocks}</p>
                </div>
                <div style={style.stat}>
                    <span role="img" className="statTitle" aria-label="donut">🏀 % Tiros Realizados</span>
                    <p className="statText">{percentageTeam.find(t => t.team === team)?.percentage_made_field_goals}</p>
                </div>
                <div style={style.stat}>
                    <span role="img" className="statTitle" aria-label="donut">&#128309; % Tiros Libres</span>
                    <p className="statText">{percentageTeam.find(t => t.team === team)?.percentage_made_free_throws}</p>
                </div>
                <div style={style.stat}>
                    <span role="img" className="statTitle" aria-label="donut">&#128515; % Tiros 3 pts</span>
                    <p className="statText">{percentageTeam.find(t => t.team === team)?.percentage_made_three_point_field_goals}</p>
                </div>
            </div>
            <div style={style.results}>
                {/* Resultados de la Temporada */}
                <div style={style.season} className="custom-card">
                    <h2 style={style.title}>Resultados de la temporada</h2>
                    <table className="table" style={style.table}>
                        <thead style={style.tHead}>
                        <tr>
                            { seasonHeader.map(h  => <th key={`season-${h}`} style={style.th}>{h}</th>)}
                        </tr>
                        </thead>
                        <tfoot>
                        <tr>
                            { seasonHeader.map(h  => <th key={`season-${h}`} style={style.th}>{h}</th>)}
                        </tr>
                        </tfoot>
                        <tbody>
                        {
                            seasonResults.map((sr, i) =>
                                <tr key={`season-${i}`}>
                                    <td style={style.td}>{sr.date}</td>
                                    <td style={style.td}>{sr.assists}</td>
                                    <td style={style.td}>{sr.points}</td>
                                    <td style={style.td}>{sr.made_field_goals}</td>
                                    <td style={style.td}>{sr.made_free_throws}</td>
                                    <td style={style.td}>{sr.made_three_point_field_goals}</td>
                                    <td style={style.td}>{sr.outcome === 'LOSS' ? 'Perdido' : 'Ganado'}</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
                {/* Jugadores */}
                <div style={style.season} className="custom-card">
                    <h2 style={style.title}>Jugadores</h2>
                    <table className="table" style={style.table}>
                        <thead style={style.tHead}>
                        <tr>
                            { playersHeader.map(pl  => <th key={`season-${pl}`} style={style.th}>{pl}</th>)}
                        </tr>
                        </thead>
                        <tfoot>
                        <tr>
                            { playersHeader.map(pl  => <th key={`season-${pl}`} style={style.th}>{pl}</th>)}
                        </tr>
                        </tfoot>
                        <tbody>
                        {
                            players.map((pl, i) =>
                                <tr key={`season-${i}`}>
                                    <td style={style.td}>{pl.name}</td>
                                    <td style={style.td}>{pl.age}</td>
                                    <td style={style.td}>{pl.games_played}</td>
                                    <td style={style.td}>{pl.minutes_played}</td>
                                    <td style={style.td}>{pl.points}</td>
                                    <td style={style.td}>{pl.positions[0]}</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export const BackButton = () => {
    let history = useHistory();
    const style = {
        position: 'absolute',
        left: '3vw',
        top: '5vh',
        cursor: 'pointer',
    };

    const navigate = () => history.push('/');

    return (
        <div style={style} onClick={navigate}>
            <MaterialIcon icon="arrow_back_ios" color="#FFF" size='large' />
        </div>
    )
}

export default Team;
