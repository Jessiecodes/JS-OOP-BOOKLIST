class Book {
    constructor(title,author,isbn,description){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.description = description;
    }
}


class UI {
    addBookToList(book) {

        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML = `

            <td>${book.title} </td>
            <td>${book.author} </td>
            <td>${book.isbn} </td>
            <td>${book.description} </td>
            <td><a href="" class="delete">X</a></td>

        `;

        list.appendChild(row);

    }

    showAlert(message, className){
        const div = document.createElement('div');

        // ADD CLASSNAME 

        div.className = `alert ${className}`;

        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');

        // GET FORM 
        const form = document.querySelector('#book-form');

        //INSERT ALERT

        container.insertBefore(div, form);

        //TIMEOUT AFTER 3 SECONDS 

        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
          
    }

    deleteBook(target) {

        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }


    clearFields(){

        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
        document.getElementById('description').value = '';
    }


}


//EVENT LISTENING 

document.getElementById('book-form').addEventListener('submit',function(e){

    //GET FORM VALUES 
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const description = document.getElementById('description').value;

    //Instantiate book 

    const book = new Book(title,author,isbn,description);

    //Instantiate UI CLASS 
    const ui = new UI();

    //Validate 
    if(title === '' || author === '' || isbn === '' || description === '') {

        // error alert 

        ui.showAlert('please fill in all the fields', 'error');
    }
    else{

        //ADD BOOK TO THE LIST 
        ui.addBookToList(book);

        //show success message 

        ui.showAlert('Book added', 'success');

        // CLEAR FIELDS 

        ui.clearFields();
    }

    e.preventDefault();


    //EVENT LISTENING FOR DELETE 
    document.getElementById('book-list').addEventListener('click', 
    function(e){

        //INSTANTIATE UL
        const ui = new UI();

        //delete book 
        ui.deleteBook(e.target);

        //SHOW MESSAGE 

        ui.showAlert('Book Removed!', 'success');

        e.preventDefault();
    });

})