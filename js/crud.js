$(document).ready(function() {
    obtenerTareas();
    let modificar = false;

    function obtenerTareas() {
        //alert("pruebas");
        $.ajax({ //invocamos a ajax
            url: 'listar.php',
            type: "GET",
            success: function(response) {
                const task = JSON.parse(response)
                let template = '';
                task.forEach(task => {
                    template += `
                    <tr taskId="${task.id}">
                        <td>${task.id}</td>
                        <td>${task.name}</td>
                        <td>${task.last_name}</td>
                        <td> <button class="task-item btn btn-primary" data-toggle="modal" data-target="#modal_registro">Edit</button></td>
                        <td> <button class="task-delete btn btn-danger" data-toggle="modal" data-target="#modal_delete">Delete</button></td>
                    </tr>
                    `
                });
                $('#tasks').html(template); //obtenemos el task
            }
        });
    }

    // search key type event
    $('#search').keyup(function() {
        if ($('#search').val()) {
            let search = $('#search').val();
            $.ajax({
                url: 'buscar.php',
                data: { search },
                type: 'POST',
                success: function(response) {
                    if (!response.error) {
                        let tasks = JSON.parse(response);
                        let template = '';
                        tasks.forEach(task => {
                            template += `
                     <li><a href="#" class="task-item">${task.name}</a></li>
                    `
                        });

                        $('#container').html(template);
                    }
                }
            })
        }
    });
    $('#task-form').submit(e => {

        const datos = {
            name: $('#name').val(),
            last_name: $('#last_name').val(),
            id: $('#taskId').val(),
        };

        const url = modificar === false ? 'insertar.php' : 'modificar.php';

        $.post(url, datos, (response) => {

            $('#task-form').trigger('reset');
            obtenerTareas();
        });
    }); //invocamos obten el control de todo el formularios




    $(document).on('click', '.task-item', (e) => {
        const element = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(element).attr('taskId');
        $.post('getTareas.php', { id }, (response) => {
            const task = JSON.parse(response);
            $('#name').val(task.name);
            $('#last_name').val(task.last_name);
            $('#taskId').val(task.id);
            modificar = true;
        });
        e.preventDefault();
    });



    // Delete a Single Task
    $(document).on('click', '.task-delete', (e) => {
        if (confirm('Desea eliminar el registros')) {
            const elemento = $(this)[0].activeElement.parentElement.parentElement;
            const id = $(elemento).attr('taskId');
            $.post('delete.php', { id }, (response) => {

                obtenerTareas();
            });
        }
    });



});