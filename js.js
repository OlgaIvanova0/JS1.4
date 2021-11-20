"use strict";

/* Задание 1. Написать функцию, преобразующую число в объект. Передавая на вход число в диапазоне [0,
999],
мы должны получить на выходе объект, в котором в соответствующих свойствах описаны
разряды числа:
- единицы (в свойстве firstDigit)
- десятки (в свойстве secondDigit)
- сотни (в свойстве thirdDigit)
Если число было передано вне [0, 999] диапазона, не целое число или вообще не число,
необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.*/
console.log('Задание 1');

let num = prompt('Введите целое число от 0 до 999');
let firstDigit = 0;
let secondDigit = 0;
let thirdDigit = 0;
const getNumber = num =>{
   if(!Number.isInteger(+ num) || num < 0 || num > 999){
     alert('Число введено не верно! Попробуйте еще раз.');
   }
};
getNumber(num);

const readNumber = num =>{
  firstDigit = + num[num.length - 1];
  secondDigit = + num[num.length - 2];
  thirdDigit = + num[num.length - 3];
  if (num.length < 2) {
    return secondDigit = 0;
  } else if (num.length < 3) {
    return thirdDigit = 0;
  }
};
readNumber(num);

const obj = {
  firstDigit,
  secondDigit,
  thirdDigit,
}
console.log(obj);

/* Задание 2*. Для игры, реализованной на уроке (бродилка), добавить возможность ходить по диагонали
цифрами 1, 3, 7, 9
Также необходимо сделать так, чтобы пользователь не мог совершить шаг в стенку, т.е. при
направлении в стенку
игрок оставался на том же месте где стоял.*/
console.log('Задание 2');

const settings = {
rowsCount: 10,
colsCount: 10,
startPositionX: 0,
startPositionY: 0,
};

const player = {  // Объект игрока, здесь будут все методы и свойства связанные с ним.
  x: 0,
  y: 0,
  init(startX, startY) {  //Инициализация игрока и его метоположения.
     this.x = startX;
     this.y = startY;
  },
};

let previousX = 0; //записываем положение игрока игрока
let previousY = 0;

const game = {      // Объект игры, здесь будут все методы и свойства связанные с самой игрой в общем.
   settings,
   player,
   
   run() {   //Запускает игру.
    this.player.init(this.settings.startPositionX, this.settings.startPositionY);  //ставим игрока в начальное местоположение
    while (true) {
      this.render(); // Отображаем нашу игру
      previousX = this.player.x; // фиксируем позицию игрока в данном ходе. Если в след.ход он упрется в стену - вернем его на эту точку
      previousY = this.player.y;
      const direction = this.getDirection(); // Получаем направление от игрока.
      this.getNextPosition(direction); //запускае проверку хода и расчет новой точки
      
      if (direction === -1) {  // Если игрок сказал что хочет выйти (набрал -1), значит выходим.
         alert('До свидания.');
         return;
       }
    };
},

render() {    // Отображает игру в консоли.
  let map = "";
  for (let row = 0; row < this.settings.rowsCount; row++) {  // Цикл перебирает все строки, которые надо отобразить.
       for (let col = 0; col < this.settings.colsCount; col++) {// В каждой строке отображаем для каждой колонки (x - клетка, o - игрок).
          if (this.player.y === row && this.player.x === col) {
             map += 'o ';
          } else {  // Проверяем, если на данной позиции должен быть и игрок, отображаем игрока, если нет - клетку.
             map += 'x ';
          };
        };
      map += '\n'; // После того как отобразили всю строку делаем переход на следующую строку.
    }
     console.clear();
     console.log(map);
},

getDirection() { // Получает и отдает направление от пользователя.
 const availableDirections = [-1, 2, 4, 6, 8, 1, 3, 7, 9]; // Доступные значения ввода.
 while (true) {  // Получаем от пользователя направление.
    const direction = parseInt(prompt('Введите число, куда вы хотите переместиться, -1 для выхода.'));
    if (!availableDirections.includes(direction)) { // Если направление не одно из доступных, то сообщаем что надо ввести корректные данные
       alert(`Для перемещения необходимо ввести одно из чисел: ${availableDirections.join(', ')}.`);
       continue;
    };
   return direction; // Если пользователь ввел корректное значение - отдаем его.
 };
},

getNextPosition(direction) { //расчитываем следующее положение игрока
  switch (direction) {
    case 1:
     this.player.x--;
     this.player.y++;
     break; 
    case 2:
     this.player.y++;
     break;
    case 3:
     this.player.x++;
     this.player.y++;
     break; 
    case 4:
     this.player.x--;
     break;
    case 6:
     this.player.x++;
     break;
    case 7:
      this.player.x--;
      this.player.y--;
      break;   
    case 8:
     this.player.y--;
     break;
    case 9:
      this.player.x++;
      this.player.y--;
      break;  
    };
 
  // проверяем не упирается ли игрок в стену
  if (this.player.x < 0 || this.player.y < 0 || this.player.y > 9 || this.player.x > 9) {
    this.player.x = previousX; //если уперся в стену - отменяем текущий ход
    this.player.y = previousY;
   alert('Вы уперлись в стену. Выбирайте другое направление');
   };
},
};

game.run();


/* Задание 3**. На базе игры (приняв за пример), созданной на уроке, реализовать игру «Кто хочет стать
миллионером?».Т.е. у вас должен быть главный объект содержащий всю логику игры, который будет иметь
методы, например метод run, возможно метод init и т.д. В игре должны быть заранее подготовлены список 
вопросов и ответов (как минимум 5 вопросов). Игра должна приветствовать пользователя, после чего задавать 
вопросы пользователю и предлагать варианты ответов в виде теста,Проверять правильный вариант выбрал 
пользователь или нет, необходимо вести счет. По окончании игры, когда было задано 5 вопросов, вы должны 
сообщить пользователю его счет и предложить сыграть снова. Также должна быть возможность выхода из игры 
заранее, если пользователю надоело играть.*/
console.log('Задание 3');

const question = [{
    quest: 'Загадка 1\nВарианты ответов:\n1 - верно,\n 2 - не верно,\n 3 - не верно,\n 4 - не верно.\n-1 - для выхода. ',
    rightAnswer: '1',
    },
    {
    quest: 'Загадка 2\nВарианты ответов:\n1 - не верно,\n 2 - верно,\n 3 - не верно,\n 4 - не верно.\n-1 - для выхода.',
    rightAnswer: '2',
    },
    {
    quest: 'Загадка 3\nВарианты ответов:\n1 - не верно,\n 2 - не верно,\n 3 - верно,\n 4 - не верно.\n-1 - для выхода. ',
    rightAnswer: '3',
    },
    {
    quest: 'Загадка 4\nВарианты ответов:\n1 - не верно,\n 2 - не верно,\n 3 - не верно,\n 4 - верно.\n-1 - для выхода. ',
    rightAnswer: '4',
    },
    {
    quest: 'Загадка 5\nВарианты ответов:\n1 - верно,\n 2 - не верно,\n 3 - не верно,\n 4 - не верно.\n-1 - для выхода. ',
    rightAnswer: '1',
    },
  ];
  
const newGame = {
  question,
  availableAnswer: ['1', '2', '3', '4'],//возможные варианты ответа
  newRightAnswer: [],//все правильные ответы
  playerAnswer:[],//ответы игрока
  playerCount: 0,//количество правильных ответов
  
  run() { //процесс игры
    this.getRightAnswer();//записываем все правильные ответы
    const answer = this.getAnser();//получаем ответы игрока
    console.log(this.playerAnswer);
    this.getPlayerCount();//находим правильные ответы
    alert(`Поздравляем! Количество правильных ответов: ${this.playerCount} из 5`);
  },
  getAnser() { //получаем ответы игрока
     for (let i = 0; i < question.length; i++) {
       let play = prompt(this.question[i].quest);
        if (play === '-1'){
          return alert('До свидания!');
        };
        if (this.availableAnswer.includes(play)){
        this.playerAnswer.push(play);
        continue;
        } else {
          alert('Ошибка! Можно вводить только 1,2,3,4 и -1. Попробуйте еще раз.');
          i--;
        };
      }; 
    },
  getPlayerCount() { //находим правильные ответы
    for (let j = 0; j < this.newRightAnswer.length; j++) {
      if (this.playerAnswer[j] === this.newRightAnswer[j]) {//сравниваем массив с ответами игрока с массивом правилных ответов
        console.log(`Вы ответили правильно на вопрос номер ${j + 1}`)
        this.playerCount++;//если ответ верный то увеличиваем счет очков на 1
      };    
    };
    return this.playerCount; 
  },
  getRightAnswer(){//записываем все правильные ответы 
     for (let k = 0; k < question.length; k++) {
       this.newRightAnswer.push(this.question[k].rightAnswer);
      };
    },
  };

newGame.run();//запуск игры

