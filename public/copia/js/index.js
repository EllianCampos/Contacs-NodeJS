const customWindow_users = document.getElementById('customWindow_users')

addEventListener('load', () => {
    


})

/*
    Boton de salir
*/
const btnSalir = Array.from(document.querySelectorAll('.btnSalir'))
for (const btn of btnSalir) {
    btn.addEventListener('click', () => {
        location.reload()
    })
}

// Boton elegir cuenta
const form_login_showUsers = Array.from(document.querySelectorAll('.form_login_showUsers'))
for (const btnSearch of form_login_showUsers){
    btnSearch.addEventListener('click', async () => {
        // Mostrar la ventana   
        customWindow_searchAccount.classList.remove('hide')
    
        /*
            Cargar los usuarios en la tabla
        */
    
        // Limpiar la tabla 
        while (customWindow_users.hasChildNodes()) {
            customWindow_users.removeChild(customWindow_users.firstChild);
        }
    
        // Obtener el array de usuarios
        // let array_users = JSON.parse(localStorage.getItem('k_users'))

        fetch('/auth')
        .then(res=>res.json())
        .then(res=>{
            // Recorrer el array de usuarios y agregarlos a la tabla
            for (const user of res) {
                customWindow_users.innerHTML += 
                `<div class="users">${user.name_user}</div>` 
            } 
        })
    
        
        
    
        /* 
            Funcionalidad de seleccionar celdas
        */
        
        // Crear un array con todos los elementos que contengan la clase 
        // .row, es decir todas la filas de la tabla
        const users = Array.from(document.querySelectorAll('.users'))
    
        // recorrer todas la filas y darles el evento de click
        for (const user of users) {
            user.addEventListener('click', () => {
                /*
                    Este codigo será para cada una de las filas
                */
    
                // Determinar el indice de la persona 
                // en el array de personas
                const index = row.rowIndex
    
                // Obtener el nombre de usuario basado en el indice
                // que tiene en la tabla
                let array_users = JSON.parse(localStorage.getItem('k_users'))
                const user = array_users[index-1]
    
                // Ocultar la ventana
                customWindow_searchAccount.classList.add('hide')
                
                // Colocar el nombre de usuario en el cuadro de texto
                form_login_account.value = user.name
                form_recoverPassword_user.value = user.name
    
                // Limpiar la tabla
                while (customWindow_searchAccount_tableBody.hasChildNodes()) {
                    customWindow_searchAccount_tableBody.removeChild(customWindow_searchAccount_tableBody.firstChild);
                }
            })
        }
    })
}