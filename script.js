document
  .getElementById("ouvrirFormulaireRendezVous")
  .addEventListener("click", function () {
    Swal.fire({
      title: "Prendre un Rendez-vous",
      html:
        '<label for="nomComplet">Nom Complet :</label><br>' +
        '<input type="text" id="nomComplet" class="swal2-input" placeholder="Entrez votre nom complet" required><br>' +
        '<label for="email">Email :</label><br>' +
        '<input type="email" id="email" class="swal2-input" placeholder="Entrez votre adresse e-mail" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"><br>' +
        '<label for="numeroTelephone">Numéro de Téléphone :</label><br>' +
        '<input type="tel" id="numeroTelephone" class="swal2-input" placeholder="Entrez votre numéro de téléphone" required pattern="[0-9]{10}"><br>' +
        '<label for="service">Choisissez un Service :</label><br>' +
        '<select id="service" class="swal2-select">' +
        '<option value="massage">Massage</option>' +
        '<option value="manicure">Manicure</option>' +
        '<option value="pédicure">Pédicure</option>' +
        '<option value="épilation">Épilation</option>' +
        '<option value="autre">Autre</option>' +
        "</select>",
      focusConfirm: false,
      showCloseButton: true,
      preConfirm: () => {
        const nomComplet = document.getElementById("nomComplet").value;
        const email = document.getElementById("email").value;
        const numeroTelephone =
          document.getElementById("numeroTelephone").value;
        const service = document.getElementById("service").value;
        return { nomComplet, email, numeroTelephone, service };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { nomComplet, email, numeroTelephone, service } = result.value;
        if (nomComplet && email && numeroTelephone && service) {
          Swal.fire("Rendez-vous pris avec succès !", "", "success").then(
            () => {
              sendMail();
            }
          );
        } else {
          Swal.fire("Vous n'avez pas pris de rendez-vous.", "", "error");
        }
      }
    });
  });

function sendMail() {
  var params = {
    name: document.getElementById("nomComplet").value,
    email: document.getElementById("email").value,
    phonenumber: document.getElementById("numeroTelephone").value,
    services: document.getElementById("service").value,
  };
  const serviceID = "service_a2a31rs";
  const templateID = "template_c5r0it3";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById("nomComplet").value = "";
      document.getElementById("email").value = "";
      document.getElementById("numeroTelephone").value = "";
      document.getElementById("service").value = "";
      console.log(res);
      alert("Rendez-vous pris avec succès !");
    })
    .catch((err) => console.log(err));
}

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 2300);
}
