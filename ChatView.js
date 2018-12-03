function generarChat(contenedor, data, mailUsuario) {
    $("#" + contenedor).empty();
    $("#" + contenedor).append(dibujarGlobosDelChat(data, mailUsuario));
    scrollDown("contenedorGlobosDelChat");
}

function scrollDown(clase) {
    $("." + clase).scrollTop($("." + clase)[0].scrollHeight);
}


function dibujarGlobosDelChat(data, mailUsuario) {
    var html = "<div class='contenedorGlobosDelChat'>";
    var lenght = data.items.length;
    for (var i = 0; i <= lenght - 1; i++)
        html += generarGloboChat(data.items[i], mailUsuario);

    return html += "</div>";
}

function generarGloboChat(item, mailUsuario) {
    var procedencia = (item.MailEnvio == mailUsuario ? "Cliente" : "Administrador");
    var globoChat = "";
    switch (procedencia) {
        case 'Cliente':
            globoChat = generarGloboChatDerecha(item);
            break;
        case 'Administrador':
            globoChat = generarGloboChatIzquierda(item);
            break;
    }
    return globoChat;
}

function generarGloboChatDerecha(item) {
    return "<div class='globoDerecha'>" + dibujarItemGloboChat(item) + "</div>";
}

function generarGloboChatIzquierda(item) {
    return "<div class='globoIzquierda'>" + dibujarItemGloboChat(item) + "</div>";
}

function dibujarItemGloboChat(item) {
    var html = "<div id='GloboChat'>";

    html += generarCabeceraGloboChat( item.Sectores, item.MailEnvio, item.Visible);
    html += generarCuerpoGloboChat(item.Detalle);
    html += generarPieGloboChat(js_yyyy_mm_dd_hh_mm_ss(item.FechaCreacion), item.tieneDocumento, item.IDDetalleSolicitud);
    html += "</div>";

    return html;
}

function generarCabeceraGloboChat(sector, nombre, Visible) {
    return "<div class='pieGloboTextoUsuario'>" + (Visible == false ? "[oculto] " : "") + (sector != null ? "" + sector + " - " : "") + nombre + "</div>";
}

function generarCuerpoGloboChat(texto) {
    return "<div class=''>" + texto + "</div>";
}

function generarPieGloboChat(texto, tieneDocumento, IDDetalleSolicitud) {
    return "<div class='pieGloboChat'>" + generarHtmlBotonDescargarArchivoChatview(tieneDocumento, IDDetalleSolicitud) + " - " + " <div class='pieGloboTexto'>" + texto + "</div></div> ";
}

function generarHtmlBotonDescargarArchivoChatview(tieneDocumento, IDDetalleSolicitud) {
    return (tieneDocumento == 1 ? "<a onclick='descargarArchivoChatView(" + IDDetalleSolicitud + ")' class='botonDescargarArchivoChatView'>Descargar Archivo</a>" : "");
}

function descargarArchivoChatView(/*IDDetalleSolicitud*/) {
    //window.open($('#HiddenStringWebService').val() + "/ServicioSolicitud.asmx/DescargarArchivoSolicitud?IDDetalleSolicitud=" + IDDetalleSolicitud);

//    IDDetalleSolicitud

//    $('#<%= BtnExportar.ClientID %>').click();
    
    //window.location.href = $('#HiddenStringWebService').val() + "/ServicioSolicitud.asmx/DescargarArchivoSolicitud?IDDetalleSolicitud=" + IDDetalleSolicitud;
}

function js_yyyy_mm_dd_hh_mm_ss(texto) {
    now = new Date(texto.replace("T", " "));
    year = "" + now.getFullYear();
    month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
    day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
    hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
    minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
    second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
    return day + "/" + month + "/" + year + " " + hour + ":" + minute /*+ ":" + second*/;
}
