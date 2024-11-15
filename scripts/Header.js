// Hàm để tải và gắn header từ file `header.html`
function loadHeader() {
    fetch("../html/Header.html") // Đường dẫn tới file header.html
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            // Gắn nội dung header vào phần đầu của <body>
            document.body.insertAdjacentHTML("afterbegin", data);
        })
        .catch(error => {
            console.error("Error loading header:", error);
        });
}

// Gọi hàm loadHeader khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", loadHeader);
