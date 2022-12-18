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

import "./style.css";

// "minimize/delete" by removing the associated parent element on the close icon click
document.querySelectorAll(".close").forEach((closer) => {
  removeParentElementOnClick(closer);
})

const priorityBtns = document.querySelectorAll(".priority-btn");

priorityBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains("selected")) {
      btn.classList.remove("selected");
    } else {
      unselectScopeBtns(btn);
      btn.classList.add("selected");
    }
  })
})

function unselectScopeBtns(element) {
  const parentDiv = element.closest("div");
  if (parentDiv) {
    const wrappedBtns = parentDiv.querySelectorAll('button');
    wrappedBtns.forEach((btn) => {
      btn.classList.remove("selected");
    })
  }
}

function removeParentElementOnClick(childElement) {
  childElement.addEventListener('click', () => {
    const cardParent = childElement.closest(".card");
    const overlayParent = childElement.closest(".overlay");
    const taskParent = childElement.closest(".task");
    const projectParent = childElement.closest(".btn-project-item");
    [cardParent, overlayParent, taskParent, projectParent].some(element => {
      if (element) {
        element.remove();
        return true;
      }
    });
  })
}

function validProjSubmission(form) {
  const title = form.closest("#title");
  console.log("VALIDATING: %s", title);
}

// const submits = document.querySelectorAll('button[type="submit"]');

// submits.forEach((submit) => {
//   submit.addEventListener('click', () => {
//     if (validProjSubmission(submit.form)) {
//       console.log(submit.form);
//       removeParentElementOnClick(submit);
//     }
//   })
// })

const main = document.querySelector("main");
const createNewProjBtn = document.querySelector("#btn-add-project-item");
createNewProjBtn.addEventListener('click', popupNewProjectCard);

function createAttributedTextEl(type, attributes = {}, text = "") {
  const element = document.createElement(type);
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  element.textContent = text;
  return element;
}

function popupNewProjectCard() {
  const formCardWrapper = createAttributedTextEl('div', { 'id': "popup-create-proj", 'class': "overlay" })
  const popupCard = createAttributedTextEl('div', { 'class': "popup-card" });
  const form = createAttributedTextEl('form', { 'action': 'javascript:void(0);' });
  const exitIcon = createAttributedTextEl('i', { 'class': "light-blue-hover close fa fa-times" });
  removeParentElementOnClick(exitIcon);
  const h2Title = document.createElement('h2');
  const h2TitleLabel = createAttributedTextEl('label', { 'for': 'title' }, "Project Title");
  const inputTitle = createAttributedTextEl('input', { 'type': "text", 'id': "title", 'required': '' });
  const h3Priority = createAttributedTextEl('h3', {}, "Priority");
  const priorityBtnGroup = createAttributedTextEl('button', { 'class': 'popup-btn-group' });
  const highPriorityBtn = createAttributedTextEl('button', { 'type': "button", 'class': "priority-btn high" }, "High");
  const medPriorityBtn = createAttributedTextEl('button', { 'type': "button", 'class': "priority-btn medium" }, "Medium");
  const lowPriorityBtn = createAttributedTextEl('button', { 'type': "button", 'class': "priority-btn low" }, "Low");
  const h3Description = document.createElement('h3');
  const h3DescriptionLabel = createAttributedTextEl('label', { 'for': 'description' }, "Description");
  const descriptionTextArea = createAttributedTextEl('textarea', { 'class': 'popup-text', 'id': 'description' });
  const h3StartDate = document.createElement('h3');
  const startDateLabel = createAttributedTextEl('label', { 'for': 'start-date' }, "Start");
  const inputStartDate = createAttributedTextEl('input', {
    'type': 'datetime-local', 'id': 'start-date',
    'name': 'start-date', 'min': '2022-11-29T00:00'
  });
  const h3EndDate = document.createElement('h3');
  const endDateLabel = createAttributedTextEl('label', { 'for': 'due-date' }, 'End');
  const inputEndDate = createAttributedTextEl('input', {
    'type': 'datetime-local', 'id': 'due-date',
    'name': 'due-date', 'min': '2022-11-29T00:01'
  });
  const endBtnGroup = createAttributedTextEl('div', { 'class': 'popup-btn-group', 'id': 'confirm-reset-grp' });
  const submitBtn = createAttributedTextEl('button', { 'type': 'submit' }, 'Confirm');
  const resetBtn = createAttributedTextEl('button', { 'type': 'reset' }, 'Reset');
  formCardWrapper.appendChild(popupCard);
  popupCard.appendChild(form);
  h2Title.appendChild(h2TitleLabel);
  h3Description.appendChild(h3DescriptionLabel);
  h3StartDate.appendChild(startDateLabel);
  h3EndDate.appendChild(endDateLabel);
  appendChilds(priorityBtnGroup, [highPriorityBtn, medPriorityBtn, lowPriorityBtn]);
  appendChilds(endBtnGroup, [submitBtn, resetBtn]);
  appendChilds(form, [exitIcon, h2Title, inputTitle, h3Priority, priorityBtnGroup, h3Description, descriptionTextArea,
    h3StartDate, inputStartDate, h3EndDate, inputEndDate, endBtnGroup]);
  main.appendChild(formCardWrapper);
  form.querySelectorAll(".priority-btn").forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains("selected")) {
        btn.classList.remove("selected");
      } else {
        unselectScopeBtns(btn);
        btn.classList.add("selected");
      }
    })
  })
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault(); //prevent default form submission
    const requiredTitle = submitBtn.form.querySelector("#title").value;
    if (localStorage.getItem(requiredTitle) !== null) {
      alert("That project title is already taken")
    }
    else if (requiredTitle.trim().length === 0) {
      alert("Project title needs to be made up characters")
    }
    else {
      const formData = getProjectFormData(submitBtn.form);
      localStorage.setItem(requiredTitle, JSON.stringify(formData));
      formCardWrapper.remove();
      const newProjBtn = newNavProjBtn(formData);
      const projectsListBtns = document.querySelector('#projects-list');
      projectsListBtns.appendChild(newProjBtn);
      newProjBtn.addEventListener('click', () => {
        if (newProjBtn.classList.contains("selected")) {
          newProjBtn.classList.remove("selected");
        } else {
          newProjBtn.classList.add("selected");
          addProjectToGrid(localStorage.getItem(requiredTitle));
        }
      });
      // projectsListBtns.appendChild()
      // "projects-list" >
      //   <button class="btn-project-item selected">
      //     <div class="project-item-title">
      //       Test
      //     </div>
      //     <i class="del-hover-color close fas fa-times" aria-hidden="true"></i>
      //   </button>
    }
  })
}

function getProjectEditForm(projectData) {
  console.log(projectData);
  //TODO change css to include same stuff of popup-create-proj towards popup-edit-proj
  const formCardWrapper = createAttributedTextEl('div', { 'id': "popup-create-proj", 'class': "overlay" })
  const popupCard = createAttributedTextEl('div', { 'class': "popup-card" });
  const form = createAttributedTextEl('form', { 'action': 'javascript:void(0);' });
  const exitIcon = createAttributedTextEl('i', { 'class': "light-blue-hover close fa fa-times" });
  removeParentElementOnClick(exitIcon);
  const h2Title = document.createElement('h2');
  const h2TitleLabel = createAttributedTextEl('label', { 'for': 'title' }, "Project Title");
  const inputTitle = createAttributedTextEl('input', { 'type': "text", 'id': "title", 'required': '', 'value': `${projectData['title']}` });
  const h3Priority = createAttributedTextEl('h3', {}, "Priority");
  const priorityBtnGroup = createAttributedTextEl('button', { 'class': 'popup-btn-group' });
  const highPriorityBtn = createAttributedTextEl('button', { 'type': "button", 'class': "priority-btn high" }, "High");
  const medPriorityBtn = createAttributedTextEl('button', { 'type': "button", 'class': "priority-btn medium" }, "Medium");
  const lowPriorityBtn = createAttributedTextEl('button', { 'type': "button", 'class': "priority-btn low" }, "Low");
  const h3Description = document.createElement('h3');
  const h3DescriptionLabel = createAttributedTextEl('label', { 'for': 'description' }, "Description");
  const descriptionTextArea = createAttributedTextEl('textarea', { 'class': 'popup-text', 'id': 'description' },);
  descriptionTextArea.value = projectData['description'];
  const h3StartDate = document.createElement('h3');
  const startDateLabel = createAttributedTextEl('label', { 'for': 'start-date' }, "Start");
  const inputStartDate = createAttributedTextEl('input', {
    'type': 'datetime-local', 'id': 'start-date',
    'name': 'start-date', 'min': '2022-11-29T00:00',
    'value': `${projectData['startDate']}`
  });
  const h3EndDate = document.createElement('h3');
  const endDateLabel = createAttributedTextEl('label', { 'for': 'due-date' }, 'End');
  const inputEndDate = createAttributedTextEl('input', {
    'type': 'datetime-local', 'id': 'due-date',
    'name': 'due-date', 'min': '2022-11-29T00:01',
    'value': `${projectData['endDate']}`
  });
  const endBtnGroup = createAttributedTextEl('div', { 'class': 'popup-btn-group', 'id': 'confirm-reset-grp' });
  const submitBtn = createAttributedTextEl('button', { 'type': 'submit' }, 'Confirm');
  const resetBtn = createAttributedTextEl('button', { 'type': 'reset' }, 'Reset');
  formCardWrapper.appendChild(popupCard);
  popupCard.appendChild(form);
  h2Title.appendChild(h2TitleLabel);
  h3Description.appendChild(h3DescriptionLabel);
  h3StartDate.appendChild(startDateLabel);
  h3EndDate.appendChild(endDateLabel);
  appendChilds(priorityBtnGroup, [highPriorityBtn, medPriorityBtn, lowPriorityBtn]);
  selectChosenPriorityBtn(priorityBtnGroup, projectData['priority']);
  appendChilds(endBtnGroup, [submitBtn, resetBtn]);
  appendChilds(form, [exitIcon, h2Title, inputTitle, h3Priority, priorityBtnGroup, h3Description, descriptionTextArea,
    h3StartDate, inputStartDate, h3EndDate, inputEndDate, endBtnGroup]);
  main.appendChild(formCardWrapper);
  form.querySelectorAll(".priority-btn").forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains("selected")) {
        btn.classList.remove("selected");
      } else {
        unselectScopeBtns(btn);
        btn.classList.add("selected");
      }
    })
  })
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault(); //prevent default form submission
    const previousTitle = projectData['title'];
    const requiredTitle = submitBtn.form.querySelector("#title").value;
    if (localStorage.getItem(requiredTitle) !== null && requiredTitle !== previousTitle) {
      alert("That project title is already taken");
    }
    else if (requiredTitle.trim().length === 0) {
      alert("Project title needs to be made up characters");
    }
    else {
      const formData = getProjectFormData(submitBtn.form);
      updateProject(projectData['title'], formData);
      // TODO see above function -- CURRENTLY WORKING ON
      localStorage.setItem(requiredTitle, JSON.stringify(formData));
      formCardWrapper.remove();
      const newProjBtn = newNavProjBtn(formData);
      const projectsListBtns = document.querySelector('#projects-list');
      projectsListBtns.appendChild(newProjBtn);
      newProjBtn.addEventListener('click', () => {
        if (newProjBtn.classList.contains("selected")) {
          newProjBtn.classList.remove("selected");
        } else {
          newProjBtn.classList.add("selected");
          addProjectToGrid(localStorage.getItem(requiredTitle));
        }
      });
    }
  })
}

function appendChilds(parent, elArray) {
  for (const el of elArray) {
    parent.appendChild(el);
  }
}

function getProjectFormData(form) {
  let data = {};
  data["title"] = form.querySelector("#title").value;
  data["priority"] = "";
  for (const priorityBtn of form.querySelectorAll(".priority-btn")) {
    if (priorityBtn.classList.contains('selected')) {
      data["priority"] = priorityBtn.textContent.toLowerCase();
    }
  }
  data["description"] = form.querySelector("#description").value;
  data["startDate"] = form.querySelector("#start-date").value;
  data["endDate"] = form.querySelector("#due-date").value;
  return data
}

function newNavProjBtn(formData) {
  const btnWrapper = createAttributedTextEl('button', { 'class': 'btn-project-item' });
  const btnTitle = createAttributedTextEl('div', { 'class': 'project-item-title' }, formData["title"]);
  const xIcon = createAttributedTextEl('i', { 'class': 'del-hover-color close fas fa-times', 'aria-hidden': 'true' });
  btnWrapper.appendChild(btnTitle);
  btnWrapper.appendChild(xIcon);
  xIcon.addEventListener('click', () => {
    localStorage.removeItem(formData["title"]);
    btnWrapper.remove();
  })
  return btnWrapper;
}

function selectChosenPriorityBtn(btnGroup, chosenPriority) {
  if (!chosenPriority) {
    return;
  }
  const priorityBtns = btnGroup.querySelectorAll('.priority-btn');
  for (const btn of priorityBtns) {
    if (btn.classList.contains(chosenPriority)) {
      btn.classList.add('selected');
    }
  }
}

function updateProject(previousTitle, newData) {
  //TODO update the project btn and grid with newData
  // change the localstorage key if necessary (and remove the prev)
}

function addProjectToGrid(projectDataJSON) {
  const projectData = JSON.parse(projectDataJSON);
  const projectCard = createAttributedTextEl('div', { 'class': `card priority-${projectData['priority']}`, 'id': `${projectData['title']}` });
  const topRightCardActions = createAttributedTextEl('div', { 'class': 'top-right-card-actions' })
  const editIcon = createAttributedTextEl('i', { 'class': 'light-blue-hover fa fa-file-text', 'aria-hidden': 'true' });
  editIcon.addEventListener('click', () => {
    getProjectEditForm(projectData);
  })
  //TODO attach edit button to edit project form and modify the associated html on change
  const minimizeIcon = createAttributedTextEl('i', { 'class': 'light-blue-hover close fa fa-minus', 'aria-hidden': 'true' });
  //TODO attach - button to minimize project without deleting it
  topRightCardActions.appendChild(editIcon);
  topRightCardActions.appendChild(minimizeIcon);
  const projectTitle = createAttributedTextEl('h2', {}, projectData['title']);
  const bottomRightCardActions = createAttributedTextEl('div', { 'class': 'bottom-right-card-actions' });
  const addTaskAction = createAttributedTextEl('i', { 'class': 'light-blue-hover fas fa-plus', 'aria-hidden': 'true' });
  //TODO attach + button to add tasks for this specific project by adding to the json/localstorage
  bottomRightCardActions.appendChild(addTaskAction);
  projectCard.appendChild(topRightCardActions);
  projectCard.appendChild(projectTitle);
  projectCard.appendChild(createAttributedTextEl('p', {}, 'item1'));
  projectCard.appendChild(bottomRightCardActions);
  const projectsGrid = document.querySelector('#projects-grid');
  projectsGrid.appendChild(projectCard);
}



localStorage.clear(); //TODO remove later