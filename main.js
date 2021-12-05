class Qi {
  constructor(ele, space, camp) {  /* camp阵营 红色为0  黑色为1 */
    this.ele = ele
    this.x = parseInt(ele.getAttribute('x') / 10)
    this.y = parseInt(ele.getAttribute('y') / 10)
    this.space = space
    this.camp = camp
  }
  /* x,y是以space数组的坐标 */
  /* x，y将要移动位置  */
  move (x, y) {
    this.space[this.x][this.y] = 0
    if (this.space[x][y] !== 0) {
      this.space[x][y].remove()
    }
    this.ele.setAttribute('x', x * 10)
    this.ele.setAttribute('y', y * 10)
    this.x = x
    this.y = y
    this.space[x][y] = this
  }
  /*
    x,y将要移动位置 
   */
  canMove (x, y) {

  }
  /* 移动需要的固定判断方法 */
  canMoveFixed (x, y) {
    //确保x,y为数字
    if (!(Number.isInteger(x) && Number.isInteger(y))) {
      return false
    }
    //确保不是自身位置
    if (this.x === x && this.y === y) {
      return false
    }
    //确定目标位置是可吃的棋子或无棋子
    if (!this.canEat(x, y)) {
      return false
    }
    return true
  }
  /*
    x,y将要移动位置 
   */
  canEat (x, y) {
    if (this.space[x][y].camp === this.camp) {
      return false
    } else {
      return true
    }
  }
  remove () {
    this.ele.remove()
    this.space[this.x][this.y] = 0
  }
}

class Ju extends Qi {
  constructor(ele, space, camp) {  /* camp阵营 红色为0  黑色为1 */
    super(ele, space, camp)
  }
  canMove (x, y) {
    if (!this.canMoveFixed(x, y)) {
      return false
    }
    let min
    let max
    if (this.x === x) {
      if (this.y < y) { min = this.y, max = y } else { min = y, max = this.y }
      min++
      for (; min < max; min++) {
        if (this.space[x][min] !== 0) {
          return false
        }
      }
      return true
    } else if (this.y === y) {
      if (this.x < x) { min = this.x, max = x } else { min = x, max = this.x }
      min++
      for (; min < max; min++) {
        if (this.space[min][y] !== 0) {
          return false
        }
      }
      return true
    }
    else {
      return false
    }
  }
}

class Xiang extends Qi {
  constructor(ele, space, camp) {  /* camp阵营 红色为0  黑色为1 */
    super(ele, space, camp)
  }
  canMove (x, y) {
    if (!this.canMoveFixed(x, y)) {
      return false
    }

    //象不可过界  红色为0  黑色为1 
    if (this.camp === 0 && y < 5) {
      return false
    } else if (this.camp === 1 && y > 4) {
      return false
    }



    //判断目标位置是否为象的可移动位置
    if (Math.abs(this.x - x) === 2 && Math.abs(this.y - y) === 2) {
      if (this.x - x < 0 && this.y - y < 0) {
        if (this.space[this.x + 1][this.y + 1] === 0) {
          return true
        }
      } else if (this.x - x < 0 && this.y - y > 0) {
        if (this.space[this.x + 1][this.y - 1] === 0) {
          return true
        }
      } else if (this.x - x > 0 && this.y - y < 0) {
        if (this.space[this.x - 1][this.y + 1] === 0) {
          return true
        }
      } else if (this.x - x > 0 && this.y - y > 0) {
        if (this.space[this.x - 1][this.y - 1] === 0) {
          return true
        }
      }
    }
    return false

  }
}

class Ma extends Qi {
  constructor(ele, space, camp) {  /* camp阵营 红色为0  黑色为1 */
    super(ele, space, camp)
  }
  canMove (x, y) {
    if (!this.canMoveFixed(x, y)) {
      return false
    }

    //判断目标位置是否为马的可移动位置
    if (this.x + 2 === x && Math.abs(this.y - y) === 1 && this.space[this.x + 1][this.y] === 0) {
      return true
    } else if (this.x - 2 === x && Math.abs(this.y - y) === 1 && this.space[this.x - 1][this.y] === 0) {
      return true
    } else if (this.y + 2 === y && Math.abs(this.x - x) === 1 && this.space[this.x][this.y + 1] === 0) {
      return true
    } else if (this.y - 2 === y && Math.abs(this.x - x) === 1 && this.space[this.x][this.y + -1] === 0) {
      return true
    }
    return false

  }
}

class Shi extends Qi {
  constructor(ele, space, camp) {  /* camp阵营 红色为0  黑色为1 */
    super(ele, space, camp)
  }
  canMove (x, y) {
    if (!this.canMoveFixed(x, y)) {
      return false
    }

    //判断目标位置是否为士的可移动位置  
    if (this.camp === 0 && x >= 3 && x <= 5 && y >= 7 && y <= 9 && Math.abs(this.x - x) === 1 && Math.abs(this.y - y) === 1) { //(3,9) (5,7)
      return true
    } else if (this.camp === 1 && x >= 3 && x <= 5 && y >= 0 && y <= 2 && Math.abs(this.x - x) === 1 && Math.abs(this.y - y) === 1) { // (3,0) (5,2)
      return true
    }
    return false
  }

}
class Jiang extends Qi {
  constructor(ele, space, camp) {  /* camp阵营 红色为0  黑色为1 */
    super(ele, space, camp)
  }
  canMove (x, y) {
    if (!this.canMoveFixed(x, y)) {
      return false
    }


    //判断目标位置是否为士的可移动位置  
    if (this.camp === 0 && x >= 3 && x <= 5 && y >= 7 && y <= 9 && (Math.abs(this.x - x) + Math.abs(this.y - y)) === 1) { //(3,9) (5,7)
      return true
    } else if (this.camp === 1 && x >= 3 && x <= 5 && y >= 0 && y <= 2 && (Math.abs(this.x - x) + Math.abs(this.y - y)) === 1) { // (3,0) (5,2)
      return true
    }
    return false
  }

}


class Pao extends Qi {
  constructor(ele, space, camp) {  /* camp阵营 红色为0  黑色为1 */
    super(ele, space, camp)
  }
  canMove (x, y) {
    if (!this.canMoveFixed(x, y)) {
      return false
    }


    //判断目标位置是否为跑的可移动位置  
    //只是移动时与车类似 判断目标地点无子
    let min
    let max
    if (this.space[x][y] === 0) {
      if (this.x === x) {
        if (this.y < y) { min = this.y, max = y } else { min = y, max = this.y }
        min++
        for (; min < max; min++) {
          if (this.space[x][min] !== 0) {
            return false
          }
        }
        return true
      } else if (this.y === y) {
        if (this.x < x) { min = this.x, max = x } else { min = x, max = this.x }
        min++
        for (; min < max; min++) {
          if (this.space[min][y] !== 0) {
            return false
          }
        }
        return true
      }
    } else {  //判断目标地点有子
      let num = 0
      if (this.x === x) {
        if (this.y < y) { min = this.y, max = y } else { min = y, max = this.y }
        min++
        for (; min < max; min++) {
          if (this.space[x][min] !== 0) {
            num++
          }
        }
        if (num === 1) {
          return true
        }
      } else if (this.y === y) {
        if (this.x < x) { min = this.x, max = x } else { min = x, max = this.x }
        min++
        for (; min < max; min++) {
          if (this.space[min][y] !== 0) {
            num++
          }
        }
        if (num === 1) {
          return true
        }
      }
    }
    return false
  }
}

class Bing extends Qi {

  constructor(ele, space, camp) {  /* camp阵营 红色为0  黑色为1 */
    super(ele, space, camp)
  }
  canMove (x, y) {
    if (!this.canMoveFixed(x, y)) {
      return false
    }

    //判断目标位置是否为兵的可移动位置  
    if (this.camp === 0) {
      if (y > 4 && y - this.y === -1 && this.x === x) {
        return true
      } else if (y <= 4 && y - this.y >= -1 && (Math.abs(this.x - x) + Math.abs(this.y - y)) === 1) {
        return true
      }
    } else if (this.camp === 1) {
      if (y < 5 && y - this.y === 1 && this.x === x) {
        return true
      } else if (y >= 5 && y - this.y <= 1 && (Math.abs(this.x - x) + Math.abs(this.y - y)) === 1) {
        return true
      }
    }
    return false
  }


}













const qiE = {
  qi: 0,
  0: 'qi',
  redbing: 1,
  1: 'redbing',
  redpao: 2,
  2: 'redpao',
  redju: 3,
  3: 'redju',
  redma: 4,
  4: 'redma',
  redxiang: 5,
  5: 'redxiang',
  redshi: 6,
  6: 'redshi',
  redjiang: 7,
  7: 'redjiang',
  bluebing: 8,
  8: 'bluebing',
  bluepao: 9,
  9: 'bluepao',
  blueju: 10,
  10: 'blueju',
  bluema: 11,
  11: 'bluema',
  bluexiang: 12,
  12: 'bluexiang',
  blueshi: 13,
  13: 'blueshi',
  bluejiang: 14,
  14: 'bluejiang'
}
space = [
  [qiE.blueju, qiE.bluema, qiE.bluexiang, qiE.blueshi, qiE.bluejiang, qiE.blueshi, qiE.bluexiang, qiE.bluema, qiE.blueju],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, qiE.bluepao, 0, 0, 0, 0, 0, qiE.bluepao, 0],
  [qiE.bluebing, 0, qiE.bluebing, 0, qiE.bluebing, 0, qiE.bluebing, 0, qiE.bluebing],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [qiE.redbing, 0, qiE.redbing, 0, qiE.redbing, 0, qiE.redbing, 0, qiE.redbing],
  [0, qiE.redpao, 0, 0, 0, 0, 0, qiE.redpao, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [qiE.redju, qiE.redma, qiE.redxiang, qiE.redshi, qiE.redjiang, qiE.redshi, qiE.redxiang, qiE.redma, qiE.redju]
]
const spaceQi = new Array(9)
for (let i = 0; i < spaceQi.length; i++) {
  spaceQi[i] = new Array(9).fill(0)
}

const game = document.getElementsByClassName('game')[0]
/* for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 10; j++) {
    let qizi = document.createElement('image')
    qizi.setAttribute('x', i * 10)
    qizi.setAttribute('y', j * 10)
    qizi.setAttribute('width', 10)
    qizi.setAttribute('height', 10)

    qizi.setAttribute('opacity', 0)
    qizi.setAttribute('class', 'qi')
    game.insertAdjacentElement('afterbegin', qizi)

  }
} */

const qiAll = Array.from(document.getElementsByClassName('qi'))
let current = null
qiAll.forEach((ele) => {
  if (ele.classList.toString() !== 'qi') {
    const x = ele.getAttribute('x') / 10
    const y = ele.getAttribute('y') / 10

    if (x == 0 & y == 3) {
      spaceQi[x][y] = new Bing(ele, spaceQi, 1)
      allx = spaceQi[x][y]
    } else if (x == 1 & y == 9) {
      spaceQi[x][y] = new Ju(ele, spaceQi, 0)
    } else {
      spaceQi[x][y] = new Ju(ele, spaceQi, 1)

    }
    ele.addEventListener('click', () => {
      qiAll.forEach((el) => {
        el.classList.remove('selected')
      })
      if (current === ele) {
        ele.classList.remove('selected')
        current = null
      } else {
        current = ele
        ele.classList.add('selected')
      }
    })
  } else {
    ele.addEventListener('click', (e) => {
      if (current) {
        console.log(e.target);
        current.setAttribute('x', e.target.getAttribute('x'))
        current.setAttribute('y', e.target.getAttribute('y'))
        current.classList.remove('selected')
        current = null
      }
    })
    ele.addEventListener('mouseenter', () => {
      ele.setAttribute('opacity', 0.5)
    })
    ele.addEventListener('mouseleave', () => {
      ele.setAttribute('opacity', 0)
    })
  }

})


allx