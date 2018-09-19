let commandElem = document.getElementById('command')
let contentElem = document.getElementById('content')
let submitButtonElem = document.getElementById('submitButton')
let boxTodoElem = document.getElementById('boxTodo')
let boxOnprogressElem = document.getElementById('boxOnprogress')
let boxCompleteElem = document.getElementById('boxComplete')

var task = []
var tempId = 0
var idNext = 1

// submitButtonElem.onclick = enterCommand

render()

function enterCommand () {
  let commmandValue = commandElem.value
  let commands = commmandValue.split(' ')

  if (commands[0] == 'create') {
    var leftover = commmandValue.substring(commands[0].length+2, commmandValue.length-1)
    task.push({id: idNext, value: leftover, type: 'todo'})
    idNext++
  } else if (commands[0] == 'move') {
    var destination = commands[2]
    if (destination !== 'Progress' && destination !== 'Complete' && destination !== 'todo') {
      alert('Silahkan masukan tujuan ygn telah disediakan')
      return ;
    }
    var index = parseInt(commands[1])
    task.map((item, i) => {
      if (item.id === index) {
        item.type = destination
      } 
    })
  } else if (commands[0] == 'remove') {
    var index = parseInt(commands[1])
    task.map((item, i) => {
      if (item.id === index) {
        task.splice(i, 1)
      }
    })
  } else {
    alert('Command yg dimasukan salah')
  }
  render()
}

function render () {
  boxTodoElem.innerHTML = ''
  boxOnprogressElem.innerHTML = ''
  boxCompleteElem.innerHTML = ''

  task.map((item, index) => {
    var li = document.createElement('li')
    li.id = item.id
    li.textContent = `${item.id} ${item.value}`
    li.setAttribute('class', 'list')
    li.setAttribute('draggable', 'true')
    li.setAttribute('ondragstart', 'dragList(event)')
    if (item.type === 'todo') {
      boxTodoElem.appendChild(li)
    } else if (item.type === 'Progress') {
      boxOnprogressElem.appendChild(li)
    } else if (item.type === 'Complete') {
      boxCompleteElem.appendChild(li)
    }
  })
}

function allowDrop(event) {
  event.preventDefault()
}

function dragList (event) {
  console.log('id : ', event.target.id)
  tempId = parseInt(event.target.id)
}

function dropList (event) {
  if (event.target.id == 'Progress') {
    task.map((item, index) => {
      if (item.id === tempId) {
        task[index].type = 'Progress'
      }
    })
  } else if (event.target.id == 'Complete') {
    task.map((item, index) => {
      if (item.id === tempId) {
        task[index].type = 'Complete'
      }
    })
  } else if (event.target.id == 'todo') {
    task.map((item, index) => {
      if (item.id === tempId) {
        task[index].type = 'todo'
      }
    })
  }
  render()
  console.log('id : ', event.target.id)
}