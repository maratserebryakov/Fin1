document.addEventListener('DOMContentLoaded', () => {
    const formulaParts = document.querySelectorAll('.formula-part');
    const editor = document.getElementById('editor');
    const editInput = document.getElementById('edit-input');
    const saveBtn = document.getElementById('save-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    let activePart = null;

    // Инициализация MathJax (если формула не отрендерилась сразу)
    MathJax.typeset();

    // Обработчик клика по переменной
    formulaParts.forEach(part => {
        part.addEventListener('click', () => {
            activePart = part;
            const currentLatex = part.getAttribute('data-latex');
            
            // Показываем редактор
            editor.classList.remove('hidden');
            editInput.value = currentLatex;
            editInput.focus();
            
            // Выделяем активную часть
            part.classList.add('active');
        });
    });

    // Сохранение изменений
    saveBtn.addEventListener('click', () => {
        if (activePart) {
            const newLatex = editInput.value.trim();
            if (newLatex) {
                // Обновляем атрибут и содержимое
                activePart.setAttribute('data-latex', newLatex);
                activePart.innerHTML = `\\(${newLatex}\\)`;
                
                // Перерисовываем формулу
                MathJax.typesetPromise().then(() => {
                    closeEditor();
                });
            } else {
                closeEditor();
            }
        }
    });

    // Отмена редактирования
    cancelBtn.addEventListener('click', () => {
        closeEditor();
    });

    // Закрытие редактора
    function closeEditor() {
        editor.classList.add('hidden');
        editInput.value = '';
        
        if (activePart) {
            activePart.classList.remove('active');
            activePart = null;
        }
    }

    // Закрытие по Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeEditor();
        }
    });
});
