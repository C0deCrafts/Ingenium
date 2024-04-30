# Todos bei den TaskLists

- EditTaskScreen & CreateTaskScreen - duplizierten Code / Styles auslagern?
- EditTaskDetails Screen anelgen --> das gleiche, duplizierten Code vermeiden ja / nein?
- TASKICONS -- nur Icons welche für die UI sind aus diesem File holen
- Usability bezüglich des togglens von Task isDone noch weiter verbessern

BEZÜGLICH DEM USEEFFECT FÜR INITIALIZEDATABASE: noch überlegen wo / wann dies eingesetzt werden sollte

Gemeinsam Machen:
- Wenn Tasks fertig: Über alle Styles gemeinsam drüberschauen (vor allem die Paddings in den ScreenContainern und
den ContentBoxen abgleichen) + Responsive Design

- EditTask Screen gehört noch gemacht -- wer?


Für Später:
- Datum bei Aufgaben hinzufügen (TaskDetails Screen)
- Bei den Screens - EditTaskDetails hinzufügen
- Alle Anpassungen in Sachen nach Datum filtern und anzeigen (wenn Fälligkeitsdatum
- schon vorbei etc.) erst später wenn wir den Kalender machen


WEITERE TODO's Performance -

https://react.dev/reference/react/memo durchlesen und überlegen, wo es Sinn macht:

Laut ChatGPT: 

Verwendung von React.memo für Komponenten
React.memo ist eine Higher Order Component (HOC), die es dir ermöglicht, 
nur dann eine Komponente neu zu rendern, wenn sich ihre Props geändert haben. 
Dies kann besonders nützlich sein für Komponenten, die oft neu gerendert werden, 
obwohl sich ihre Eingabeparameter nicht ändern.

Im Kontext deines Dashboard-Beispiels könntest du React.memo für kleinere Komponenten verwenden, 
die innerhalb von Dashboard gerendert werden und sich nicht oft ändern, wie z.B. CustomInputField oder CustomButton.

```jsx
// Wenn CustomButton eine eigene Komponentendatei ist
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const CustomButton = React.memo(({ onPressFunction, title }) => {
    return (
        <TouchableOpacity onPress={onPressFunction}>
            <Text>{title}</Text>
        </TouchableOpacity>
    );
});

export default CustomButton;
```

Das bedeutet nicht, dass du React.memo übermäßig verwenden solltest. 
Es ist am effektivsten bei Komponenten, die oft neu gerendert werden, ohne dass sich ihre Props ändern.

Laut Dokumentation:

Anmerkung
Sie sollten sich nur auf memo als Performance-Optimierung verlassen. 
Wenn Ihr Code ohne sie nicht funktioniert, 
suchen Sie das zugrunde liegende Problem und beheben Sie es zuerst. 
Dann können Sie hinzufügen, um die Leistung zu verbessern.memo


-- Fetch Call und Kalendermethoden zusammenführen -- gemeinsam

-- Responsive ÜBERALL!!!! Apple!!

√ Login: Schatten weg oder weniger? --Sabrina (+Dokumentation) √ ERLEDIGT
    -- evtl Lösung zum fixen, dass password nach links verschoben wird, hinter dem Icon

    Alles gelöst! Password verschwindet nicht mehr hinter dem Icon (Problem wurde mit Flex: 1 gelöst)
    Password wird nur mehr angezeigt, solange der User am Icon oben bleibt - sobald er nicht mehr auf das Icon tippt, wird das
    Password wieder versteckt

-- Homescreen: -- Sabrina (+Dokumentation)
    -- wenn keine nächsten Kurse oder nächste Aufgabe, render "keine nächsten ...."
       inkl richtige Größe der Box
    -- evtl Design überdenken Nächste Aufgaben
    -- Responsive testen
    -- nächste Aufgaben kein BUTTON!

-- BottomTabNavigation: -- Sabrina
    -- Mitteilung austauschen mit Aufgaben
    //Notification badge - zu Inbox hinzugefügt, wird mit BottomTab Mitteilungen synchronisiert, Funktion zum zählen der Notifications aktuell im Tab Context
    //sollte für die Pushbenachrichtigungen in V2 in woanders ausgelagert werden
-- DrawerNavigation: -- gemeinsam
    -- Resonsive
    -- Profil weg -- Sabrina
  
-- Stundenplan -- Jelena
    --Loading Indicator, 
    --Monat oben drüber, 
    --today button, 
    --hintergrund weiß in Darkmode??
    --evtl bei Montag statt Sonntag beginnen
    --evtl unter Kalender noch ein padding - aktuell das problem, dass überall padding angewendet wird
    --evtl Kalender mit Borderradius 5
    --MarkedDayDots auf Ingeniumfarbe anpassen

-- Aufgaben -- Jelena
    -- Erstellt am.. ausgeben (statt Fällig/Erledigt am bis V2)
    -- V2 oder wenn Zeit ist - Kalenderpicker?
    -- gemeinsames Design für V2 Features --> Inbox, Details
    -- bei keine NächsteTodo's Infotext - keine nächsten Todos (ebenso bei Erledigt Screen)

-- Einstellungen passt
-- Kontakt passt

√ Abmelden und neu Anmelden - Defaultscreen Home + Drawer geschlossen!! -- Sabrina

-- Dokumentation
    --evtl Github Docs oder Github Pages

Zusätzliches:
-- AppNavigation.jsx
if (loading) {
// Ladebildschirm anzeigen, während die Authentifizierungsprüfung läuft
// verhindert, dass man zuerst am Loginscreen landet - so ist es optisch schöner
// könnte ersetzt werden durch Splashscreen
return (
<LoadingComponent message={"Initialisierung läuft..."}/>
);
}


// dokumentation - bis inkl components ordner kontrolliert und ergänzt - nur code den ich geschrieben habe