function deactivateForm (form) {
  const interactiveFormElements = form.querySelectorAll('button, input, select, textarea');
  const formClass = form.classList[0];
  interactiveFormElements.forEach((element) => {
    const elementClass = element.classList[0];
    if (element.hasAttribute('disabled') && !element.classList.contains(`${elementClass}--disabled`)) {
      element.classList.add(`${elementClass}--disabled`);
    }
    if (!element.hasAttribute('disabled')) {
      element.setAttribute('disabled', 'disabled');
    }
  });

  if (!form.classList.contains(`${formClass}--disabled`)) {
    form.classList.add(`${formClass}--disabled`);
  }
}

function activateForm(form) {
  const interactiveFormElements = form.querySelectorAll('button, input, select, textarea');
  const formClass = form.classList[0];

  interactiveFormElements.forEach((element) => {
    const elementClass = element.classList[0];
    if (!element.classList.contains(`${elementClass}--disabled`)) {
      element.removeAttribute('disabled');
    }
  });

  if (form.classList.contains(`${formClass}--disabled`)) {
    form.classList.remove(`${formClass}--disabled`);
  }
}

export { deactivateForm, activateForm };
