const container_contacts = document.getElementById('container_contacts')
const button_add = document.getElementById('button_add')

const customWindow_add = document.getElementById('customWindow_add')
const form_add = document.getElementById('form_add')
const form_add_name = document.getElementById('form_add_name')
const form_add_phone = document.getElementById('form_add_phone')

const customWindow_update = document.getElementById('customWindow_update')
const form_update = document.getElementById('form_update')
const form_update_name = document.getElementById('form_update_name')
const form_update_phone = document.getElementById('form_update_phone')


const button_update = Array.from(document.querySelectorAll('.button_update'))
for (const button of button_update){
    button.addEventListener('click', (e) => {
        // Mostrar la ventana
        customWindow_update.classList.remove('hide')
        form_update.reset()

        form_update.action = `/contacts/${e.target.parentElement.dataset.contact}`
        form_update.setAttribute('data-contact', e.target.parentElement.dataset.contact)
        console.log(e.target.parentElement.dataset.contact)

        // Cargar los datos
        form_update_name.value = button.parentElement.childNodes[0].textContent
        form_update_phone.value =  button.parentElement.childNodes[1].textContent
    })
}

const button_delete = Array.from(document.querySelectorAll('.button_delete'))
for (const button of button_delete) {
button.addEventListener('click', (e) => {
    console.log(e.target.parentElement.dataset.contact)
    fetch(`/home/contacts/${e.target.parentElement.dataset.contact}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(res => {
        location.reload()
    })
})
}

button_add.addEventListener('click', () => {
    customWindow_add.classList.remove('hide')
    form_add.reset()
})

form_update.addEventListener('submit', (e) => {
    e.preventDefault()

    fetch(`/home/contacts/${e.target.dataset.contact}`,{
        method:'PUT',
        body:JSON.stringify({
            "name": form_update_name.value,
            "phone": form_update_phone.value
        }),
        headers:{
            "Content-type": "application/json"
        }
    })
    .then(res=>{
        customWindow_update.classList.add('hide')
        location.reload()
    })
})
