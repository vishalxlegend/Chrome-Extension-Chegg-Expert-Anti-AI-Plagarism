function handleFormSubmit(event){
  event.preventDefault();
  const name=document.getElementById('name').value;
  const email=document.getElementById('email').value;
  const subject=document.getElementById('subject').value;
  const message=document.getElementById('message').value;
  if(name&&email&&subject&&message){
    alert('Thank you for your message! We will get back to you within 24-48 hours.');
    event.target.reset();
  }else{
    alert('Please fill in all required fields.');
  }
}

document.addEventListener('DOMContentLoaded',function(){
  const form=document.querySelector('form');
  if(form){
    form.addEventListener('submit',handleFormSubmit);
  }
});
