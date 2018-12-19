document.addEventListener('DOMContentLoaded', () => {
  'use strict'

  const openMenu = document.querySelector('#open_menu')
  const menu = document.querySelector('#menu')
  const closeMenu = document.querySelector('#close_menu')

  openMenu.addEventListener('click', () => {
    menu.classList.add('shown')
  })
  closeMenu.addEventListener('click', () => {
    menu.classList.remove('shown')
  })
})