# UX-Test CAS-FEE-Shop

## 1. Probleme/Hypothesen

1. Auf der Produkte-Detail-Seite gibt es keinen Zurück-Button. Kunden finden nicht auf die Produkte-Übersicht zurück.
2. Die Dropdowns für Quantity und Rating sehen sich ähnlich. Kunden verwechseln die Inputs, ohne es zu merken.

### Problem 1: Back-Button

#### Aufgabenziel

Nachdem sich der Kunde ein Produkt im Detail angesehen hat, will er wieder auf die Übersicht aller Produkte.

#### Startpunkt

Der Kunde ist auf der Produkteübersichts-Seite des Shops.

#### Schritte

Der Kunde interessiert sich für ein Produktedetail und klickt auf das Produkt, um auf die Detailseite zu kommen. Nachdem er sich die Details angesehen hat, möchte er wieder zurück zur Übersicht gelangen.

Schritt 1
<img width="959" alt="task1_step1" src="https://user-images.githubusercontent.com/16070364/39083212-25ff3ace-4561-11e8-9973-dd5a7caa625c.png">

Schritt 2
<img width="946" alt="task1_step2" src="https://user-images.githubusercontent.com/16070364/39083208-1806cc48-4561-11e8-9136-3d0018f75e3a.png">

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
- c) der Kunde wählt das falsche Dropdown, bemerkt den Fehler, findet aber nicht heraus an was es liegt und bricht ab

#### Alternative Wege

Der Nutzer könnte mehrmals auf den Add To Cart-Button klicken, dann würde er das Problem umgehen.

## 2. Aufgaben

### Problem 1: Back-Button

«Sie möchten sich ein Produkt im Detail ansehen. Das ausgewählte Produkt ist Ihnen aber zu teuer. Sie möchten wissen, was es im Shop sonst noch zu kaufen gibt. Bitte kommentieren Sie Ihre Überlegungen.»

### Problem 2: Quantity vs. Rating

«Sie sehen sich das Produkt 'Not-So-Classic Fedora' an. Weil Ihnen der Hut gefällt, wollen Sie nun gleich fünf Stück für einen Ausflug mit Freunden bestellen. Bitte kommentieren Sie Ihre Überlegungen.»

## 3. Ergebnisse

### Problem 1: Back-Button

Der fehlende Back-Button war für die Probanden kein Problem. Alternative Lösungswege waren der Back-Button, die Zurück-Wisch-Geste auf dem Trackpad und der Klick auf den Menü-Punkt «Products» im Header.

### Problem 2: Quantity vs. Rating
Für die Probanden schien die Unterscheidung zwischen den beiden Input-Feldern soweit klar zu sein. Eine Versuchsperson klickte fünfmal auf dem Add To Cart-Button und wurde dabei von den Toast-Messages gestört.

### Fazit

Die getesteten Unsicherheiten scheinen die Nutzererfahrung auf der Seite nicht zu beinträchtigen. Die Probanden kamen gut mit der Nutzeroberfläche zurecht oder fanden Umwege, welche zum gewünschten Ziel führten.

## 4. Bilder

Test 1
![uxtest](https://user-images.githubusercontent.com/16070364/39084035-e8afcaa4-456e-11e8-96d6-8d987010ee20.jpg)
Testing
![erika](https://user-images.githubusercontent.com/192808/39094640-158d1d78-4633-11e8-9fef-eb968a22fb80.jpg)
Antonio Testing
![antonio](https://user-images.githubusercontent.com/192808/39096395-ba6eb86c-464f-11e8-91c0-a8c6ad64e6d8.jpg)
