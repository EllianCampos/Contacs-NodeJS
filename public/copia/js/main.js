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

const getData = () =>{
    while (container_contacts.hasChildNodes()){
        container_contacts.removeChild(container_contacts.firstChild)
    }

    fetch('http://192.168.0.12:1000/contacts')
    .then(res=>res.ok ? Promise.resolve(res) : Promise.reject(res))
    .then(res=>res.json())
    .then(res=>{
        for (const contact of res){
            const contact_box = document.createElement('div')
            const name = document.createElement('h2')
            const phone = document.createElement('p')
            const btnUpdate = document.createElement('button')
            const btnDelete = document.createElement('button')

            name.textContent = contact.name_contact
            phone.textContent = contact.phone_contact

            contact_box.classList.add('contact')

            btnUpdate.textContent = 'Edit'
            btnUpdate.setAttribute("id", contact.id_contact)
            btnUpdate.classList.add('button_update')

            btnDelete.textContent = 'Delete'
            btnDelete.setAttribute("id", contact.id_contact);
            btnDelete.classList.add('button_delete')
            

            contact_box.appendChild(name)
            contact_box.appendChild(phone)
            contact_box.appendChild(btnUpdate)
            contact_box.appendChild(btnDelete)

            container_contacts.appendChild(contact_box)
        }
    })
    .then(res=>{
        const button_update = Array.from(document.querySelectorAll('.button_update'))
        for (const button of button_update){
            button.addEventListener('click', () => {
                // Mostrar la ventana
                customWindow_update.classList.remove('hide')
                form_update.reset()
                form_update.name = button.id

                // Cargar los datos
                form_update_name.value = document.getElementById(button.id).parentElement.childNodes[0].textContent
                form_update_phone.value =  document.getElementById(button.id).parentElement.childNodes[1].textContent
            })
        }
    })
    .then(res=>{
        const button_delete = Array.from(document.querySelectorAll('.button_delete'))
        for (const button of button_delete){
            button.addEventListener('click', () => {
                // alert(button.id)
                fetch('http://192.168.0.12:1000/contacts/'+button.id,{
                    method:'DELETE'
                })
                .then(res=>{
                    // alert('Se ha eliminado un contacto')
                    getData()
                })
            })
        }
    })
 
    
}

addEventListener('load', () => {
    getData()
})

button_add.addEventListener('click', () => {
    customWindow_add.classList.remove('hide')
    form_add.reset()
})

form_add.addEventListener('submit', (e) => {
    e.preventDefault()

    const newContact = {
        "name": form_add_name.value,
        "phone": form_add_phone.value
    }

    fetch('http://192.168.0.12:1000/contacts',{
        method:'POST',
        body:JSON.stringify(newContact),
        headers:{
            "Content-type": "application/json"
        }
    })
    .then(res=>res.json)
    .then(res=>{
        // console.log(res)
        // alert('El contacto se agrego correctamente')
        customWindow_add.classList.add('hide')
        getData()
    })
})

form_update.addEventListener('submit', (e) => {
    e.preventDefault()

    fetch('http://192.168.0.12:1000/contacts/'+form_update.name,{
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
        getData()
    })
})

