document.querySelectorAll('.faq-question').forEach(function (button) {
    button.addEventListener('click', function () {
        const item = button.closest('.faq-item');
        const answer = item.querySelector('.faq-answer');
        const isOpen = item.classList.contains('is-open');

        // Close all other FAQ items
        document.querySelectorAll('.faq-item.is-open').forEach(function (openItem) {
            if (openItem !== item) {
                const openButton = openItem.querySelector('.faq-question');
                const openAnswer = openItem.querySelector('.faq-answer');

                openItem.classList.remove('is-open');
                openButton.setAttribute('aria-expanded', 'false');
                openAnswer.hidden = true;
            }
        });

        // Toggle current item
        if (isOpen) {
            item.classList.remove('is-open');
            button.setAttribute('aria-expanded', 'false');
            answer.hidden = true;
        } else {
            item.classList.add('is-open');
            button.setAttribute('aria-expanded', 'true');
            answer.hidden = false;
        }
    });
});