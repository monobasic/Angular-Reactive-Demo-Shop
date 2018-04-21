# UX-Test CAS-FEE-Shop

## 1. Probleme/Hypothesen

1. Auf der Produkte-Detail-Seite gibt es keinen Zurück-Button
2. Die Dropdowns für Quantity und Rating sehen sich ähnlich

### Problem 1: Back-Button

#### Aufgabenziel

Nachdem sich der Kunde ein Produkt im Detail angesehen hat, will er wieder auf die Übersicht aller Produkte.

#### Startpunkt

Der Kunde ist auf der Produkteübersichts-Seite des Shops.

#### Schritte

Der Kunde interessiert sich für ein Produktedetail und klickt auf das Produkt, um auf die Detailseite zu kommen. Nachdem er sich die Details angesehen hat, möchte er wieder zurück zur Übersicht gelangen.

[[https://github.com/monobasic/CAS-FEE-PROJEKT-2/blob/develop/ux-testing/task1_step1.png|alt=task1_step1]]
[[https://github.com/monobasic/CAS-FEE-PROJEKT-2/blob/develop/ux-testing/task1_step2.png|alt=task1_step2]]

#### Problem

Auf der Detail-Ansicht für ein Produkt ist kein expliziter Back-Button implementiert. Der Kunde könnte nicht mehr auf die Produkte-Übersicht zurückfinden.

#### Vermuteter Effekt auf den Nutzer

Wahrscheinlich ist der fehlende Back-Button kein grosses Problem, weil die Applikation das Routing korrekt umsetzt. Der Back-Button respektive die History-Back-Funktion ist eine der meistgenutzten Funktionalitäten in einem Browser.

### Problem 2: Quantity vs. Rating

#### Aufgabenziel

Nachdem sich der registrierte und eingeloggte Kunde ein Produkt im Detail angesehen hat, möchte er sich mehrere davon in den Warenkorb legen.

#### Startpunkt

Der Kunde ist auf der Detailansicht eines Produktes. Zudem ist er registriert und eingeloggt.

#### Schritte

Der Kunde ist auf der Detailansicht des Produktes und möchte nun mehrere davon in den Warenkorb legen.

<img width="911" alt="task2_step1" src="https://user-images.githubusercontent.com/16070364/39083187-c319fafc-4560-11e8-9064-dd5bce7b9ef5.png">

#### Problem

Ist der Kunde eingeloggt, wird ihm neben dem Quantity-Dropdown auch das Dropdown-Feld für das Produkte-Rating angezeigt. Diese beiden Dropdowns mit Zahlen könnte der Kunde verwechseln.

#### Vermuteter Effekt auf den Nutzer

- a) kein Effekt, der Kunde wählt das richtige Dropdown
- b) der Kunde wählt das falsche Dropdown und bemerkt den Fehler frühestens beim Checkout
- c) der Kunde wählt das falsche Dropdown, bemerkt den Fehler, findet aber nicht heraus, an was es liegt und bricht ab

## 2. Aufgaben

### Back-Button

«Sie möchten sich ein Produkt im Detail ansehen. Das ausgewählte Produkt ist Ihnen aber zu teuer. Sie möchten wissen, was es im Shop sonst noch zu kaufen gibt. Bitte kommentieren Sie Ihre Überlegungen.»

### Add To Cart-Button

«Sie sehen sich das Produkt 'Not-So-Classic Fedora' an. Weil Ihnen der Hut gefällt, wollen Sie nun gleich fünf Stück für einen Ausflug mit Freunden bestellen. Bitte kommentieren Sie Ihre Überlegungen.»

## 3. Ergebnisse

## 4. Bilder