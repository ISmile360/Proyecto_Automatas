$(document).ready(function() {
    // Botón para convertir el código
    $('#convert-btn').click(function() {
        var jsCode = $('#js-code').val();

        // Validar sintaxis del código JavaScript
        try {
            // Intentamos evaluar el código. Si hay un error de sintaxis, saltará a catch.
            new Function(jsCode);

            // Si el código es válido, convertirlo a jQuery
            var jqueryCode = convertJStoJQuery(jsCode);
            $('#jquery-output').val(jqueryCode);

            // Mostrar un mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: 'Conversión exitosa',
                text: 'El código se ha convertido correctamente a jQuery.'
            });
        } catch (error) {
            // Si ocurre un error de sintaxis, lo capturamos aquí
            Swal.fire({
                icon: 'error',
                title: 'Error de sintaxis',
                text: 'Error en el código JavaScript: ' + error.message
            });
        }
    });

    // Función para convertir JS a jQuery de manera dinámica
    function convertJStoJQuery(jsCode) {
        // 1. Convertir manejo de eventos: addEventListener a .on()
        jsCode = jsCode.replace(/addEventListener\(['"](.+?)['"],/g, '.on("$1",');

        // 2. Convertir selecciones de elementos:
        jsCode = jsCode.replace(/document\.getElementById\(['"](.+?)['"]\)/g, '$(\'#$1\')');
        jsCode = jsCode.replace(/document\.querySelector\(['"](.+?)['"]\)/g, '$(\'$1\')');
        jsCode = jsCode.replace(/document\.getElementsByClassName\(['"](.+?)['"]\)/g, '$(\'.$1\')');
        
        // 3. Convertir manipulaciones de contenido:
        jsCode = jsCode.replace(/document\.querySelector\(['"](.+?)['"]\)\.innerHTML\s*=\s*(['"].*?['"])/g, '$(\'$1\').html($2)');

        // 4. Convertir manipulación de estilos:
        jsCode = jsCode.replace(/document\.getElementById\(['"](.+?)['"]\)\.style\.display\s*=\s*['"]none['"]/g, '$(\'#$1\').hide()');
        jsCode = jsCode.replace(/document\.getElementById\(['"](.+?)['"]\)\.style\.display\s*=\s*['"]block['"]/g, '$(\'#$1\').show()');
        
        // 5. Convertir otros casos:
        jsCode = jsCode.replace(/document\.querySelectorAll\(['"](.+?)['"]\)/g, '$$(\'$1\')'); // Para querySelectorAll (si se necesita)

        // 6. Convertir manipulación de clases:
        jsCode = jsCode.replace(/document\.getElementById\(['"](.+?)['"]\)\.classList\.add\(['"](.+?)['"]\)/g, '$(\'#$1\').addClass($2)');
        jsCode = jsCode.replace(/document\.getElementById\(['"](.+?)['"]\)\.classList\.remove\(['"](.+?)['"]\)/g, '$(\'#$1\').removeClass($2)');
        
        // 7. Convertir manipulación de atributos:
        jsCode = jsCode.replace(/document\.getElementById\(['"](.+?)['"]\)\.setAttribute\(['"](.+?)['"],\s*['"](.*?)['"]\)/g, '$(\'#$1\').attr($2, $3)');
        
        return jsCode;
    }

    // Limpiar los campos
    $('#clear-btn').click(function() {
        $('#js-code').val('');
        $('#jquery-output').val('');

        // Mostrar un mensaje de confirmación
        Swal.fire({
            icon: 'info',
            title: 'Campos limpiados',
            text: 'Los campos se han limpiado correctamente.'
        });
    });

    // Función para copiar al portapapeles
    $('#copy-btn').click(function() {
        var copyText = document.getElementById("jquery-output");

        // Seleccionamos el texto del área de texto
        copyText.select();
        copyText.setSelectionRange(0, 99999); // Para dispositivos móviles

        // Copiamos el texto al portapapeles
        document.execCommand("copy");

        // Mostrar un mensaje de éxito
        Swal.fire({
            icon: 'success',
            title: 'Copiado',
            text: 'Código copiado al portapapeles!'
        });
    });
});