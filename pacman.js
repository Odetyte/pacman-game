const width = 28;
const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const gameOverDisplay = document.querySelector('#game-over')
const startButton = document.querySelector('#start')
let squares = []
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0
console.log("hi")
//28 * 28 = 784
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty

const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 3, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1,
  1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1,
  1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1,
  1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
  1, 1, 1, 3, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 3, 1, 1, 1,
  1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
  1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
  1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
]


//create board function

const createBoard = () => {
  //for loop
  for (let i = 0; i < layout.length; i++) {
    //create square with .createElement

    const square = document.createElement('div')
    //append square to div
    grid.appendChild(square)
    //push the square into square arrays
    squares.push(square)
    // console.log(squares)
    if (layout[i] === 0) {
      squares[i].classList.add('pac-dot')
    } else if (layout[i] === 1) {
      squares[i].classList.add('wall')
    } else if (layout[i] === 2) {
      squares[i].classList.add('ghost-lair')
    } else if (layout[i] === 3) {
      squares[i].classList.add('power')
      squares[i].innerHTML = '🍋'
      // power.forEach(element => powerPower.innerHTML = element)

    } else if (layout[i] === 4) {
      squares[i].classList.add('path')
    }
  }
}

createBoard()

//start button function


// up key - 38
// left - 37
// right - 39
// down -40

//starting position of Pacman

let pacmanCurrentIndex = 490

squares[pacmanCurrentIndex].classList.add('pacman')
// squares[pacmanCurrentIndex].innerHTML = '🌕'

//packam moving
// move left: 490 - 1
// as long as: 490 % 28 !== 0
// move right: 490 + 1
// as long as: 490 & 28 < 28 - 1
// move down: 490 + 28
// as long as: 490 + 28 < 28 * 28
// move up: 490 - 28
// as long as: 490 - 28 >= 0

const control = (e) => {
  squares[pacmanCurrentIndex].classList.remove('pacman')
  // if (e.keyCode === 40) {
  //   console.log("pressed down")
  // } else if (e.keyCode === 38) {
  //   console.log("pressed up")
  // } else if (e.keyCode === 37) {
  //   console.log("pressed left")
  // } else if (e.keyCode === 39) {
  //   console.log("pressed right")
  // }
  //also could be made with switch statement
  switch (e.keyCode) {
    case 40:
      console.log('pressed down')
      if (
        //preventing going trough the wall&ghosts
        !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
        !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
        pacmanCurrentIndex + width < width * width
      )
        pacmanCurrentIndex += width
      break
    case 39:
      console.log('pressed right')
      if (
        !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
        !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
        pacmanCurrentIndex % width < width - 1
      )
        pacmanCurrentIndex += 1
      if (pacmanCurrentIndex === 391) {
        pacmanCurrentIndex = 364
      }
      break
    case 38:
      console.log('pressed up')
      if (
        !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
        !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
        pacmanCurrentIndex - width >= 0
      )
        pacmanCurrentIndex -= width
      break
    case 37:
      console.log('pressed left')
      if (
        !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
        !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
        pacmanCurrentIndex % width !== 0
      )
        pacmanCurrentIndex -= 1
      if (pacmanCurrentIndex === 364) {
        pacmanCurrentIndex = 391
      }
      break
  }
  squares[pacmanCurrentIndex].classList.add('pacman')
  dotToEat()
  powerPelletEaten()
  checkForWin()
  checkForGameOver()
}
document.addEventListener('keyup', control)

const dotToEat = () => {
  if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
    squares[pacmanCurrentIndex].classList.remove('pac-dot')
    score += 10
    scoreDisplay.innerHTML = score
  }
}

const powerPelletEaten = () => {
  //if square pacman is in contains a power pellet
  if (squares[pacmanCurrentIndex].classList.contains('power')) {
    //removing class of power-pellet from square
    squares[pacmanCurrentIndex].textContent = ''
    //add a score of 10
    score += 100
    console.log(score)
    //change each of the four ghosts to isScared
    ghosts.forEach(ghost => ghost.isScared = true)
    //use setTimeout to unscare ghosts after 10
    setTimeout(unScareGhosts, 10000)
  }
}

const unScareGhosts = () => {
  ghosts.forEach(ghost => ghost.isScared = false)
}


class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className
    this.startIndex = startIndex
    this.speed = speed
    this.currentIndex = startIndex
    this.isScared = false
    this.timerId = NaN
  }
}

const ghosts = [
  new Ghost('blinky', 348, 250),
  new Ghost('pinky', 376, 400),
  new Ghost('inky', 351, 300),
  new Ghost('clyde', 379, 500)
]

//ghosts on the createGrid
// let ghostIndex1 = 348
// squares[ghostIndex1].classList.add('blinky')
// squares[ghostIndex1i].innerHTML = '👻'

// bb.innerHTML = '👻'
ghosts.forEach(ghost => {
  squares[ghost.currentIndex].classList.add(ghost.className)
  squares[ghost.currentIndex].classList.add('ghost')
})

//moving ghost


const moveGhost = (ghost) => {
  console.log('moved ghost')
  const directions = [-1, +1, -width, +width]
  let direction = directions[Math.floor(Math.random() * directions.length)]
  console.log(direction)
  //make ghost to rund around the grid
  ghost.timerId = setInterval(function() {
    //if the next square does NOT contain a wall and does not contain a ghost
    if (
      !squares[ghost.currentIndex + direction].classList.contains('wall') &&
      !squares[ghost.currentIndex + direction].classList.contains('ghost')
    ) {
      //remove any ghost
      squares[ghost.currentIndex].classList.remove(ghost.className)
      squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
      squares[ghost.currentIndex].textContent = ''
      // //add direction to current Index
      ghost.currentIndex += direction
      // //add ghost class
      squares[ghost.currentIndex].classList.add(ghost.className)
      squares[ghost.currentIndex].classList.add('ghost')
    } else direction = directions[Math.floor(Math.random() * directions.length)]

    //if the ghost is currently scared
    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add('scared-ghost')
      squares[ghost.currentIndex].innerHTML = '👻'
      // squares[ghost.currentIndex].innerHTML = '👻'
    }

    //if the ghost is current scared AND pacman is on it
    if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
      //remove classnames - ghost.className, 'ghost', 'scared-ghost'
      squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost')
      squares[ghost.currentIndex].textContent = ''
      // change ghosts currentIndex back to its startIndex
      ghost.currentIndex = ghost.startIndex
      //add a score of 100
      score += 200
      //re-add classnames of ghost.className and 'ghost' to the ghosts new
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    }
    checkForGameOver()
  }, ghost.speed)
}

ghosts.forEach(ghost => moveGhost(ghost))


//game over

//check for game over
const checkForGameOver = () => {
  //if the square pacman is in contains a ghost AND the square does NOT contain a scared ghost
  if (
    squares[pacmanCurrentIndex].classList.contains('ghost') &&
    !squares[pacmanCurrentIndex].classList.contains('scared-ghost')
  ) {
    //for each ghost - we need to stop it moving
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    //remove eventlistener from our control function
    document.removeEventListener('keyup', control)
    //tell user the game is over
    gameOverDisplay.innerHTML = 'take this 🍀 for the luck next time'
  }
}

//check for win


const checkForWin = () => {
  if (score === 1500) {
    //stop each ghost
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    //remove the eventListener for the control function
    document.removeEventListener('keyup', control)
    //tell our user we have won
    gameOverDisplay.innerHTML = 'Congratz you won 🎉'
  }
}

startButton.addEventListener('click', startGame)