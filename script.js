
// Smooth navigation between pages
document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll("nav ul li a");
    const contentBox = document.querySelector(".content-box");

    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const page = link.getAttribute("href");

            fetch(page)
                .then(response => response.text())
                .then(html => {
                    // Get the new content from the fetched page
                    const newContent = new DOMParser().parseFromString(html, "text/html")
                        .querySelector(".content-box").innerHTML;
                    // Update the content box with the new content
                    contentBox.innerHTML = newContent;
                    // Push the new state into the browser history
                    history.pushState(null, "", page);
                })
                .catch(error => console.error("Erro ao carregar a página:", error));
        });
    });

    // Handle back/forward navigation with popstate
    window.addEventListener("popstate", function() {
        fetch(location.pathname)
            .then(response => response.text())
            .then(html => {
                contentBox.innerHTML = new DOMParser().parseFromString(html, "text/html")
                    .querySelector(".content-box").innerHTML;
            })
            .catch(error => console.error("Erro ao carregar a página:", error));
    });
});

// Function to show biography popup
function showBio(name) {
    const bioPopup = document.getElementById("bio-popup");
    bioPopup.innerHTML = `<h3>${name}</h3><p>Biografia do ${name}...</p>`;
    bioPopup.style.display = "block";
}

// Close the bio popup when clicked
const bioPopup = document.getElementById("bio-popup");
if (bioPopup) {
    bioPopup.addEventListener("click", () => {
        bioPopup.style.display = "none";
    });
}
