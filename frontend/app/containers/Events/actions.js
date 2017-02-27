/*
 *
 * Events actions
 *
 */

import {
  UPDATE,
} from './constants';

export function update(event) {
  return {
    type: UPDATE,
    data: event,
  };
}
