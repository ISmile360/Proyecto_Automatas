$(document).ready(function() {
    // Función para mostrar mensajes con SweetAlert
    const mostrarAlerta = (icono, titulo, texto) => {
        Swal.fire({ icon: icono, title: titulo, text: texto });
    };

    // Función para convertir JS a jQuery de manera dinámica
    const convertirJStoJQuery = (codigoJS) => {
        const reemplazos = [
            { regex: /addEventListener\(['"](.+?)['"],/g, replacement: '.on("$1",'},
            { regex: /document\.getElementById\(['"](.+?)['"]\)/g, replacement: '$("$1")' },
            { regex: /document\.querySelector\(['"](.+?)['"]\)/g, replacement: '$("$1")' },
            { regex: /document\.getElementsByClassName\(['"](.+?)['"]\)/g, replacement: '$(".${1}")' },
            { regex: /document\.querySelector\(['"](.+?)['"]\)\.innerHTML\s*=\s*(['"].*?['"])/g, replacement: '$("$1").html($2)' },
            { regex: /document\.getElementById\(['"](.+?)['"]\)\.style\.display\s*=\s*['"]none['"]/g, replacement: '$("$1").hide()' },
            { regex: /document\.getElementById\(['"](.+?)['"]\)\.style\.display\s*=\s*['"]block['"]/g, replacement: '$("$1").show()' },
            { regex: /document\.querySelectorAll\(['"](.+?)['"]\)/g, replacement: '$("$1")' },
            { regex: /document\.getElementById\(['"](.+?)['"]\)\.classList\.add\(['"](.+?)['"]\)/g, replacement: '$("$1").addClass($2)' },
            { regex: /document\.getElementById\(['"](.+?)['"]\)\.classList\.remove\(['"](.+?)['"]\)/g, replacement: '$("$1").removeClass($2)' },
            { regex: /document\.getElementById\(['"](.+?)['"]\)\.setAttribute\(['"](.+?)['"],\s*['"](.*?)['"]\)/g, replacement: '$("$1").attr($2, $3)' }
        ];

        // Aplicar todos los reemplazos
        reemplazos.forEach(rep => {
            codigoJS = codigoJS.replace(rep.regex, rep.replacement);
        });

        return codigoJS;
    };

    // Botón para convertir el código
    $('#convert-btn').click(function() {
        const codigoJS = $('#js-code').val();

        try {
            // Validar sintaxis del código JavaScript
            new Function(codigoJS);
            
            // Convertir código JS a jQuery
            const codigoJQuery = convertirJStoJQuery(codigoJS);
            $('#jquery-output').val(codigoJQuery);

            mostrarAlerta('success', 'Conversión exitosa', 'El código se ha convertido correctamente a jQuery.');
        } catch (error) {
            mostrarAlerta('error', 'Error de sintaxis', `Error en el código JavaScript: ${error.message}`);
        }
    });

    // Limpiar los campos
    $('#clear-btn').click(function() {
        $('#js-code').val('');
        $('#jquery-output').val('');
        mostrarAlerta('info', 'Campos limpiados', 'Los campos se han limpiado correctamente.');
    });

    // Función para copiar al portapapeles
    $('#copy-btn').click(function() {
        const textoCopiado = $('#jquery-output')[0];

        // Seleccionar y copiar al portapapeles
        textoCopiado.select();
        document.execCommand("copy");
        mostrarAlerta('success', 'Copiado', 'Código copiado al portapapeles!');
    });
});
