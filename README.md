Lab: Angular.js Note App
=====

##Overview
We are building a note-taking app. The app allows us to take notes and store them locally. For this lab, the HTML/CSS has been prewritten so you can concentrate on writing Angular.js code.

##App Layout
The **main area** contains two editable fields: Title and Body. It also displays the time and date the note was created.

The **left sidebar** contains a list of notes ordered by creation date. The newest note is at the top of the list. Each note contains its title and creation date. Beside each note is a "Delete" button. When pressed, this removes the note from the left sidebar.

The sidebar also contains an "Add New Note" button. When clicked, a new note is added to the top of the list. The main area then references the new note, showing an empty Title and Body.


##Extension Challenges
- Ensure that long titles will not mess up the aesthetics of the left sidebar. Either restrict the title length when entered, or display a fixed number of characters followed by "..." if the title is too long.

- Highlight the currently viewed note.

- Add a "color" field to each note which changes the note's background color in the left sidebar. In the main area, allow the user to enter a six-digit HTML color code. (Feel free to add some pre-defined color buttons for quickly flagging a note, for example Red for Urgent, Green for Okay, etc.)

- In the left sidebar, display a preview of the first few lines of the body. Add a checkbox which hides the previews if the user finds them distracting.

- Add a "last viewed" field to each note which stores the date and time it was last viewed. Order the notes in the left sidebar by the last viewed field instead of the date created.

- Add an Undelete button. If a note is accidentally deleted, the user can press the Undelete button to restore it to the listing.