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
 * @property {Object} TASKS - TasksMain icon
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
        ACTIVE: require('../assets/icons/close.png'),
        INACTIVE: require('../assets/icons/close.png'),
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
    FORWARD: {
        ACTIVE: require('../assets/icons/arrow_forward.png'),
        INACTIVE: require('../assets/icons/arrow_forward.png'),
    },
    LINK: {
        ACTIVE: require('../assets/icons/web.png'),
        INACTIVE: require('../assets/icons/web.png'),
    },
    LOGOUT: {
        ACTIVE: require('../assets/icons/logout.png'),
        INACTIVE: require('../assets/icons/logout.png'),
    },
    MAIL: {
        ACTIVE: require('../assets/icons/mail_outline.png'),
        INACTIVE: require('../assets/icons/mail_outline.png')
    },
    NAVIGATION: {
        ACTIVE: require('../assets/icons/navigation_outline.png'),
        INACTIVE: require('../assets/icons/navigation_outline.png')
    },
    NOTIFICATION: {
        ACTIVE: require('../assets/icons/bell.png'),
        INACTIVE: require('../assets/icons/bell-outline.png'),
    },
    PHONE: {
        ACTIVE: require('../assets/icons/phone-outline.png'),
        INACTIVE: require('../assets/icons/phone-outline.png'),
    },
    SETTINGS: {
        ACTIVE: require('../assets/icons/cog.png'),
        INACTIVE: require('../assets/icons/cog-outline.png'),
    },
    TASKS: {
        ACTIVE: require('../assets/icons/list.png'),
        INACTIVE: require('../assets/icons/list.png'),
    },
    TIMETABLE: {
        ACTIVE: require('../assets/icons/calendar-clock.png'),
        INACTIVE: require('../assets/icons/calendar-clock-outline.png'),
    },
    TASKICONS: {
        ANNOYED: require('../assets/icons/annoyed-outline.png'),
        ADD: require('../assets/icons/add.png'),
        CHAIR: require('../assets/icons/armchair.png'),
        BOOK: require('../assets/icons/book-outline.png'),
        BUG: require('../assets/icons/bug-outline.png'),
        CHAT: require('../assets/icons/chat-outline.png'),
        CIRCLE: require('../assets/icons/circle-outline.png'),
        CIRCLE_DONE: require('../assets/icons/circle-done.png'),
        CLOSE: require('../assets/icons/close.png'),
        CODE: require('../assets/icons/code-outline.png'),
        COLOR_PALETTE: require('../assets/icons/color-palette-outline.png'),
        COMPUTER: require('../assets/icons/computer-outline.png'),
        CONTRACT: require('../assets/icons/contract-outline.png'),
        COMPLETED: require('../assets/icons/done-checkmark-outline.png'),
        CURVED_LINE: require('../assets/icons/curved_line.png'),
        FOLDER: require('../assets/icons/folder-outline.png'),
        GAME: require('../assets/icons/gamepad-outline.png'),
        GIFT: require('../assets/icons/gift-outline.png'),
        HAPPY: require('../assets/icons/happy-outline.png'),
        HAT: require('../assets/icons/hat-icon.png'),
        HEART: require('../assets/icons/heart-outline.png'),
        HEARTBEAT: require('../assets/icons/heartbeat-outline.png'),
        HELP: require('../assets/icons/help-outline.png'),
        HIERARCHY: require('../assets/icons/hierarchical-structure-outline.png'),
        INBOX: require('../assets/icons/inbox-outline.png'),
        LEAF: require('../assets/icons/leaf-outline.png'),
        LIST: require('../assets/icons/list.png'),
        MINUS: require('../assets/icons/minus-fill.png'),
        MINUS_OUTLINE: require('../assets/icons/minus-outline.png'),
        MORE: require('../assets/icons/more.png'),
        MORE_OUTLINE: require('../assets/icons/more-outline.png'),
        PEN: require('../assets/icons/pen.png'),
        QUESTIONING: require('../assets/icons/questioning-outline.png'),
        SAD: require('../assets/icons/sad-outline.png'),
        SMILE: require('../assets/icons/smile-outline.png'),
        SOUND: require('../assets/icons/sound-outline.png'),
        SURPRISED: require('../assets/icons/surprised-outline.png'),
        TEXT: require('../assets/icons/text.png'),
        TIME: require('../assets/icons/time-outline.png'),
        WORK: require('../assets/icons/work-outline.png'),
    },

    LOGIN: {
        USER: require('../assets/icons/user.png'),
        LOCK: require('../assets/icons/lock.png')
    }

};