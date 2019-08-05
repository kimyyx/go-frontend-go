const BtnElm = document.getElementById('button')
const UA = navigator.userAgent
// console.log(UA)
document.querySelector('.button-en').innerText =
  UA.indexOf('Android') > -1
    ? 'Android'
    : UA.indexOf('Mac OS') > -1
    ? 'IOS'
    : 'Windows'

BtnElm.addEventListener('click', evt => {})
