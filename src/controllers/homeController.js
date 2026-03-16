// homeController.js
import { getVacantes } from '../services/homeService.js';

export const home = async (req, res) => {
    try {
        // En el futuro, aquí usaremos "await" para ir a la base de datos.
        // Ejemplo: const vacantes = await Vacante.find();
        const vacantes = await getVacantes();

        res.render('home', {
            nombrePagina: 'devJobs',
            tagline: 'Encuentra y publica empleos para desarrolladores',
            barra: true,
            boton: true,
            mostrarNav: true,
            vacantes: vacantes
        });
        
    } catch (error) {
        console.error("Error al cargar la página de inicio:", error);
        // Aquí podrías renderizar una vista de error si algo falla
        res.status(500).send('Hubo un error en el servidor');
    }
};