# Events in imaginary-city

## Game
`changeProtagonist`  Emitted after a change of protagonist.
  arguments: `newProtagonist`

`protagonistMove` Emitted after the protagonist moves.
  arguments: *copied from PhysicalObject's move event*

## Physical Object
`exit`    Emitted after `this` exits another object, before it enters another.
  arguments: (oldLocation, oldLocationType)

`enter`   Emitted after `this` enters another object.
  arguments: `newLocation`, `newLocationType`

`move`    Emitted after `this` moves.
  arguments:
    - `from`  An object with two keys: `location` and `locationType`
    - `to`    An object with two keys: `location` and `locationType`

`exited`  Emitted after another object exits `this` as a location.
  arguments:
    - `exitter`         The object which has exited `this` object as a location.
    - `oldLocationType`

`entered` Emitted after another object enters `this` as a location.
  arguments
    - `enterer`
    - `locationType`
