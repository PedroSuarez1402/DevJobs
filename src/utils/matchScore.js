/**
 * Calcula el porcentaje de coincidencia entre las habilidades requeridas por una vacante
 * y las habilidades que posee un candidato.
 * * @param {string} skillsVacante - Habilidades de la vacante (JSON de Tagify o string)
 * @param {string} skillsCandidato - Habilidades del candidato (JSON de Tagify o string)
 * @returns {number} Porcentaje de coincidencia (0-100)
 */
export const calcularMatchScore = (skillsVacante, skillsCandidato) => {
    if (!skillsVacante || !skillsCandidato) return 0;

    // Función auxiliar para limpiar y estandarizar la data
    const procesarSkills = (skillsData) => {
        try {
            // Intenta parsear si viene de Tagify: '[{"value":"React"},{"value":"Node.js"}]'
            const parseado = JSON.parse(skillsData);
            if (Array.isArray(parseado)) {
                return parseado.map(s => s.value.trim().toLowerCase());
            }
        } catch (error) {
            // Si no es JSON, asume que es texto separado por comas: 'React, Node.js'
            return skillsData.split(',').map(s => s.trim().toLowerCase()).filter(s => s !== '');
        }
        return [];
    };

    const vacanteArr = procesarSkills(skillsVacante);
    const candidatoArr = procesarSkills(skillsCandidato);

    if (vacanteArr.length === 0) return 0;

    // Contar intersecciones
    let coincidencias = 0;
    vacanteArr.forEach(skill => {
        if (candidatoArr.includes(skill)) {
            coincidencias++;
        }
    });

    return Math.round((coincidencias / vacanteArr.length) * 100);
};