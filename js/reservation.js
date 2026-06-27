// ===================================
// Reservation JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const reservationForm = document.getElementById('reservationForm');

    if (reservationForm) {
        // Set minimum date to today
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }

        // Form submission
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;
            const notes = document.getElementById('notes').value;

            // Validate form
            if (!name || !phone || !date || !time || !guests) {
                alert('Por favor completa todos los campos obligatorios.');
                return;
            }

            // Format date for display
            const formattedDate = new Date(date).toLocaleDateString('es-PE', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Build WhatsApp message
            let message = '¡Hola! Quiero hacer una reservación:\n\n';
            message += `👤 Nombre: ${name}\n`;
            message += `📱 Teléfono: ${phone}\n`;
            if (email) message += `📧 Email: ${email}\n`;
            message += `📅 Fecha: ${formattedDate}\n`;
            message += `🕐 Hora: ${time}\n`;
            message += `👥 Personas: ${guests}\n`;
            if (notes) message += `📝 Notas: ${notes}\n`;
            message += '\n¡Gracias!';

            // Encode message for WhatsApp URL
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/51999999999?text=${encodedMessage}`;

            // Show confirmation
            const confirmed = confirm(
                '¿Confirmar reservación?\n\n' +
                `Nombre: ${name}\n` +
                `Fecha: ${formattedDate}\n` +
                `Hora: ${time}\n` +
                `Personas: ${guests}\n\n` +
                'Se enviará por WhatsApp.'
            );

            if (confirmed) {
                // Open WhatsApp
                window.open(whatsappUrl, '_blank');

                // Reset form
                reservationForm.reset();

                // Show success message
                showSuccessMessage();
            }
        });
    }

    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <h3>¡Reservación Enviada!</h3>
                <p>Te contactaremos pronto para confirmar.</p>
            </div>
        `;
        successDiv.style.cssText = `
            position: fixed;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 3000;
            animation: fadeIn 0.3s ease;
        `;

        const content = successDiv.querySelector('.success-content');
        content.style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 16px;
            text-align: center;
            max-width: 400px;
        `;

        const icon = successDiv.querySelector('i');
        icon.style.cssText = `
            font-size: 4rem;
            color: #25d366;
            margin-bottom: 20px;
        `;

        document.body.appendChild(successDiv);

        // Close on click
        successDiv.addEventListener('click', () => {
            successDiv.remove();
        });

        // Auto close after 3 seconds
        setTimeout(() => {
            successDiv.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => successDiv.remove(), 300);
        }, 3000);
    }
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);
