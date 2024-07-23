async function requester(method, url, data) {
    const options = {};
    if (method !== 'GET') {
        options.method = method;
    }
    I
    if (data) {
        options.headers = {
            'Content-Type': 'application/json',
        };
        options.body = JSON.stringify(data);
    }
    const response = await fetch(url, options);
    const result = response.json();

    return result;
}

export const get = requester.bind(null, 'GET');
export const post = requester.bind(null, 'POST');
export const put = requester.bind(null, 'PUT');
export const del = requester.bind(null, 'DELETE');

// export const get = (url, data) => requester('GET', url, data);
// export const post = (url, data) => requester('POST', url, data);
// export const put = (url, data) => requester('PUT', url, data);
// export const del = (url, data) => requester('DELETE', url, data);



// import * as request from './requester';
// import GameListItem from './game-list-item/GameListItem';
//
// const BASE_URL = 'http://localhost:3030/jsonstore/games'
// I
// export const getAll = async () => {
//     const result = await request.get(BASE_URL);
//     const games = Object.values(result);
//     return games;
// };
//
//
//
// import * as gamesAPI from '../../api/games-api';
//
// export default function GameList() {
//     I
//     const [games, setGames] = useState([]);
//     useEffect(() => {
//         gamesAPI.getAll()
//           .then(result => setGames(result));
//     }, []);
//     return (
//       <section id="catalog-page"><h1>All Games</h1>
//           {games.length > 0
//             ? games.map(game => <GameListItem key={game._id} {...game} />)