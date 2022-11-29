import fs from 'fs'

export function startExercising(projectPath) {
    const filenames = fs.readdirSync(projectPath + '/pages')
    console.log(filenames)
}