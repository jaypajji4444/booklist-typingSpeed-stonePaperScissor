// Book class:REpresent a book
class Book{
    constructor(title,author,isbn)
    {
        this.title=title;
        this.author=author;
        this.isbn=isbn;

    }
}

// UI class:handle ui task

class UI
{
    static display_book()
    {
       

        const books=Store.getBooks();

        books.forEach(book=>{
            UI.AddBookToList(book);
        })
    }


   static AddBookToList(book)
   {
       const list=document.querySelector("#book-list");
       const row=document.createElement("tr");
       row.innerHTML=`
       <td>${book.title}</td>
       <td>${book.author}</td>
       <td>${book.isbn}</td>
       <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;  //class is delete

       list.appendChild(row);
   }


   static showAlert(message,classname)  // to show alert for incomplete fields and successfull submission
   {
    const div=document.createElement("div");
    div.className=`alert alert-${classname}`;
    div.appendChild(document.createTextNode(message));  // insert text inside div note the way...
 
    //position decider
    const container=document.querySelector(".container"); //  inside container
    const form=document.querySelector("#book-form");  // for location inside container
    container.insertBefore(div,form);  // insert div before form inside container


 // remove the alert after 3 seconds
    setTimeout(function()
    {
         document.querySelector(".alert").remove();
    },3000);

   }


   static ClearFields()
   {
       document.querySelector("#title").value="";
       document.querySelector("#author").value="";
       document.querySelector("#isbn").value="";
   }

   static DeleteBook(element)
   {
    if(element.classList.contains("delete"))
    {
    element.parentElement.parentElement.remove(); // X:parent=td  td's parent is row therefore to delete row we wrote parent element twice
    }
   }
   
}


//storage class:Handle storage

class Store{
   static getBooks()
    {
let books;
if(localStorage.getItem("books")===null)
{
    books=[];
}

else
{
    books=JSON.parse(localStorage.getItem("books"));
}

return books;
    }


   static addBooks(book)
    {
    const books=Store.getBooks();  // get the array of book
    books.push(book);  // add book to books array

    localStorage.setItem("books",JSON.stringify(books));  //json for convert object\array to string since localstorage accepts only string
    }

   static removeBooks(isbn)
    {

    const books=Store.getBooks();
    books.forEach((book,index)=>{
    if(book.isbn===isbn)
    {   
        books.splice(index,1);   //remove 1 book number in array =index 
    }
    });

    localStorage.setItem("books",JSON.stringify(books));

    }


}


// event: tp show book

document.addEventListener("DOMContentLoaded",UI.display_book);


// event :to add book


document.querySelector("#book-form").addEventListener("submit",(x)=>{

    // get value from form

    const title=document.querySelector("#title").value;
    const author=document.querySelector("#author").value;
    const isbn=document.querySelector("#isbn").value;


    //  Validation of form
    if(title==="" || author==="" || isbn==="")
    {
       UI.showAlert("Please fill all the fields!!","danger");  // message and danger for red colour
    }

    else

    {

   //intatiate book

   const book=new Book(title,author,isbn);
  
   // Add Book To UI

   UI.AddBookToList(book);


   // Add book to Store class

   Store.addBooks(book);


   // succes message aftr submission

   UI.showAlert("Book added successfully!!!","success");

   // after submit fields shld be clear

   UI.ClearFields();

    }

});

//Event: to remove book

document.querySelector("#book-list").addEventListener("click",(x)=>{
    // remove book from UI

    UI.DeleteBook(x.target);  // target==place where we click

    // remove book from store
     Store.removeBooks(x.target.parentElement.previousElementSibling.textContent);   
/* x.target=delete part ,, parent element= last td , previosElementSibling= second last td id=isbn
 ,, textcontect=isbn number */ 

    //message for successfull deletion

    UI.showAlert("Book removed successfully!!", "success");
})




