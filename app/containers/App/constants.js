/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';
const prefix = 'CESPrintingService/App/';
export const LOAD_APP = prefix + 'LOAD_APP';
export const APP_LOADED = prefix + 'APP_LOADED';
export const AUTH_CHECKED = prefix + 'AUTH_CHECKED';

//More clarity's sake should have these instead of auth changed, 
export const LOGOUT = prefix + 'LOGOUT';
export const LOGIN =  prefix + 'LOGIN';
