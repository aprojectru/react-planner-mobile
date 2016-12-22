import {createStore} from 'redux';
import {Record, List, Map} from 'immutable';
import {MODE_PANNING, MODE_ADDING_COMMENT} from './constants/modes';
import {ZOOM_LEVEL_MAX, ZOOM_LEVEL_MIN, ZOOM_START_LEVEL} from './constants/zoom'

const State = Record({
    mode: MODE_PANNING,
    comments: new List(),
    zoomLevel: ZOOM_START_LEVEL,
    isSidebarOpen: true,
    activeComment: -1,
    commentIsExploded: true
}, 'State');


function addComment(state, x, y) {
    let newState = state;
    let point = new Map({x, y});
    let comments = newState.comments.push(point);
    newState = newState.set('comments', comments);
    newState = newState.set('mode', MODE_PANNING);
    return newState;
}

function enterAddCommentMode(state) {
    return state.set('mode', MODE_ADDING_COMMENT);
}

function cancelAddCommentMode(state) {
    return state.set('mode', MODE_PANNING);
}

function explodeComment(state, commentIndex) {
    let newState = state;
    newState = newState.set('commentIsExploded', true);
    newState = newState.set('activeComment', commentIndex);
    return newState;
}

function closeComment(state) {
    return state.set('activeComment', -1);
}

function deleteComment(state, commentIndex) {
    let newState = state;
    let comments = newState.comments;
    newState = newState.comments.delete(commentIndex);
    return newState;
}

//MANCANO modifyComment E saveCommentText

function zoomIn(state) {
    let newZoom = state.zoomLevel + 1;
    //if (newZoom == 0) newZoom = 1;
    if (newZoom > ZOOM_LEVEL_MAX) newZoom = ZOOM_LEVEL_MAX;
    return state.set('zoomLevel', newZoom);
}

function zoomOut(state) {
    let newZoom = state.zoomLevel - 1;
    //if (newZoom == 0) newZoom = -1;
    if (newZoom < ZOOM_LEVEL_MIN) newZoom = ZOOM_LEVEL_MIN;
    return state.set('zoomLevel', newZoom);
}

function reducer(state, action) {
    state = state || new State();

    switch (action.type) {
        case "ENTER_ADDING_COMMENT":
            return enterAddCommentMode(state);
            break;
        case "CANCEL_ADDING_COMMENT":
            return cancelAddCommentMode(state);
            break;
        case "ADD_COMMENT":
            return addComment(state, action.x, action.y);
            break;
        case "EXPLODE_COMMENT":
            return explodeComment(state, action.commentIndex);
            break;
        case "CLOSE_COMMENT":
            return closeComment(state);
            break;
        case "DELETE_COMMENT":
            return deleteComment(state, commentIndex);
            break;
        case "ZOOMING_IN":
            return zoomIn(state);
            break;
        case "ZOOMING_OUT":
            return zoomOut(state);
            break;
        default:
            return state;
    }
}

export function initStore() {
  let middlewares = window.devToolsExtension ? window.devToolsExtension() : f => f;
  return createStore(reducer, null, middlewares);
}
