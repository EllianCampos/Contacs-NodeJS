// Boton de salir
const btnSalir = Array.from(document.querySelectorAll('.btnSalir'))


const form_login_select_account = document.getElementById('form_login_select_account')
const customWindow_searchAccount = document.getElementById('customWindow_searchAccount')

const customWindow_createAccount = document.getElementById('customWindow_createAccount')
const form_createAccount = document.getElementById('form_createAccount')
const form_create_account = document.getElementById('form_create_account')
const form_create_password = document.getElementById('form_create_password')

/**
 * Ventana principal (login)
 */
const form_login = document.getElementById('form_login')
const form_login_account = document.getElementById('form_login_account')
const form_login_password = document.getElementById('form_login_password')
const form_login_seePassword = document.getElementById('form_login_seePassword' )
const form_login_button_recoverPassword = document.getElementById('form_login_button_recoverPassword')
const form_login_button_register = document.getElementById('form_login_button_register')
const form_login_showUsers = Array.from(document.querySelectorAll('.form_login_showUsers'))

addEventListener('load', () => {
    form_login.reset()
})

// Boton de salir
for (const btn of btnSalir) {
    btn.addEventListener('click', () => {
        location.reload()
    })
}

// Boton ver contraseña
form_login_seePassword.addEventListener('click', () => {
    if (form_login_password.type == 'password') {
        form_login_password.type = 'text'
        form_login_seePassword.src = 'assets/icons/VisibilityOFF.svg'
    }else {
        form_login_password.type = 'password'
        form_login_seePassword.src = 'assets/icons/VisibilityON.svg'
    }
})

form_login_select_account.addEventListener('click', () => {
    customWindow_searchAccount.classList.remove('hide')
})

// Evento selecionar cuenta
const users = Array.from(document.querySelectorAll('.user'))
for (const u of users) {
    u.addEventListener('click', () => {
        form_login_account.value = u.textContent
        form_login_account.setAttribute('data-id', u.dataset.id)
        customWindow_searchAccount.classList.add('hide')
    })
}

form_login.addEventListener('submit', (e) => {
    e.preventDefault()
    if (form_login_account.value == '') return alert('Selecciona una cuenta de usuario')
    if(form_login_password.value == '') return alert('Ingresa la contraseña')
    fetch('/singin',{
        method:'POST',
        body:JSON.stringify({
            "id":form_login_account.dataset.id,
            "username":form_login_account.value,
            "password":form_login_password.value
        }),
        headers:{
            "Content-type": "application/json"
        }
    })
    .then(res=>res.json())
    .then(res=>{
        // location.href = `/home/${token.token}`
        location.href = "/home"
    })
})

form_login_button_register.addEventListener('click', () => {
    customWindow_createAccount.classList.remove('hide')
})

form_createAccount.addEventListener('submit', (e) => {
    e.preventDefault()

    fetch('/singup',{
        method:'POST',
        body:JSON.stringify({
            "username":form_create_account.value,
            "password":form_create_password.value
        }),
        headers:{
            "Content-type": "application/json"
        }
    })
    .then(res=>res.json())
    .then(res=>{
        customWindow_createAccount.classList.add('hide')
    })
})