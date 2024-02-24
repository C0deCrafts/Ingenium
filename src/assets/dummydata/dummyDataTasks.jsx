import {COLOR} from "../../constants/styleSettings";
import {ICONS} from "../../constants/icons";

const taskLists = [
    {
        id: 1,
        title: 'Programmieren',
        icon: ICONS.TASKICONS.CODE,
        color: COLOR.ICONCOLOR_CUSTOM_AQUA,
        tasks: [
            { id: 1, title: 'Webseitenprojekt', notes: 'Interaktive Webseite mit HTML, CSS und JavaScript entwickeln.', dueDate: '2024-03-15', done: false },
            { id: 2, title: 'Algorithmus implementieren', notes: 'Bubble-Sort-Algorithmus in Java implementieren.', dueDate: '2024-03-10', done: false },
            { id: 3, title: 'Mobile Todo-App entwickeln', notes: 'Todo App für Android oder iOS mit React Native.', dueDate: '2024-03-20', done: false },
            { id: 4, title: 'API integrieren', notes: 'API für Wetterdaten integrieren.', dueDate: '2024-03-25', done: false },
            { id: 5, title: 'Unit-Tests schreiben', notes: 'POS-Tasksheet Unit Tests fertigstellen.', dueDate: '2024-03-18', done: false }
        ]
    },
    {
        id: 2,
        title: 'Netzwerktechnik',
        icon: ICONS.TASKICONS.HIERARCHY,
        color: COLOR.ICONCOLOR_CUSTOM_DARKGREEN,
        tasks: [
            { id: 6, title: 'Netzwerktopologie entwerfen', notes: 'Netzwerktopologie für ein kleines Bürogebäude entwerfen.', dueDate: '2024-03-22', done: false },
            { id: 7, title: 'Lernen wie man ACLs implementiert', notes: 'PackettracerÜbungen zu ACLs machen.', dueDate: '2024-03-12', done: false },
        ]
    },
    {
        id: 3,
        title: 'Lernen',
        icon: ICONS.TASKICONS.CONTRACT,
        color: COLOR.ICONCOLOR_CUSTOM_VIOLET,
        tasks: [
            { id: 8, title: 'Vorbereitung auf DBI Prüfung', notes: 'Wichtige Konzepte lernen.', dueDate: '2024-03-16', done: false },
            { id: 9, title: 'Lesen der Spring Dokumentation', notes: 'Mit den wichtigsten Konzepten vertaut werden', dueDate: '2024-03-14', done: false },
            { id: 10, title: 'Teilnahme an Online-Kurs Maschinelles lernen', notes: 'Einschreibung und Absolvierung der ersten Lektion.', dueDate: '2024-03-18', done: false },
            { id: 11, title: 'Coding-Challenge lösen', notes: 'Coding-Challenge machen um Programmieren zu üben.', dueDate: '2024-03-20', done: false },
        ]
    },
    {
        id: 4,
        title: 'Diplomarbeit',
        icon: ICONS.TASKICONS.FOLDER,
        color: COLOR.ICONCOLOR_CUSTOM_ORANGE,
        tasks: [
            { id: 12, title: 'Literaturrecherche', notes: 'Recherche von wissenschaftlichen Artikeln und Büchern für Literaturarbeit.', dueDate: '2024-03-25', done: false },
            { id: 13, title: 'Entwurf des Forschungsdesigns', notes: 'Entwurf der Methodik und des Ablaufplans für Durchführung der Diplomarbeit.', dueDate: '2024-03-28', done: false },
            { id: 14, title: 'Datenerhebung', notes: 'Sammlung von Daten für Analyse im Rahmen der Diplomarbeit.', dueDate: '2024-03-30', done: false },
            { id: 15, title: 'Datenanalyse durchführen', notes: 'Statistische Analysen der gesammelten Daten.', dueDate: '2024-04-05', done: false },
            { id: 16, title: 'Schreiben der Diplomarbeit', notes: 'Verfassen des schriftlichen Theorieteils zu Scrum.', dueDate: '2024-04-10', done: false },
        ]
    },
    {
        id: 5,
        title: 'Privat',
        icon: ICONS.TASKICONS.HAPPY,
        color: COLOR.ICONCOLOR_CUSTOM_RED,
        tasks: [
            { id: 17, title: 'Sport treiben', notes: 'Dreimal pro Woche für mindestens 30 Minuten laufen oder schwimmen gehen.', dueDate: '2024-03-16', done: false },
            { id: 18, title: 'Einkaufen für das Sonntagsessen', notes: 'Noch nachsehen was an Zutaten fehlt', dueDate: '2024-03-13', done: false },
            { id: 19, title: 'Geige üben', notes: 'Musikstück für das nächste Konzert einstudieren.', dueDate: '2024-03-15', done: false },
            { id: 20, title: 'Gartenarbeit', notes: 'Laub rächen und Kürbisse ernten.', dueDate: '2024-03-20', done: false },
        ]
    },
    {
        id: 6,
        title: 'Sonstiges',
        icon: ICONS.TASKICONS.FOLDER,
        color: COLOR.ICONCOLOR_CUSTOM_GREY,
        tasks: [
            { id: 21, title: 'Reparatur des Druckers', notes: 'Reparatur des defekten Druckers im Computerraum.', dueDate: '2024-03-23', done: false },
            { id: 22, title: 'Beschaffung neuer Hardware', notes: 'Erstellung einer Liste mit Vorschlägen für den Kauf neuer Hardware', dueDate: '2024-03-28', done: false },
        ]
    }
];

export default taskLists;
