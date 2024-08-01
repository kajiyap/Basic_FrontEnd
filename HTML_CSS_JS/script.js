// Definir cores alternadas para as notas
const noteColors = ['#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb'];
let colorIndex = 0;


// Selecionar elementos do DOM
const addNoteButton = document.getElementById('add-note');
const noteTitleInput = document.getElementById('note-title');
const noteContentInput = document.getElementById('note-content');
const noteTagsInput = document.getElementById('note-tags');
const notesList = document.getElementById('notes-list');


// Carregar notas do localStorage quando o conteúdo do DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', loadNotes);


// Adicionar evento ao botão de adicionar nota
addNoteButton.addEventListener('click', addNote);


// Função para adicionar uma nova nota
function addNote() {
    const title = noteTitleInput.value; 
    const content = noteContentInput.value; 
    const tags = noteTagsInput.value.split(',').map(tag => tag.trim()); 


    if (title && content) { 
        const note = {
            id: Date.now(), 
            content,
            tags,
            color: getNextColor() 
        };


        saveNoteToLocalStorage(note); 
        displayNote(note); 


        // Limpar os campos de entrada
        noteTitleInput.value = '';
        noteContentInput.value = '';
        noteTagsInput.value = '';
    }
}


// Função para obter a próxima cor alternada
function getNextColor() {
    const color = noteColors[colorIndex]; 
    colorIndex = (colorIndex + 1) % noteColors.length; 
    return color; 
}


// Função para exibir uma nota
function displayNote(note) {
    const noteItem = document.createElement('div'); 
    noteItem.classList.add('note-item'); 
    noteItem.setAttribute('data-id', note.id); 
    noteItem.style.backgroundColor = note.color; 


    // Definir o conteúdo HTML do div da nota
    noteItem.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <div class="tags">${note.tags.map(tag => `#${tag}`).join(' ')}</div>
        <button onclick="deleteNote(${note.id})">Excluir</button>
    `;


    notesList.appendChild(noteItem); 
}


// Função para carregar notas do localStorage
function loadNotes() {
    const notes = getNotesFromLocalStorage(); 
    notes.forEach(note => displayNote(note)); 
}


// Função para salvar uma nota no localStorage
function saveNoteToLocalStorage(note) {
    const notes = getNotesFromLocalStorage(); 
    notes.push(note); 
    localStorage.setItem('notes', JSON.stringify(notes)); 
}


// Função para obter notas do localStorage
function getNotesFromLocalStorage() {
    return localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : []; 
}


// Função para excluir uma nota
function deleteNote(id) {
    let notes = getNotesFromLocalStorage();
    notes = notes.filter(note => note.id !== id); 
    localStorage.setItem('notes', JSON.stringify(notes)); 
    document.querySelector(`[data-id="${id}"]`).remove(); 
}
