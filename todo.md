# Todos bei den TaskLists

Sabrina 
- Paddings ändern bei Aufgaben und ListenBoxen (ListenButton mit Icon --> CustomBoxButton)
- SquareIcon und BoxIcon zusammenführen

Jelena
### Bezüglich 'Liste' Alle
- Eine Liste mit Titel Alle anlegen und wenn man da draufklickt sieht man Alle Aufgaben 
- -- soll das überhaupt eine Liste sein? Oder ein extra Button der nur aussieht wie eine Liste -- wenn man draufklickt wird man zu 
ListTasks weitergeleitet & es wird kein listId Parameter an die Route weitergegeben - if listId === false - werden alle Todos angezeigt.

(will ich erst angreifen, wenn der Code welcher alle Listen auf TasksMain anzeigt bearbeitet wurde 
Paddings, ersetzen von TouchableOpacity mit CustomBoxButton - damit wir nicht denselben
Code bearbeiten)

- (Ingenium Liste und Alle Liste dürfen nicht gelöscht werden - noch schauen wie genau wir das machen???
  darf man aus der Ingenium Liste Aufgaben löschen?)

- Hinsichtlich zu langer Titel: 
gelöst außer:
  - Listen Titel auf TasksMain Screen:
    - gemeinsam mit Sabrina ansehen, wenn die Paddings in den Boxen angepasst wurden


Gemeinsam Machen:
- Wenn Tasks fertig: Über alle Styles gemeinsam drüberschauen (vor allem die Paddings in den ScreenContainern und
den ContentBoxen abgleichen)

- EditTask Screen gehört noch gemacht -- wer?


Für Später:
- Datum bei Aufgaben hinzufügen (TaskDetails Screen)
- Bei den Screens - EditTaskDetails hinzufügen
- Alle Anpassungen in Sachen nach Datum filtern und anzeigen (wenn Fälligkeitsdatum
- schon vorbei etc.) erst später wenn wir den Kalender machen
- Cases behandeln, wenn bei einem Task keine Notiz / kein Datum eingegeben wurde


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

