/*
 *
 * Map actions
 *
 */

import {
  LOAD_LAYER,
  LAYER_REQUESTED,
  LAYER_LOAD_SUCCESS,
  LAYER_LOAD_ERROR,
  LAYER_READY,
  SET_MAP_LAYERS,
  SET_HIGHLIGHT_FEATURE,
} from './constants';

export function setHighlightFeature(layer, feature, copy) {
  return {
    type: SET_HIGHLIGHT_FEATURE,
    layer,
    feature,
    copy,
  };
}
export function setMapLayers(layers) {
  return {
    type: SET_MAP_LAYERS,
    layers,
  };
}

export function loadLayer(key, config, args) {
  return {
    type: LOAD_LAYER,
    key,
    config,
    args,
  };
}

export function setLayerLoadSuccess(key, config, data, time) {
  return {
    type: LAYER_LOAD_SUCCESS,
    key,
    config,
    data,
    time,
  };
}

export function setLayerRequested(key, time) {
  return {
    type: LAYER_REQUESTED,
    key,
    time,
  };
}

export function setLayerLoadError(error, key) {
  return {
    type: LAYER_LOAD_ERROR,
    error,
    key,
  };
}

export function setLayerReady(key, time) {
  return {
    type: LAYER_READY,
    key,
    time,
  };
}
