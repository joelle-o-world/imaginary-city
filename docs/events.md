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

## Sound
`start` Emitted when the sound is first emitted, even if it is inaudible.
  arguements: none.

`stop`  For continuous sounds, emitted when they are told to stop. If they are
        playing then they immediated `end` otherwise they wait for an
        `audioPaused` and then `end`.
  arguments: none

`end`  Emitted when a sound has finished and will never sound again
  arguments: none.

`audioPlaying`  Emitted when audio of this sound begins playing.
  arguments: none.

`audioPaused`   Emitted when audio of this sound has stopped. Doesn't necessarily
              mean the sound is over conceptually, it may have been paused
              because it has become inaudible.
  arguments: none.
