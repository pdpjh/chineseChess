class Qi {
  constructor(ele, space, camp) {  /* camp阵营 红色为0  黑色为1 */
    this.ele = ele  //棋子的dom对象
    this.x = parseInt(ele.getAttribute('x') / 10)
    this.y = parseInt(ele.getAttribute('y') / 10)
    this.space = space //棋子分布空间数组
    this.camp = camp //阵营
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
    this.name = '车'
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
    this.name = '象'

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
    this.name = '马'

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
    this.name = '士'

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
    this.name = '将'

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
    this.name = '炮'

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
    this.name = '兵'

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
  'red-bing': 1,
  1: 'red-bing',
  'red-pao': 2,
  2: 'red-pao',
  'red-ju': 3,
  3: 'red-ju',
  'red-ma': 4,
  4: 'red-ma',
  'red-xiang': 5,
  5: 'red-xiang',
  'red-shi': 6,
  6: 'red-shi',
  'red-jiang': 7,
  7: 'red-jiang',
  'blue-bing': 8,
  8: 'blue-bing',
  'blue-pao': 9,
  9: 'blue-pao',
  'blue-ju': 10,
  10: 'blue-ju',
  'blue-ma': 11,
  11: 'blue-ma',
  'blue-xiang': 12,
  12: 'blue-xiang',
  'blue-shi': 13,
  13: 'blue-shi',
  'blue-jiang': 14,
  14: 'blue-jiang'
}

class GameCtr {
  constructor() {
    this.msgEle = document.getElementById('msg')
    this.qiAll = Array.from(document.getElementsByClassName('qi'))
    this.currentQi = null // 当前操作棋子对象 
    this.currentCamp = 0 // camp阵营 红色为0  黑色为1  当前操作阵营
    this.space = new Array(9) //棋子空间数组
    for (let i = 0; i < this.space.length; i++) {
      this.space[i] = new Array(9).fill(0)
    }
    //初始期盼布局
    this.fixedSpace = [
      [qiE['blue-ju'], qiE['blue-ma'], qiE['blue-xiang'], qiE['blue-shi'], qiE['blue-jiang'], qiE['blue-jiang'], qiE['blue-xiang'], qiE['blue-ma'], qiE['blue-ju']],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, qiE['blue-pao'], 0, 0, 0, 0, 0, qiE['blue-pao'], 0],
      [qiE['blue-bing'], 0, qiE['blue-bing'], 0, qiE['blue-bing'], 0, qiE['blue-bing'], 0, qiE['blue-bing']],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [qiE['red-bing'], 0, qiE['red-bing'], 0, qiE['red-bing'], 0, qiE['red-bing'], 0, qiE['red-bing']],
      [0, qiE['red-pao'], 0, 0, 0, 0, 0, qiE['red-pao'], 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [qiE['red-ju'], qiE['red-ma'], qiE['red-xiang'], qiE['red-shi'], qiE['red-jiang'], qiE['red-jiang'], qiE['red-xiang'], qiE['red-ma'], qiE['red-ju']],
    ]

    this.addMsg('红方回合')

    this.addEvent()
  }

  addEvent () {
    let self = this
    self.qiAll.forEach((ele) => {
      if (ele.classList.toString() !== 'qi') {
        const x = ele.getAttribute('x') / 10
        const y = ele.getAttribute('y') / 10
        switch (this.fixedSpace[y][x]) {/* camp阵营 红色为0  黑色为1 */
          case qiE["blue-bing"]:
            self.space[x][y] = new Bing(ele, self.space, 1)
            break;
          case qiE["blue-pao"]:
            self.space[x][y] = new Pao(ele, self.space, 1)
            break;
          case qiE["blue-ju"]:
            self.space[x][y] = new Ju(ele, self.space, 1)
            break;
          case qiE["blue-ma"]:
            self.space[x][y] = new Ma(ele, self.space, 1)
            break;
          case qiE["blue-xiang"]:
            self.space[x][y] = new Xiang(ele, self.space, 1)
            break;
          case qiE["blue-shi"]:
            self.space[x][y] = new Shi(ele, self.space, 1)
            break;
          case qiE["blue-jiang"]:
            self.space[x][y] = new Jiang(ele, self.space, 1)
            break;
          case qiE["red-bing"]:
            self.space[x][y] = new Bing(ele, self.space, 0)
            break;
          case qiE["red-pao"]:
            self.space[x][y] = new Pao(ele, self.space, 0)
            break;
          case qiE["red-ju"]:
            self.space[x][y] = new Ju(ele, self.space, 0)
            break;
          case qiE["red-ma"]:
            self.space[x][y] = new Ma(ele, self.space, 0)
            break;
          case qiE["red-xiang"]:
            self.space[x][y] = new Xiang(ele, self.space, 0)
            break;
          case qiE["red-shi"]:
            self.space[x][y] = new Shi(ele, self.space, 0)
            break;
          case qiE["red-jiang"]:
            self.space[x][y] = new Jiang(ele, self.space, 0)
            break;
        }
        ele.addEventListener('click', (e) => {
          const targetQi = self.space[e.target.getAttribute('x') / 10][e.target.getAttribute('y') / 10]
          if (self.currentQi === null) {
            if (self.currentCamp === targetQi.camp) {
              self.currentQi = targetQi
              targetQi.ele.classList.add('selected')
            }
          } else if (self.currentCamp === targetQi.camp) {
            self.currentQi.ele.classList.remove('selected')
            self.currentQi = targetQi
            targetQi.ele.classList.add('selected')
          } else if (self.currentCamp !== targetQi.camp) {
            if (self.currentQi.canMove(targetQi.x, targetQi.y)) {
              let msg = ''
              if (self.currentQi.camp === 0) {
                msg += '红棋：' + self.currentQi.name + ' (' + self.currentQi.x + ',' + self.currentQi.x + ') 吃 黑棋: ' + targetQi.name + '(' + targetQi.x + ',' + targetQi.y + ')'
              } else {
                msg += '黑棋：' + self.currentQi.name + ' (' + self.currentQi.x + ',' + self.currentQi.x + ') 吃 红棋: ' + targetQi.name + '(' + targetQi.x + ',' + targetQi.y + ')'
              }
              self.addMsg(msg)

              if (targetQi.name === '将') {
                if (targetQi.camp === 0) {
                  msg = '红方失败'
                } else {
                  msg = '黑方失败'
                }
                self.addMsg(msg)
                if (confirm('结束!' + self.getMsg()) + '是否重新开始？') {
                  window.location.href = window.location.href
                }
              }
              self.currentQi.ele.classList.remove('selected')
              self.currentQi.move(targetQi.x, targetQi.y)
              self.currentQi = null
              self.changeCamp()
            }
          }
        })
      } else {
        ele.addEventListener('click', (e) => {
          if (self.currentQi) {
            if (self.currentQi.canMove(e.target.getAttribute('x') / 10, e.target.getAttribute('y') / 10)) {
              let msg = ''
              if (self.currentQi.camp === 0) {
                msg += '红棋：' + self.currentQi.name + ' (' + self.currentQi.x + ',' + self.currentQi.x + ')=>'
              } else {
                msg += '黑棋：' + self.currentQi.name + ' (' + self.currentQi.x + ',' + self.currentQi.x + ')=>'
              }
              self.currentQi.move(e.target.getAttribute('x') / 10, e.target.getAttribute('y') / 10)
              if (self.currentQi.camp === 0) {
                msg += self.currentQi.name + ' (' + self.currentQi.x + ',' + self.currentQi.x + ')'
              } else {
                msg += self.currentQi.name + ' (' + self.currentQi.x + ',' + self.currentQi.x + ')'
              }
              self.currentQi.ele.classList.remove('selected')
              self.currentQi = null
              self.addMsg(msg)
              self.changeCamp()
            }
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
  }
  changeCamp () {
    this.currentCamp === 0 ? this.currentCamp = 1 : this.currentCamp = 0
    if (this.currentCamp === 0) {
      this.addMsg('红方回合')
    } else {
      this.addMsg('黑方回合')
    }

  }
  addMsg (msg) {
    this.msgEle.innerHTML = this.msgEle.innerHTML + "<br> " + msg
  }
  getMsg () {
    return this.msgEle.innerText
  }
}



c = new GameCtr()





