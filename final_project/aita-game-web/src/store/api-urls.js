const API = 'https://aita-game-api.up.railway.app';

const GET_STORY_BY_DAY = `${API}/story/show_by_day`;
const GET_CURRENT_DAY = `${API}/story/day`;
const UPDATE_STORY_VOTES = `${API}/story/vote`;
const GET_CURRENT_VOTE_COUNT = `${API}/story/get_votes`;

module.exports = {
    GET_STORY_BY_DAY,
    GET_CURRENT_DAY,
    UPDATE_STORY_VOTES,
    GET_CURRENT_VOTE_COUNT
}