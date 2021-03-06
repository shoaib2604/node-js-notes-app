const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your notes...'
}

const addNote =  (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('New note added'))
    } else {
        console.log(chalk.red('note title taken'))
    }
}

const removeNote=(title)=>{
    const notes=loadNotes()
    const notesToKeep=notes.filter(function(note){
      return note.title!==title
    })
    if(notes.length>notesToKeep.length){
      console.log(chalk.green.inverse('Note removed'))
      saveNotes(notesToKeep)
    }
    else {
      console.log(chalk.red('no notes found'));
    }


}

const saveNotes = (notes)=> {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}
const listNotes=()=>{
  const notes=loadNotes()
  console.log(chalk.yellow.inverse('your notes are'))
  notes.forEach((note)=>{
    console.log(note.title)
  })

}

const loadNotes = ()=> {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote:removeNote,
    listNotes:listNotes
}
