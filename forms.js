document.addEventListener("DOMContentLoaded", (name, catogory) => {
    const addToCartButton = document.querySelector('.add-to-cart');
    const enquiryModal = document.getElementById('enquiry-modal');

    // Open Modal
    addToCartButton.addEventListener('click', () => {
        enquiryModal.style.display = 'flex';
    });

    // Close Modal
    window.closeModal = function () {
        enquiryModal.style.display = 'none';
    };

    // Handle Form Submission
    const form = document.getElementById('quotation-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission

        const fullName = document.getElementById('fullname').value;
        const mobile = document.getElementById('mobile').value;
        const email = document.getElementById('email').value;

        if (!fullName || !mobile || !email) {
            alert('Please fill all fields.');
            return;
        }

        alert(`Quotation request submitted successfully!\n\nName: ${fullName}\nMobile: ${mobile}\nEmail: ${email}`);

        // Clear the form
        form.reset();

        // Close the modal
        closeModal();
    });
});
