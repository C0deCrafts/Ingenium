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
 * @property {Object} CAMERA - Camera icon
 * @property {string} CAMERA.ACTIVE - Active camera icon
 * @property {string} CAMERA.INACTIVE - Inactive camera icon
 * @property {Object} CLOSE - Close icon
 * @property {string} CLOSE.ACTIVE - Active close icon
 * @property {string} CLOSE.INACTIVE - Inactive close icon
 * @property {Object} CONTACT - Contact icon
 * @property {string} CONTACT.ACTIVE - Active contact icon
 * @property {string} CONTACT.INACTIVE - Inactive contact icon
 * @property {Object} DASHBOARD - Dashboard icon
 * @property {string} DASHBOARD.ACTIVE - Active dashboard icon
 * @property {string} DASHBOARD.INACTIVE - Inactive dashboard icon
 * @property {Object} DEFAULT_ICON - Default icon
 * @property {string} DEFAULT_ICON.ACTIVE - Active default icon
 * @property {string} DEFAULT_ICON.INACTIVE - Inactive default icon
 * @property {Object} DRAWER_MENU - Drawer menu icon
 * @property {string} DRAWER_MENU.ACTIVE - Active drawer menu icon
 * @property {string} DRAWER_MENU.INACTIVE - Inactive drawer menu icon
 * @property {Object} FORWARD - Forward icon
 * @property {string} FORWARD.ACTIVE - Active forward icon
 * @property {string} FORWARD.INACTIVE - Inactive forward icon
 * @property {Object} LINK - Link icon
 * @property {string} LINK.ACTIVE - Active link icon
 * @property {string} LINK.INACTIVE - Inactive link icon
 * @property {Object} LOGOUT - Logout icon
 * @property {string} LOGOUT.ACTIVE - Active logout icon
 * @property {string} LOGOUT.INACTIVE - Inactive logout icon
 * @property {Object} MAIL - Mail icon
 * @property {string} MAIL.ACTIVE - Active mail icon
 * @property {string} MAIL.INACTIVE - Inactive mail icon
 * @property {Object} NAVIGATION - Navigation icon
 * @property {string} NAVIGATION.ACTIVE - Active navigation icon
 * @property {string} NAVIGATION.INACTIVE - Inactive navigation icon
 * @property {Object} NOTIFICATION - Notification icon
 * @property {string} NOTIFICATION.ACTIVE - Active notification icon
 * @property {string} NOTIFICATION.INACTIVE - Inactive notification icon
 * @property {Object} PHONE - Phone icon
 * @property {string} PHONE.ACTIVE - Active phone icon
 * @property {string} PHONE.INACTIVE - Inactive phone icon
 * @property {Object} SETTINGS - Settings icon
 * @property {string} SETTINGS.ACTIVE - Active settings icon
 * @property {string} SETTINGS.INACTIVE - Inactive settings icon
 * @property {Object} TASKS - Tasks icon
 * @property {string} TASKS.ACTIVE - Active tasks icon
 * @property {string} TASKS.INACTIVE - Inactive tasks icon
 * @property {Object} TIMETABLE - Timetable icon
 * @property {string} TIMETABLE.ACTIVE - Active timetable icon
 * @property {string} TIMETABLE.INACTIVE - Inactive timetable icon
 * @property {Object} WEATHER_ICONS - Weather icons
 * @property {string} WEATHER_ICONS.CLOUDY - Cloudy weather icon
 * @property {string} WEATHER_ICONS.NIGHT - Night weather icon
 * @property {string} WEATHER_ICONS.RAIN - Rainy weather icon
 * @property {string} WEATHER_ICONS.SNOWFALL - Snowfall weather icon
 * @property {string} WEATHER_ICONS.SUNNY - Sunny weather icon
 * @property {string} WEATHER_ICONS.SUN_CLOUDY - Partly cloudy weather icon
 * @property {string} WEATHER_ICONS.THUNDER - Thunderstorm weather icon
 * @property {Object} TASKICONS - Task icons
 * @property {string} TASKICONS.ANNOYED - Annoyed icon
 * @property {string} TASKICONS.ADD - Add icon
 * @property {string} TASKICONS.CHAIR - Chair icon
 * @property {string} TASKICONS.BOOK - Book icon
 * @property {string} TASKICONS.BUG - Bug icon
 * @property {string} TASKICONS.CHAT - Chat icon
 * @property {string} TASKICONS.CIRCLE - Circle icon
 * @property {string} TASKICONS.CIRCLE_DONE - Circle done icon
 * @property {string} TASKICONS.CLOSE - Close icon
 * @property {string} TASKICONS.CODE - Code icon
 * @property {string} TASKICONS.COLOR_PALETTE - Color palette icon
 * @property {string} TASKICONS.COMPUTER - Computer icon
 * @property {string} TASKICONS.CONTRACT - Contract icon
 * @property {string} TASKICONS.COMPLETED - Completed icon
 * @property {string} TASKICONS.CURVED_LINE - Curved line icon
 * @property {string} TASKICONS.FOLDER - Folder icon
 * @property {string} TASKICONS.GAME - Game icon
 * @property {string} TASKICONS.GIFT - Gift icon
 * @property {string} TASKICONS.HAPPY - Happy icon
 * @property {string} TASKICONS.HAT - Hat icon
 * @property {string} TASKICONS.HEART - Heart icon
 * @property {string} TASKICONS.HEARTBEAT - Heartbeat icon
 * @property {string} TASKICONS.HELP - Help icon
 * @property {string} TASKICONS.HIERARCHY - Hierarchy icon
 * @property {string} TASKICONS.INBOX - Inbox icon
 * @property {string} TASKICONS.LEAF - Leaf icon
 * @property {string} TASKICONS.LIST - List icon
 * @property {string} TASKICONS.MINUS - Minus icon
 * @property {string} TASKICONS.MINUS_OUTLINE - Minus outline icon
 * @property {string} TASKICONS.MORE - More icon
 * @property {string} TASKICONS.MORE_OUTLINE - More outline icon
 * @property {string} TASKICONS.PEN - Pen icon
 * @property {string} TASKICONS.QUESTIONING - Questioning icon
 * @property {string} TASKICONS.SAD - Sad icon
 * @property {string} TASKICONS.SMILE - Smile icon
 * @property {string} TASKICONS.SOUND - Sound icon
 * @property {string} TASKICONS.SURPRISED - Surprised icon
 * @property {string} TASKICONS.TEXT - Text icon
 * @property {string} TASKICONS.TIME - Time icon
 * @property {string} TASKICONS.WORK - Work icon
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
    CAMERA: {
        ACTIVE: require('../assets/icons/camera_2_line.png'),
        INACTIVE: require('../assets/icons/camera_2_fill.png'),
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
    EXPORT: {
        ACTIVE: require('../assets/icons/arrow_right_up_line.png',),
        INACTIVE: require('../assets/icons/arrow_right_up_line.png'),
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
    WEATHER_ICONS: {
        CLOUDY: require('../assets/icons/cloud_line.png'),
        NIGHT: require('../assets/icons/moon_fog_line.png'),
        RAIN: require('../assets/icons/heavy_rain_line.png'),
        SNOWFALL: require('../assets/icons/moderate_snow_line.png'),
        SUNNY: require('../assets/icons/sun_fog_line.png'),
        SUN_CLOUDY: require('../assets/icons/sun_cloudy_line.png'),
        THUNDER: require('../assets/icons/cloud_lightning_line.png'),
    },
    THEME_ICONS: {
        DARK_ACTIVE: require('../assets/icons/dark_line.png'),
        DARK_INACTIVE: require('../assets/icons/dark_line.png'),
        LIGHT_ACTIVE: require('../assets/icons/light_line.png'),
        LIGHT_INACTIVE: require('../assets/icons/light_line.png'),
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
        LOCK: require('../assets/icons/lock.png'),
        UNLOCK: require('../assets/icons/unlock_line.png'),
    }

};