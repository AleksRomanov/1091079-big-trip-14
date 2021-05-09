import Abstract from '../view/abstract.js';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place = RenderPosition.AFTERBEGIN) => {
  // console.log(container);

  if (container instanceof Abstract) {

    container = container.getElement();


  }

  if (element instanceof Abstract) {

    element = element.getElement();
    // console.log(element);

  }
  //
  // console.log(container);
  //
  // console.log(element);

  switch (place) {
    case RenderPosition.AFTERBEGIN:

      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:

      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div'); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};

// export const createElement = (template) => {
//   const newElement = document.createElement('template'); // 1
//   newElement.innerHTML = template;
//   return newElement.content;
// };
// Единственный нюанс, что HTML в строке должен иметь общую обёртку,
// то есть быть чем-то вроде <nav><a>Link 1</a><a>Link 2</a></nav>,
// а не просто <a>Link 1</a><a>Link 2</a>

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};
