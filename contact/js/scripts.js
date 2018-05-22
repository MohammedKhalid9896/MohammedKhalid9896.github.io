function resizable(el) {
  const getX = e => e.clientX || e.touches[0].clientX

  const togglePressed = isActive => event => {
    if (state.pressed !== isActive) {
      state.pressed = isActive
      handle.classList.toggle('resizable-handle-active')
      state.x = isActive ? getX(event) : -1
    }
  }

  const move = event => {
    if (state.pressed) {
      const width = el.getBoundingClientRect().width
      const clientX = getX(event)
      const direction = state.x < clientX ? 1 : -1
      const diff = Math.abs(state.x - clientX) * direction
      el.style.cssText += `width: ${width + diff}px;`
      state.x = clientX
    }
  }

  const state = {
    pressed: false,
    x: -1
  }

  const handle = document.createElement('div')
  handle.classList.add('resizable-handle')
  handle.style.cssText += `
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    cursor: col-resize;
  `

  handle.addEventListener('mousedown', togglePressed(true))
  window.addEventListener('mouseup', togglePressed(false))
  window.addEventListener('mousemove', move)

  handle.addEventListener('touchstart', togglePressed(true))
  handle.addEventListener('touchend', togglePressed(false))
  handle.addEventListener('touchcancel', togglePressed(false))
  handle.addEventListener('touchmove', move)

  el.appendChild(handle)
}

const leftPanel = document.querySelector('.left')
resizable(leftPanel)

const reactiveCSSProps = createReactiveCSSProps({
  '--bg1': {
    reducer({ type, data }) {
      switch (type) {
        case 'bg1': return data.target.value
      }
    }
  },
  '--bg2': {
    reducer({ type, data }) {
      switch (type) {
        case 'bg2': return data.target.value
      }
    }
  },
  '--fg1': {
    reducer({ type, data }) {
      switch (type) {
        case 'fg1': return data.target.value
      }
    }
  },
  '--fg2': {
    reducer({ type, data }) {
      switch (type) {
        case 'fg2': return data.target.value
      }
    }
  }
})

;[ bg1, bg2, fg1, fg2 ].forEach(input => {
  input.addEventListener('change', event => {
    reactiveCSSProps.dispatch({ type: input.id, data: event })
  }) 
})