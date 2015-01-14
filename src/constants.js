module.exports = {
  __change__:                       'change', // NOTE: reserved for emit('change')

  /**
   * Actions to request 'change' be emitted with current data
   */
  REQUEST_ASSIGNMENTS:              'REQUEST_ASSIGNMENTS',
  REQUEST_NODES:                    'REQUEST_NODES',
  REQUEST_TAB_STATE:                'REQUEST_TAB_STATE',
  REQUEST_TAB_STATE_RESPONSE:       'REQUEST_TAB_STATE_RESPONSE',

  /**
   * Synchronisation actions
   */
  FETCH_ASSIGNMENTS:                'FETCH_ASSIGNMENTS',
  FETCH_ASSIGNMENTS_SUCCESS:        'FETCH_ASSIGNMENTS_SUCCESS',
  FETCH_ASSIGNMENTS_FAIL:           'FETCH_ASSIGNMENTS_FAIL',
  UPDATE_ASSIGNMENT_CACHE:          'UPDATE_ASSIGNMENT_CACHE',
  UPDATE_ASSIGNMENT_CACHE_SUCCESS:  'UPDATE_ASSIGNMENT_CACHE_SUCCESS',
  UPDATE_ASSIGNMENT_CACHE_FAIL:     'UPDATE_ASSIGNMENT_CACHE_FAIL',
  ASSIGNMENTS_SYNCHRONIZED:         'ASSIGNMENTS_SYNCHRONIZED',

  FETCH_NODES:                      'FETCH_NODES',
  FETCH_NODES_SUCCESS:              'FETCH_NODES_SUCCESS',
  FETCH_NODES_FAIL:                 'FETCH_NODES_FAIL',
  UPDATE_NODE_CACHE:                'UPDATE_NODE_CACHE',
  UPDATE_NODE_CACHE_SUCCESS:        'UPDATE_NODE_CACHE_SUCCESS',
  UPDATE_NODE_CACHE_FAIL:           'UPDATE_NODE_CACHE_FAIL',
  NODES_SYNCHRONIZED:               'NODES_SYNCHRONIZED',

  /**
   * Actions invoked by Chrome
   */
  TAB_CREATED:                      'TAB_CREATED',
  TAB_FOCUSED:                      'TAB_FOCUSED',
  CREATED_NAVIGATION_TARGET:        'CREATED_NAVIGATION_TARGET',
  TAB_UPDATED:                      'TAB_UPDATED',
  HISTORY_STATE_UPDATED:            'HISTORY_STATE_UPDATED',
  WEB_NAV_COMMITTED:                'WEB_NAV_COMMITTED',
  TAB_CLOSED:                       'TAB_CLOSED',
  TAB_REPLACED:                     'TAB_REPLACED',

  /**
   * User actions
   */
  CREATE_NODE_SUCCESS:              'CREATE_NODE_SUCCESS',
  CREATE_ASSIGNMENT_SUCCESS:        'CREATE_ASSIGNMENT_SUCCESS',
  DESTROY_ASSIGNMENT:               'DESTROY_ASSIGNMENT',
  UPDATE_ASSIGNMENT_TITLE:          'UPDATE_ASSIGNMENT_TITLE',

  START_RECORDING:                  'START_RECORDING',
  START_RECORDING_SUCCESS:          'START_RECORDING_SUCCESS',
  START_RECORDING_FAIL:             'START_RECORDING_FAIL',
  RESUME_RECORDING:                 'RESUME_RECORDING',
  RESUME_RECORDING_FAIL:            'RESUME_RECORDING_FAIL',
  STOP_RECORDING:                   'STOP_RECORDING',
  STOP_RECORDING_SUCCESS:           'STOP_RECORDING_SUCCESS',

  RANK_NODE_WAYPOINT:               'RANK_NODE_WAYPOINT',
  RANK_NODE_NEUTRAL:                'RANK_NODE_NEUTRAL',

  SIGN_IN:                          'SIGN_IN',
  SIGN_OUT:                         'SIGN_OUT'
}
