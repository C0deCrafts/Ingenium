# Todos bei den TaskLists

- EditTaskScreen & CreateTaskScreen - duplizierten Code / Styles auslagern? --> EditTaskDetails das gleiche, duplizierten Code vermeiden ja / nein?


BEZÜGLICH DEM USEEFFECT FÜR INITIALIZEDATABASE: noch überlegen wo / wann dies eingesetzt werden sollte

Gemeinsam Machen:
- Wenn Tasks fertig: Über alle Styles gemeinsam drüberschauen (vor allem die Paddings in den ScreenContainern und
den ContentBoxen abgleichen) + Responsive Design

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


√ Fetch Call und Kalendermethoden zusammenführen -- gemeinsam - erledigt

-- Responsive ÜBERALL!!!! Apple!!

√ Login: Schatten weg oder weniger? --Sabrina (+Dokumentation) √ ERLEDIGT
    -- evtl Lösung zum fixen, dass password nach links verschoben wird, hinter dem Icon

    Alles gelöst! Password verschwindet nicht mehr hinter dem Icon (Problem wurde mit Flex: 1 gelöst)
    Password wird nur mehr angezeigt, solange der User am Icon oben bleibt - sobald er nicht mehr auf das Icon tippt, wird das
    Password wieder versteckt

√ Homescreen: -- Sabrina (+Dokumentation)
    √ wenn keine nächsten Kurse oder nächste Aufgabe, render "keine nächsten ...."
       inkl richtige Größe der Box
    √ evtl Design überdenken Nächste Aufgaben
    √ Responsive testen
    √ nächste Aufgaben kein BUTTON!

√ BottomTabNavigation: -- Sabrina
    //Navigation wurde richtiggestellt
    //Notification badge - zu Inbox hinzugefügt, wird mit BottomTab Mitteilungen synchronisiert, Funktion zum zählen der Notifications aktuell im Tab Context
    //sollte für die Pushbenachrichtigungen in V2 in woanders ausgelagert werden
-- DrawerNavigation: -- gemeinsam
    -- Resonsive
    -- Profil weg -- Sabrina
  
-- Stundenplan -- Jelena
    √ Loading Indicator - erledigt
    ! Monat oben drüber,  -- GEHT BEI AGENDA leider nicht (nur AgendaList)
    ! today button, -- GEHT BEI AGENDA leider nicht (nur AgendaList)
    √ hintergrund weiß in Darkmode?? - musste das original stylesheet von react native calendar überschreiben
    √ evtl bei Montag statt Sonntag beginnen
    √ evtl unter Kalender noch ein padding - aktuell das problem, dass überall padding angewendet wird - musste das original stylesheet von react native calendar überschreiben
    √ evtl Kalender mit Borderradius 5 - musste das original stylesheet von react native calendar überschreiben
    ! MarkedDayDots auf Ingeniumfarbe anpassen - fällt nicht auf, würd ich lassen - weil da muss ich glaub ich auch das style überschreiben und das stylesheet hab ich im githubcode nicht gefunden

-- Aufgaben -- Jelena
    √ Erstellt am.. ausgeben (statt Fällig/Erledigt am bis V2) - fällig/erledigt wurde implementiert
    √ V2 oder wenn Zeit ist - Kalenderpicker? - Kalenderpicker wurde implementiert
    -- gemeinsames Design für V2 Features --> Inbox
    -- bei keine NächsteTodo's Infotext - keine nächsten Todos (ebenso bei Erledigt Screen)

√ Einstellungen passt
√ Kontakt passt

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

-- DetailsScreen aktualisiert und alle Screens wo dueDate in Verwendung kommt!
-- ACHTUNG!! TODO - es wurde eine neue Variable in der DB ergänzt - Expo App muss komplett vom
-- Device gelöscht werden inkl aller Einstellungen, sonst funktioniert es nicht!!

-- Einstellungen / Allgemein / iPhone-Speicher / Expo Go / App löschen
-- dann neu vom App Store installieren und starten :)