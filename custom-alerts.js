class CustomAlerts {
    constructor() {
        this.alertQueue = [];
        this.isAlertOpen = false;
        this.toastContainer = null;
        this.init();
    }

    init() {
        this.toastContainer = document.getElementById('toastContainer');
        if (!this.toastContainer) {
            this.toastContainer = document.createElement('div');
            this.toastContainer.id = 'toastContainer';
            this.toastContainer.className = 'toast-container';
            document.body.appendChild(this.toastContainer);
        }
    }

    showAlert(message, title = 'Notice', type = 'info') {
        return new Promise((resolve) => {
            const alertModal = document.getElementById('customAlert');
            const alertIcon = document.getElementById('alertIcon');
            const alertIconPath = document.getElementById('alertIconPath');
            const alertTitle = document.getElementById('alertTitle');
            const alertMessage = document.getElementById('alertMessage');
            const alertConfirm = document.getElementById('alertConfirm');
            const alertCancel = document.getElementById('alertCancel');

            this.setAlertIcon(type, alertIcon, alertIconPath);

            alertTitle.textContent = title;
            alertMessage.textContent = message;

            alertCancel.style.display = 'none';
            alertConfirm.textContent = 'OK';
            alertConfirm.className = 'alert-btn alert-btn-primary';

            alertModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            const handleConfirm = () => {
                this.hideAlert();
                resolve(true);
                alertConfirm.removeEventListener('click', handleConfirm);
            };

            alertConfirm.addEventListener('click', handleConfirm);

            const handleEsc = (e) => {
                if (e.key === 'Escape') {
                    this.hideAlert();
                    resolve(true);
                    document.removeEventListener('keydown', handleEsc);
                }
            };
            document.addEventListener('keydown', handleEsc);
        });
    }

    showConfirm(message, title = 'Confirm Action', type = 'confirm') {
        return new Promise((resolve) => {
            const alertModal = document.getElementById('customAlert');
            const alertIcon = document.getElementById('alertIcon');
            const alertIconPath = document.getElementById('alertIconPath');
            const alertTitle = document.getElementById('alertTitle');
            const alertMessage = document.getElementById('alertMessage');
            const alertConfirm = document.getElementById('alertConfirm');
            const alertCancel = document.getElementById('alertCancel');

            this.setAlertIcon(type, alertIcon, alertIconPath);

            alertTitle.textContent = title;
            alertMessage.textContent = message;

            alertCancel.style.display = 'inline-flex';
            alertCancel.textContent = 'Cancel';
            alertConfirm.textContent = type === 'danger' ? 'Delete' : 'Confirm';
            alertConfirm.className = type === 'danger' ? 'alert-btn alert-btn-danger' : 'alert-btn alert-btn-primary';

            alertModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            const handleConfirm = () => {
                this.hideAlert();
                resolve(true);
                cleanup();
            };

            const handleCancel = () => {
                this.hideAlert();
                resolve(false);
                cleanup();
            };

            const handleEsc = (e) => {
                if (e.key === 'Escape') {
                    this.hideAlert();
                    resolve(false);
                    cleanup();
                }
            };

            const cleanup = () => {
                alertConfirm.removeEventListener('click', handleConfirm);
                alertCancel.removeEventListener('click', handleCancel);
                document.removeEventListener('keydown', handleEsc);
            };

            alertConfirm.addEventListener('click', handleConfirm);
            alertCancel.addEventListener('click', handleCancel);
            document.addEventListener('keydown', handleEsc);
        });
    }

    hideAlert() {
        const alertModal = document.getElementById('customAlert');
        alertModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    setAlertIcon(type, iconElement, pathElement) {
        iconElement.className = `alert-icon ${type}`;
        
        const icons = {
            success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
            error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
            warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z',
            info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
            confirm: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
            danger: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
        };

        pathElement.setAttribute('d', icons[type] || icons.info);
    }

    showToast(message, title = '', type = 'success', duration = 4000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const toastId = 'toast_' + Date.now();
        toast.id = toastId;

        const iconSvg = this.getToastIcon(type);
        
        toast.innerHTML = `
            ${iconSvg}
            <div class="toast-content">
                ${title ? `<div class="toast-title">${title}</div>` : ''}
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="customAlerts.hideToast('${toastId}')">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        `;

        this.toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        if (duration > 0) {
            setTimeout(() => {
                this.hideToast(toastId);
            }, duration);
        }

        return toastId;
    }

    hideToast(toastId) {
        const toast = document.getElementById(toastId);
        if (toast) {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }
    }

    getToastIcon(type) {
        const icons = {
            success: `<svg class="toast-icon" fill="currentColor" style="color: #10B981;" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>`,
            error: `<svg class="toast-icon" fill="currentColor" style="color: #EF4444;" viewBox="0 0 24 24">
                     <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                   </svg>`,
            warning: `<svg class="toast-icon" fill="currentColor" style="color: #F59E0B;" viewBox="0 0 24 24">
                       <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                     </svg>`,
            info: `<svg class="toast-icon" fill="currentColor" style="color: #3B82F6;" viewBox="0 0 24 24">
                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>`
        };
        return icons[type] || icons.info;
    }

    success(message, title = 'Success') {
        return this.showToast(message, title, 'success');
    }

    error(message, title = 'Error') {
        return this.showToast(message, title, 'error');
    }

    warning(message, title = 'Warning') {
        return this.showToast(message, title, 'warning');
    }

    info(message, title = 'Info') {
        return this.showToast(message, title, 'info');
    }
}

window.customAlerts = new CustomAlerts();

window.alert = function(message) {
    return customAlerts.showAlert(message);
};

window.confirm = function(message) {
    return customAlerts.showConfirm(message, 'Confirm Action', 'warning');
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CustomAlerts;
}
