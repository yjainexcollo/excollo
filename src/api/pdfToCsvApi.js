/**
 * API client for PDF to CSV converter
 * Handles CORS by using Vite proxy in development
 */

const API_BASE = import.meta.env.DEV
    ? '/api/pdf-csv'  // Use proxy in development
    : 'https://csv-backend-oyvb.onrender.com';  // Direct URL in production

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
    constructor(message, status, code) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.code = code;
    }
}

/**
 * Make HTTP request with error handling
 */
async function apiRequest(url, options = {}) {
    const fullUrl = url.startsWith('http') ? url : `${API_BASE}${url}`;

    try {
        const response = await fetch(fullUrl, {
            ...options,
            headers: {
                'Accept': 'application/json',
                ...options.headers
            }
        });

        const contentType = response.headers.get('content-type');
        let data;

        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (!response.ok) {
            const error = data?.error || {};
            throw new ApiError(
                error.message || `HTTP ${response.status}`,
                response.status,
                error.code || 'HTTP_ERROR'
            );
        }

        return data;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        throw new ApiError(
            error.message || 'Network error',
            0,
            'NETWORK_ERROR'
        );
    }
}

/**
 * Check if file is valid PDF or image
 */
function isValidFile(file) {
    const validTypes = [
        'application/pdf',
        'image/jpeg',
        'image/jpg',
        'image/png'
    ];
    return validTypes.includes(file.type);
}

/**
 * Upload PDF file and start conversion
 */
export async function uploadPdf(file) {
    if (!file) {
        throw new ApiError('No file provided', 400, 'NO_FILE');
    }

    if (!isValidFile(file)) {
        throw new ApiError('Only PDF and image files are allowed', 400, 'INVALID_FILE_TYPE');
    }

    if (file.size > 20 * 1024 * 1024) {
        throw new ApiError('File too large (max 20MB)', 400, 'FILE_TOO_LARGE');
    }

    const formData = new FormData();
    formData.append('file', file);

    return apiRequest('/api/jobs', {
        method: 'POST',
        body: formData
    });
}

/**
 * Get job status
 */
export async function getJobStatus(jobId) {
    if (!jobId) {
        throw new ApiError('Job ID is required', 400, 'NO_JOB_ID');
    }

    return apiRequest(`/api/jobs/${jobId}/status`);
}

/**
 * Get download URL for completed job
 */
export async function getDownloadUrl(jobId) {
    if (!jobId) {
        throw new ApiError('Job ID is required', 400, 'NO_JOB_ID');
    }

    return apiRequest(`/api/jobs/${jobId}/download-url`);
}

/**
 * Poll job status until completion
 */
export async function pollJobStatus(jobId, onStatusUpdate = null, intervalMs = 2000) {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = 150;

        const poll = async () => {
            try {
                attempts++;

                if (attempts > maxAttempts) {
                    reject(new ApiError('Job polling timeout', 408, 'POLLING_TIMEOUT'));
                    return;
                }

                const status = await getJobStatus(jobId);

                if (onStatusUpdate) {
                    onStatusUpdate(status);
                }

                if (status.ready || status.status === 'error') {
                    resolve(status);
                } else {
                    setTimeout(poll, intervalMs);
                }
            } catch (error) {
                reject(error);
            }
        };

        poll();
    });
}

/**
 * Check API health
 */
export async function checkHealth() {
    return apiRequest('/health');
}
