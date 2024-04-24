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



-- HOMESCREEN - Creation Date + isDone Filter, + in db speichern (Tasks)
-- alles durchklicken, wichtigkeit zusammenschreiben was unbedingt notwenig ist
-- Mitteilung auf Aufgaben ändern - Bottom
-- Feature Seiten gleichmäßig
-- DrawerMenü - Responsive!!
-- Profil bearbeiten weg!
-- Loading Indicator + Datebox Kalender!
-- Text bei keine nächsten Aufgaben / Tasks im Homescreen!
-- Kalender hintergrund weiß??
-- evtl. today button??
-- Kalender undefinded!!
-- Kalender Monat oben drüber!!!
-- Fetch Call und Kalendermethoden zusammenführen