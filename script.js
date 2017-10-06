//Базовый класс
function Container() {
  this.id = '';
  this.className = '';
  this.htmlCode = '';
}

//Метод render
Container.prototype.render = function () {
  return this.htmlCode;
}
//ДЗ №1
//Метод Remove, который удаляет контейнер
Container.prototype.remove = function () {
  document.getElementById('container').remove();
}


//Подкласс Container-a Menu 
function Menu(myId, myClass, myItems) {
  Container.call(this);
  this.id = myId;
  this.className = myClass;
  this.items = myItems;
}


Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;
Menu.prototype.render = function () {
  var ul = document.createElement('ul');
  for (var i = 0; i < this.items.length; i++) {
    if (this.items[i] instanceof MenuItem || this.items[i] instanceof MenuItemCanDoSubListing) {
      ul.appendChild(this.items[i].render());
    }
  }
  return ul;
}



function MenuItem(myHref, myName) {
  Container.call(this);
  this.className = 'menu-item';
  this.href = myHref;
  this.name = myName;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;
MenuItem.prototype.render = function () {
  var li = document.createElement('li');
  li.className = this.className;
  var a = document.createElement('a');
  a.href = this.href;
  a.innerText = this.name;

  li.appendChild(a);
  return li;
}

//ДЗ №2
//Умеет делать список меню со вложенными пунктами
function MenuItemCanDoSubListing() {
  this.className = 'menu-item-with-sub-list'
  this.name = arguments[0];
  this.subList = [].slice.call(arguments); // Делаем из аргументов полноценный массив
}

MenuItemCanDoSubListing.prototype = Object.create(Menu.prototype);
MenuItemCanDoSubListing.prototype.constructor = MenuItemCanDoSubListing;
MenuItemCanDoSubListing.prototype.render = function () {
  this.subList.shift(); // Удаляем из массива первый аргумент т.к. он идёт в название li первого списка
  var li = document.createElement('li');
  li.innerText = this.name;
  li.classList.add(this.className);
  var ul = document.createElement('ul');
  ul.classList.add('sub-list');
  for (var i = 0; i < this.subList.length; i++) {
    var itemSubList = document.createElement('li');
    itemSubList.classList.add('sub-list-item');
    itemSubList.innerText = this.subList[i];
    ul.appendChild(itemSubList);
  }
  li.appendChild(ul);
  return li;
}

var myMenuItemArray = [];
var myMenuItem1 = new MenuItem('#', 'Main');
var myMenuItem2 = new MenuItem('#', 'Catalog');
var myMenuItem3 = new MenuItem('#', 'About us');
var myMenuItemWithSubList = new MenuItemCanDoSubListing('Numbers', '1', '2', '3', '4'); //Первый аргумент - название родиледьского пункта списка, остальные - подсписок
var myMenuItemWithSubList2 = new MenuItemCanDoSubListing('Words', 'one', 'two', 'three');

myMenuItemArray.push(myMenuItem1);
myMenuItemArray.push(myMenuItem2);
myMenuItemArray.push(myMenuItem3);
myMenuItemArray.push(myMenuItemWithSubList);
myMenuItemArray.push(myMenuItemWithSubList2);

var myMenu = new Menu('myId', 'myClass', myMenuItemArray);

document.getElementById('container').appendChild(myMenu.render());



//ДЗ №3
function Hamburger(size, stuffing) {
  this.SIZE_SMALL = {
    cost: 50,
    calories: 20,
    select: false
  };
  this.SIZE_LARGE = {
    cost: 100,
    calories: 40,
    select: false
  };
  this.STUFFING_CHEESE = {
    cost: 10,
    calories: 20,
    select: false
  };
  this.STUFFING_SALAD = {
    cost: 20,
    calories: 5,
    select: false
  };
  this.STUFFING_POTATO = {
    cost: 15,
    calories: 10,
    select: false
  };
  this.TOPPING_MAYO = {
    name: 'mayo',
    cost: 20,
    calories: 5,
    select: false
  };
  this.TOPPING_SPICE = {
    name: 'spice',
    cost: 15,
    calories: 0,
    select: false
  };
  this.cost = 0;
  this.calories = 0;
  this.orderSize = size;
  this.orderStuffing = stuffing;
  this.toppingArray = [];
}


function HamburgerException (str){
  HamburgerException.massage = {}
}

//Метод добавляет добавку
Hamburger.prototype.addTopping = function (topping) {
  if ((topping.toLowerCase() === 'mayo' || topping.toLowerCase() === 'майонез' || topping.toLowerCase() === 'mayonnaise') && !this.TOPPING_MAYO.select) {
    this.TOPPING_MAYO.select = true;
    this.toppingArray.push(this.TOPPING_MAYO.name);
  } else if ((topping.toLowerCase() === 'spice' || topping.toLowerCase() === 'приправа' || topping.toLowerCase() === 'перец') && !this.TOPPING_SPICE.select) {
    this.TOPPING_SPICE.select = true;
    this.toppingArray.push(this.TOPPING_SPICE.name);
  } else {
    throw new HamburgerException('Выбрана несуществующая добавка, либо одна и таже добавка дважды - ' + topping);
  }
}

//Метод убирает добавку
Hamburger.prototype.removeTopping = function (topping) {
    if ((topping.toLowerCase() === 'mayo' || topping.toLowerCase() === 'майонез' || topping.toLowerCase() === 'mayonnaise') && this.TOPPING_MAYO.select) {
      this.TOPPING_MAYO.select = false;
      this.toppingArray.splice(this.toppingArray.indexOf('mayo'), 1);
    } else if ((topping.toLowerCase() === 'spice' || topping.toLowerCase() === 'приправа' || topping.toLowerCase() === 'перец') && this.TOPPING_SPICE.select) {
      this.TOPPING_SPICE = false;
      this.toppingArray.splice(this.toppingArray.indexOf('spice'), 1);
    } else {
      throw new HamburgerException('У этого гамбургера такой добавки нет - ' + topping);
    }
}

Hamburger.prototype.getToppings = function (){
  var useTopping = [];
  if (!this.toppingArray.length) {
    return 'В гамбургере нет добавок';
  } else {
    if (!(this.toppingArray.indexOf('mayo') === -1)) useTopping.push(this.TOPPING_MAYO);
    if (!(this.toppingArray.indexOf('spice') === -1)) useTopping.push(this.TOPPING_SPICE);
  }
  return useTopping;
}

Hamburger.prototype.getSize = function (){
  return this.orderSize
}

Hamburger.prototype.getStuffing =function (){
  return this.orderStuffing
}

Hamburger.prototype.calculatePrice = function (){
  this.cost = 0; //Сброс старого значения цены
  if (this.orderSize.toLowerCase() === 'large' || this.orderSize.toLowerCase() === 'big' || this.orderSize.toLowerCase() === 'большой') {
    this.SIZE_LARGE.select = true;
  } else if (this.orderSize.toLowerCase() === 'small' || this.orderSize.toLowerCase() === 'littel' || this.orderSize.toLowerCase() === 'маленький'){
    this.SIZE_SMALL.select = true;
  } else {
    throw new HamburgerException('Выбран несуществующий размер гамбургера - ' + this.orderSize);
  }
  
  if (this.orderStuffing.toLowerCase() === 'cheese' || this.orderStuffing.toLowerCase() === 'сыр'){
    this.STUFFING_CHEESE.select = true;
  } else if (this.orderStuffing.toLowerCase() === 'salad' || this.orderStuffing.toLowerCase() === 'салат') {
    this.STUFFING_SALAD.select = true;
  } else if (this.orderStuffing.toLowerCase() === 'potato' || this.orderStuffing.toLowerCase() === 'картошка') {
    this.STUFFING_POTATO.select = true; 
  } else {
    throw new HamburgerException('Выбрана несуществующая начинка - ' + this.orderStuffing);
  }
  
  for (var prop in this){
    if (this[prop].select) {
      this.cost += this[prop].cost;
    }
  }
  return this.cost + ' тугриков.'
}

Hamburger.prototype.calculateCalories = function () {
  this.calories = 0 //сброс старого значения калорий
  this.calculatePrice(); // вызов данного метода требуется для расстановки значение 'true' в правильных полях select(соответственно выюранному размеру и начинки бургера)
  for (var prop in this){
    if (this[prop].select) {
      this.calories += this[prop].calories;
    }
  }
  return this.calories + ' калорий.'
}

var myHamburger1 = new Hamburger('large', 'potato');
