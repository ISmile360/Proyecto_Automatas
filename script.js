$(document).ready(function() {
    // Función para mostrar mensajes con SweetAlert
    const showAlert = (icon, title, text) => {
        Swal.fire({ icon, title, text });
    };

    // Función para convertir JS a jQuery de manera dinámica
    const convertJStoJQuery = (jsCode) => {
        const replacements = [
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
        replacements.forEach(rep => {
            jsCode = jsCode.replace(rep.regex, rep.replacement);
        });

        return jsCode;
    };

    // Botón para convertir el código
    $('#convert-btn').click(function() {
        const jsCode = $('#js-code').val();

        try {
            // Validar sintaxis del código JavaScript
            new Function(jsCode);
            
            // Convertir código JS a jQuery
            const jqueryCode = convertJStoJQuery(jsCode);
            $('#jquery-output').val(jqueryCode);

            showAlert('success', 'Conversión exitosa', 'El código se ha convertido correctamente a jQuery.');
        } catch (error) {
            showAlert('error', 'Error de sintaxis', `Error en el código JavaScript: ${error.message}`);
        }
    });

    // Limpiar los campos
    $('#clear-btn').click(function() {
        $('#js-code').val('');
        $('#jquery-output').val('');
        showAlert('info', 'Campos limpiados', 'Los campos se han limpiado correctamente.');
    });

    // Función para copiar al portapapeles
    $('#copy-btn').click(function() {
        const copyText = $('#jquery-output')[0];

        // Seleccionar y copiar al portapapeles
        copyText.select();
        document.execCommand("copy");
        showAlert('success', 'Copiado', 'Código copiado al portapapeles!');
    });
});
