
// every time page loads, check for any delete-form
// if there is a delete-form, make user confirm

const deleteForm = document.querySelector("form.delete-form");
if (deleteForm){
  deleteForm.addEventListener("submit", function(event){
    if (confirm("Are you sure?")){

    } else {
      event.preventDefault()
    }
  })
}
