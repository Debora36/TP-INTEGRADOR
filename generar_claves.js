const bcrypt = require('bcrypt');

async function encriptar() {
    const miClave = "1111";
    
    // nivel de seguridad, 10 es el estándar
    const hash = await bcrypt.hash(miClave, 10); 
    
    console.log("Tu clave encriptada es:");
    console.log(hash);
}

encriptar();