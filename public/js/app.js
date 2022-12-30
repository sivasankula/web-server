console.log("printing outputt");

document.getElementById("form_location").addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("event testing ", e);
  const loc = document.getElementById("location");

  console.log(loc.value)

  fetch(`http://localhost:3000/weather?location=${loc.value}`)
    .then((response) => {
      response.json().then((res) => {
        console.log("resp", res);
        document.getElementById('root').innerHTML = JSON.stringify(res)
      });
    })
    .catch((err) => {
      console.log("err", err);
    });

    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function(){
        if(this.status == 200 && this.readyState === 4){

            console.log('----', this)

            document.getElementById('root2').innerHTML = this.responseText
        }
    }
    xhttp.open('Get',`http://localhost:3000/weather?location=${loc.value}`)
    xhttp.send()
});
