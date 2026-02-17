# my-final-project

## Author
- Your Name

## Description
This project includes a school clubs website plus a Places You've Been app where users track destinations with details like location, landmarks, time of year, and notes.

## Project Setup Instructions
1. Open the project folder in VS Code.
2. Navigate to the Places You've Been page:
	- Final project/places you've visited/index.html
3. Open the file in a browser.

## Live Site
- https://your-username.github.io/your-repo-name/

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Places You've Been – Business Logic Tests (TDD)
Below are the tests used to drive the business logic for the Places you've Been app. You can paste these into your browser console after loading the page, or adapt them to any test runner.

### Test 1: Place stores properties
```js
const place = new Place("Nairobi", "Kenya", "KICC", "December 2024", "Great views");
place.name === "Nairobi"; // true
place.location === "Kenya"; // true
place.landmarks === "KICC"; // true
place.timeOfYear === "December 2024"; // true
place.notes === "Great views"; // true
```

### Test 2: Place.getSummary()
```js
const place = new Place("Nairobi", "Kenya", "KICC", "December 2024", "Great views");
place.getSummary() === "Nairobi (Kenya)"; // true
```

### Test 3: Place.getDetails()
```js
const place = new Place("Nairobi", "Kenya", "KICC", "December 2024", "Great views");
const details = place.getDetails();
details.name === "Nairobi"; // true
details.location === "Kenya"; // true
details.landmarks === "KICC"; // true
details.timeOfYear === "December 2024"; // true
details.notes === "Great views"; // true
```

### Test 4: PlaceBook assigns ids
```js
const book = new PlaceBook();
book.assignId() === 1; // true
book.assignId() === 2; // true
```

### Test 5: PlaceBook.addPlace()
```js
const book = new PlaceBook();
const place = new Place("Nairobi", "Kenya", "KICC", "December 2024", "Great views");
book.addPlace(place);
place.id === 1; // true
book.places[1] === place; // true
```

### Test 6: PlaceBook.findPlace()
```js
const book = new PlaceBook();
const place = new Place("Nairobi", "Kenya", "KICC", "December 2024", "Great views");
book.addPlace(place);
book.findPlace(1) === place; // true
book.findPlace(2) === false; // true
```

### Test 7: PlaceBook.deletePlace()
```js
const book = new PlaceBook();
const place = new Place("Nairobi", "Kenya", "KICC", "December 2024", "Great views");
book.addPlace(place);
book.deletePlace(1) === true; // true
book.findPlace(1) === false; // true
book.deletePlace(2) === false; // true
```
