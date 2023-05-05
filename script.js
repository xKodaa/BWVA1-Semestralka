function addComment() {
    var nameInput = document.getElementById("name");
    var commentInput = document.getElementById("comment");
    
    // Ochrana proti vkládání nebezpečných kódů
    var nameValue = nameInput.value.replace(/(<([^>]+)>)/gi, "");
    var commentValue = commentInput.value.replace(/(<([^>]+)>)/gi, "");

    // Kontrola neprázdných inputů
    if (nameValue === "" || commentValue === "") {
        window.alert("Vyplňte prosím oba údaje.");
        return;
    }

    // Vytvoření nového komentáře
    var newComment = {'name': nameValue, 'comment': commentValue};

    // Načtení existujících komentářů z localStorage
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    
    // Přidání nového komentáře do pole
    comments.push(newComment);
    
    // Uložení pole komentářů zpět do localStorage
    localStorage.setItem('comments', JSON.stringify(comments));
    
    // Vymazání obsahu polí pro jméno a komentář
    document.getElementById('name').value = '';
    document.getElementById('comment').value = '';

    // Po odeslání refreshnout komentáře
    showComments();
}

function showComments() {
    // Načtení localStorage
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    var commentsHtml = '';
    
    // Vložení komentářů do kontejneru
    for (var i = 0; i < comments.length; i++) {
      commentsHtml += '<div class="userComment">';
      commentsHtml += '<p class="commentAuthor"><b>Autor:</b> ' + comments[i].name + '</p>';
      commentsHtml += '<p class="commentContext">- <i>' + comments[i].comment + '</i></p>';
      commentsHtml += '</div>';
    }
    
    document.getElementById('comments').innerHTML = commentsHtml;
}

// Funkce pro smazání komentářů
function removeMessages() {
    var readyToDelete = window.prompt("Pro smazání komentářů uhádni tajnou myškavěc");
    if(readyToDelete == "delete") {
        localStorage.clear();
        showComments();
    } else {
        window.alert("To není tajná myškavěc... takže smůla, komentáře nesmažu");
    }
}

// Při načtení stránky se volá funkce na zobrazení komentářů
window.onload = function(){
    showComments();
}
