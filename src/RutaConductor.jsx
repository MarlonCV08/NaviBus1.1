import './RutaConductor.css'
export const RutaConductor =()=>{
    return(
        <div class="contInfo">
            <div class="infoConductor">
                <img src="../../images/perfil.png" class="imgUser"/>
                <p>Conductor 1</p>
                <img src="../../images/ojo-rojo.png" class="imgEye" onclick="abrirParadero()"/>
            </div>
            <div class="infoConductor">
                <img src="../../images/perfil.png" class="imgUser"/>
                <p>Conductor 2</p>
                <img src="../../images/ojo-rojo.png" class="imgEye"/>
            </div>
            <div class="infoConductor">
                <img src="../../images/perfil.png" class="imgUser"/>
                <p>Conductor 3</p>
                <img src="../../images/ojo-rojo.png" class="imgEye"/>
            </div>
        </div>
    )
}