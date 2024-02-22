/**
 * This file defines names for symbols used in the app, making it clear which symbols are active and which are inactive.
 *
 * <blockquote>
 * <ul>
 * <li>If a key ends with '.ACTIVE', it means the symbol is active.
 * <li>If it ends with '.INACTIVE', the symbol is inactive.
 * </ul>
 * This naming convention helps in managing the appearance of symbols in the app effectively.
 * <blockquote>
 *
 * @constant {Object} ICONS - Object containing symbol names
 * @property {Object} ACCOUNT_SETTINGS - Account settings icon
 * @property {string} ACCOUNT_SETTINGS.ACTIVE - Active account settings icon
 * @property {string} ACCOUNT_SETTINGS.INACTIVE - Inactive account settings icon
 * @property {Object} BACK - Back icon
 * @property {string} BACK.ACTIVE - Active back icon
 * @property {string} BACK.INACTIVE - Inactive back icon
 * @property {Object} CLOSE - Close icon
 * @property {string} CLOSE.ACTIVE - Active close icon
 * @property {string} CLOSE.INACTIVE - Inactive close icon
 * @property {Object} CONTACT - Contact icon
 * @property {string} CONTACT.ACTIVE - Active contact icon
 * @property {string} CONTACT.INACTIVE - Inactive contact icon
 * @property {Object} DASHBOARD - Dashboard icon
 * @property {string} DASHBOARD.ACTIVE - Active dashboard icon
 * @property {string} DASHBOARD.INACTIVE - Inactive dashboard icon
 * @property {Object} DRAWER_MENU - Drawer menu icon
 * @property {string} DRAWER_MENU.ACTIVE - Active drawer menu icon
 * @property {string} DRAWER_MENU.INACTIVE - Inactive drawer menu icon
 * @property {Object} DEFAULT_ICON - Default icon
 * @property {string} DEFAULT_ICON.ACTIVE - Active default icon
 * @property {string} DEFAULT_ICON.INACTIVE - Inactive default icon
 * @property {Object} LINK - Link icon
 * @property {string} LINK.ACTIVE - Active link icon
 * @property {string} LINK.INACTIVE - Inactive link icon
 * @property {Object} LOGOUT - Logout icon
 * @property {string} LOGOUT.ACTIVE - Active logout icon
 * @property {string} LOGOUT.INACTIVE - Inactive logout icon
 * @property {Object} NOTIFICATION - Notification icon
 * @property {string} NOTIFICATION.ACTIVE - Active notification icon
 * @property {string} NOTIFICATION.INACTIVE - Inactive notification icon
 * @property {Object} SETTINGS - Settings icon
 * @property {string} SETTINGS.ACTIVE - Active settings icon
 * @property {string} SETTINGS.INACTIVE - Inactive settings icon
 * @property {Object} TASKS - Tasks icon
 * @property {string} TASKS.ACTIVE - Active tasks icon
 * @property {string} TASKS.INACTIVE - Inactive tasks icon
 * @property {Object} TIMETABLE - Timetable icon
 * @property {string} TIMETABLE.ACTIVE - Active timetable icon
 * @property {string} TIMETABLE.INACTIVE - Inactive timetable icon
 *
 * @example
 * import { ICONS } from '../../constants';
 *
 * const iconNames = ICONS;
 *
 * console.log(iconNames); // Shows an object containing symbol names
 */
export const ICONS = {
    ACCOUNT_SETTINGS: {
        ACTIVE: require('../assets/icons/account-cog.png'),
        INACTIVE: require('../assets/icons/account-cog-outline.png'),
    },
    BACK: {
        ACTIVE: require('../assets/icons/arrow_back.png'),
        INACTIVE: require('../assets/icons/arrow_back.png'),
    },
    CLOSE: {
        ACTIVE: require('../assets/icons/window-close.png'),
        INACTIVE: require('../assets/icons/window-close.png'),
    },
    CONTACT: {
        ACTIVE: require('../assets/icons/account-box.png'),
        INACTIVE: require('../assets/icons/account-box-outline.png'),
    },
    DASHBOARD: {
        ACTIVE: require('../assets/icons/view-dashboard.png'),
        INACTIVE: require('../assets/icons/view-dashboard-outline.png'),
    },
    DEFAULT_ICON: {
        ACTIVE: require('../assets/icons/circle.png'),
        INACTIVE: require('../assets/icons/circle-outline.png'),
    },
    DRAWER_MENU: {
        ACTIVE: require('../assets/icons/menu.png'),
        INACTIVE: require('../assets/icons/menu.png'),
    },
    LINK: {
        ACTIVE: require('../assets/icons/web.png'),
        INACTIVE: require('../assets/icons/web.png'),
    },
    LOGOUT: {
        ACTIVE: require('../assets/icons/logout.png'),
        INACTIVE: require('../assets/icons/logout.png'),
    },
    NOTIFICATION: {
        ACTIVE: require('../assets/icons/bell.png'),
        INACTIVE: require('../assets/icons/bell-outline.png'),
    },
    SETTINGS: {
        ACTIVE: require('../assets/icons/cog.png'),
        INACTIVE: require('../assets/icons/cog-outline.png'),
    },
    TASKS: {
        ACTIVE: require('../assets/icons/format-list-bulleted.png'),
        INACTIVE: require('../assets/icons/format-list-bulleted.png'),
    },
    TIMETABLE: {
        ACTIVE: require('../assets/icons/calendar-clock.png'),
        INACTIVE: require('../assets/icons/calendar-clock-outline.png'),
    },
};