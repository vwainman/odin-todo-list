/*
 todo list item properties
 -title: of the todo task
 -description: about the task
 -dueDate: due date
 -priority: color levels [LOW - green, MEDIUM - yellow, HIGH - red]
 -checklist: every item has a checklist option

 Separated by "project containers", i.e. Science, Math, etc.

 * separate app logic (create new todo, setting todos as complete, changing todo priority, etc.) from DOM-related stuff
 --> keep in separate modules

 UI look should be able to:
 1. view all projects
 2. view all todos in each project (just hte title and due date and color for diff priority)
 3. expand a single todo to see/edit details
 4. delete a todo

 *** INSPIRATION: use https://en.todoist.com/, https://culturedcode.com/things/, https://www.any.do/ ***

 When utilizing webpack, consider using this library https://github.com/date-fns/date-fns
 (gives a bunch of handy functions for formatting and manipulating dates and times)

 Add persistance with storage (refreshing the page should not disappear todos, use web storage API)
 localStorage - https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
 --> allows you to save data on the user's computer (and it's only accessible on the user's computer)
 * Setup a function that saves projects (and containing todos) to localStorage EVERYTIME a new project/todo is created
 * and another function that looks for the data in localStorage when your app first loads
 --> Tips to not get tripped up:
   -- prevent your app from crashing if the data you want to retrieve isn't there
   -- localStorage uses JSON to send/store and retrieve data
     NOTE: cannot store functions in JSON, so figure out how to add methods back to your object properties when fetched
*/
