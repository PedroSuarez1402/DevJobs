/**
 * Calcula el porcentaje de coincidencia entre las habilidades requeridas por una vacante
 * y las habilidades que posee un candidato.
 * 
 * @param {string} skillsVacante - Habilidades requeridas por la vacante (separadas por comas)
 * @param {string} skillsCandidato - Habilidades del candidato (separadas por comas)
 * @returns {number} Porcentaje de coincidencia (0-100)
 */
export const calcularMatchScore = (skillsVacante, skillsCandidato) => {
    if (!skillsVacante || !skillsCandidato) return 0;

    // Convertir a arrays, limpiar espacios y poner en minúsculas
    const vacanteArr = skillsVacante.split(',').map(s => s.trim().toLowerCase()).filter(s => s !== '');
    const candidatoArr = skillsCandidato.split(',').map(s => s.trim().toLowerCase()).filter(s => s !== '');

    if (vacanteArr.length === 0) return 0;

    // Contar cuántas skills de la vacante tiene el candidato
    let coincidencias = 0;
    vacanteArr.forEach(skill => {
        if (candidatoArr.includes(skill)) {
            coincidencias++;
        }
    });

    // Calcular porcentaje
    const score = (coincidencias / vacanteArr.length) * 100;
    
    return Math.round(score);
};
