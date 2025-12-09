// Import React hooks for state management and side effects
import React, { useState, useCallback, useEffect } from 'react'
// Import Material-UI components for UI layout and styling
import { Box, Container, Typography, Button, Alert, CircularProgress, Fade } from '@mui/material'
// Import Lucide React icons for UI elements
import { CloudUpload, FileText, Download, RotateCcw } from 'lucide-react'
// Import Material-UI styled components
import { styled } from '@mui/material/styles'
// Import WhatsApp icon for contact button
import { IoLogoWhatsapp } from "react-icons/io5"
// Import custom components
import NavBar from '../../Components/NavBar'
import Footer from '../../Components/Footer'
import Excollo3DCaseStudy from '../../Components/AboutUs/Excollo3DCaseStudy'
import Sidebar from './Sidebar'

// Custom styled button with gradient
const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(180deg, #2579E3 0%, #8E54F7 100%) !important',
  backgroundColor: 'transparent !important',
  color: 'white !important',
  border: 'none !important',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(1.5, 4),
  fontWeight: 600,
  fontSize: 16,
  textTransform: 'none',
  boxShadow: 'none !important',
  '&:hover': {
    background: 'linear-gradient(180deg, #1e6bb8 0%, #7c3aed 100%) !important',
    backgroundColor: 'transparent !important',
    boxShadow: 'none !important',
  },
  '&:disabled': {
    background: '#9CA3AF !important',
    backgroundColor: '#9CA3AF !important',
    color: '#fff !important'
  },
  '&.MuiButton-root': {
    background: 'linear-gradient(180deg, #2579E3 0%, #8E54F7 100%) !important',
    backgroundColor: 'transparent !important',
  }
}))

/**
 * PDFtoCSV Component
 * Interactive demo showcasing PDF to CSV conversion AI capabilities
 * Features file upload, processing status, and download functionality
 * @returns {JSX.Element} Complete demo page with file conversion interface
 */
const PDFtoCSV = () => {
  // State for uploaded file
  const [file, setFile] = useState(null)
  // State for upload progress
  const [isUploading, setIsUploading] = useState(false)
  // State for processing status
  const [isProcessing, setIsProcessing] = useState(false)
  // State for download URL
  const [downloadUrl, setDownloadUrl] = useState(null)
  // State for error messages
  const [error, setError] = useState(null)
  // State for drag and drop functionality
  const [dragActive, setDragActive] = useState(false)
  // State for sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(false)
  // State for WhatsApp button visibility based on scroll
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false)

  // Backend API URL for file processing
  const BACKEND_URL = 'https://csv-backend-oyvb.onrender.co'

  const handleFileSelectFromInput = useCallback((selectedFile) => {
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
      setError(null)
    } else {
      setError('Please select a valid PDF file')
    }
  }, [])

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelectFromInput(e.dataTransfer.files[0])
    }
  }, [handleFileSelectFromInput])

  const handleFileInput = useCallback((e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelectFromInput(e.target.files[0])
    }
  }, [handleFileSelectFromInput])

  const handleUpload = useCallback(async () => {
    if (!file) {
      // If no file is selected, trigger file input
      document.getElementById('file-input').click()
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      // Import the API client dynamically
      const { uploadPdf, pollJobStatus, getDownloadUrl } = await import('../../api/pdfToCsvApi');

      console.log('Uploading file...')

      // Upload file
      const uploadResponse = await uploadPdf(file);
      console.log('Upload response:', uploadResponse)

      setIsUploading(false)
      setIsProcessing(true)

      // Check if conversion is complete or needs polling
      if (uploadResponse.downloadUrl) {
        setIsProcessing(false)
        setDownloadUrl(uploadResponse.downloadUrl)
      } else if (uploadResponse.jobId) {
        // Poll for completion
        console.log('Starting to poll job:', uploadResponse.jobId)

        const finalStatus = await pollJobStatus(
          uploadResponse.jobId,
          (status) => {
            console.log('Job status update:', status)
          },
          2000 // Poll every 2 seconds
        );

        console.log('Final status:', finalStatus)

        setIsProcessing(false)

        if (finalStatus.ready && finalStatus.downloadUrl) {
          setDownloadUrl(finalStatus.downloadUrl)
        } else if (finalStatus.jobId) {
          // Get download URL
          const downloadData = await getDownloadUrl(finalStatus.jobId)
          setDownloadUrl(downloadData.url)
        } else {
          throw new Error('No download URL available')
        }
      } else {
        throw new Error('Invalid response from server')
      }

    } catch (err) {
      console.error('Upload error:', err)
      setError(err.message || 'Upload failed. Please try again.')
      setIsUploading(false)
      setIsProcessing(false)
    }
  }, [file])

  const pollForCompletion = useCallback(async (jobId) => {
    const maxAttempts = 30 // 5 minutes max
    let attempts = 0

    const poll = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/status/${jobId}`)
        const result = await response.json()

        if (result.status === 'completed' && result.downloadUrl) {
          setIsProcessing(false)
          setDownloadUrl(result.downloadUrl)
          return
        } else if (result.status === 'failed') {
          throw new Error(result.error || 'Conversion failed')
        } else if (attempts >= maxAttempts) {
          throw new Error('Conversion timeout. Please try again.')
        } else {
          attempts++
          setTimeout(poll, 10000) // Poll every 10 seconds
        }
      } catch (err) {
        console.error('Polling error:', err)
        setIsProcessing(false)
        setError(err.message || 'Failed to check conversion status')
      }
    }

    poll()
  }, [])

  const handleDownload = useCallback(() => {
    if (downloadUrl) {
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = file?.name?.replace('.pdf', '.csv') || 'converted-file.csv'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }, [downloadUrl, file])

  const handleReset = useCallback(() => {
    setFile(null)
    setDownloadUrl(null)
    setError(null)
    setIsUploading(false)
    setIsProcessing(false)
  }, [])

  const handleSidebarToggle = useCallback(() => {
    setSidebarOpen(prev => !prev)
  }, [])

  const handleFileSelect = useCallback((selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile)
      setError(null)
      setDownloadUrl(null)
    }
  }, [])

  // WhatsApp button scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowWhatsAppButton(true)
      } else {
        setShowWhatsAppButton(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleWhatsapp = () => {
    window.open(
      "https://wa.me/918890204938?text=Hey%2C%20I%20need%20help%20with%20a%20tech%20solution.%20Let's%20talk%21",
      "_blank"
    )
  }

  return (
    <Box sx={{ minHeight: "100vh", background: "#000", color: "#fff", position: 'relative' }}>
      {/* Background Gradient */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "88%",
          height: { xs: "10%", md: "10%" },
          background: `radial-gradient(ellipse at top, rgba(154, 106, 255, 0.6) 0%, rgba(0, 0, 0, 0) 60%)`,
          zIndex: 1,
          opacity: 1,
        }}
      />

      {/* NavBar */}
      <Box sx={{ position: "relative", zIndex: 3 }}>
        <NavBar />
      </Box>

      <Container maxWidth="md" sx={{ pt: { xs: 4, md: 8 }, pb: { xs: 4, md: 8 }, position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: 32, sm: 40, md: 48 },
              fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
              mb: 2,
              color: '#fff'
            }}
          >
            PDF to CSV{' '}
            <Box component="span" sx={{
              background: 'linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Converter
            </Box>
          </Typography>
          <Typography sx={{
            fontSize: { xs: 16, sm: 18 },
            color: 'rgba(255,255,255,0.9)',
            maxWidth: 600,
            mx: 'auto',
            lineHeight: 1.6
          }}>
            Convert your PDF files to CSV format quickly and easily
          </Typography>
        </Box>

        {/* Upload Card */}
        <Box sx={{
          background: '#000',
          borderRadius: 4,
          p: { xs: 3, md: 6 },
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid #8E54F7'
        }}>
          {/* Upload Area */}
          <Box
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            sx={{
              border: dragActive ? '3px dashed #3B82F6' : '2px dashed #D1D5DB',
              borderRadius: 3,
              p: 6,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backgroundColor: dragActive ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
              '&:hover': {
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.02)'
              }
            }}
            onClick={() => document.getElementById('file-input').click()}
          >
            <input
              id="file-input"
              type="file"
              accept=".pdf"
              onChange={handleFileInput}
              style={{ display: 'none' }}
            />

            <Box sx={{ mb: 4 }}>
              <FileText size={64} color="#9CA3AF" />
            </Box>

            <Typography sx={{
              fontSize: 24,
              fontWeight: 600,
              color: '#fff',
              mb: 2
            }}>
              Upload PDF File
            </Typography>

            <Typography sx={{
              fontSize: 16,
              color: 'rgba(255, 255, 255, 0.8)',
              mb: 4,
              lineHeight: 1.6
            }}>
              Drag and drop a PDF file here, or{' '}
              <Box
                component="span"
                sx={{
                  color: '#3B82F6',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  '&:hover': { color: '#2563EB' }
                }}
              >
                browse files
              </Box>
            </Typography>

            <Box sx={{
              borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              pt: 3,
              textAlign: 'center'
            }}>
              <Typography sx={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.7)' }}>
                • PDF files only
              </Typography>
              <Typography sx={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.7)' }}>
                • Maximum size: 20MB
              </Typography>
              <Typography sx={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.7)' }}>
                • One file at a time
              </Typography>
            </Box>
          </Box>

          {/* File Selected */}
          {file && (
            <Box sx={{
              mt: 4,
              p: 3,
              backgroundColor: '#000',
              borderRadius: 2,
              border: '1px solid #8E54F7'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FileText size={24} color="#fff" />
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: 500, color: '#fff' }}>
                    {file.name}
                  </Typography>
                  <Typography sx={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.7)' }}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </Typography>
                </Box>
                <Button
                  onClick={handleReset}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    minWidth: 'auto',
                    p: 1
                  }}
                >
                  <RotateCcw size={20} />
                </Button>
              </Box>
            </Box>
          )}

          {/* Error Message */}
          {error && (
            <Alert
              severity="error"
              sx={{ mt: 3 }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}

          {/* Action Buttons */}
          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
            {!downloadUrl && (
              <GradientButton
                size="large"
                onClick={handleUpload}
                disabled={isUploading || isProcessing}
                startIcon={
                  isUploading || isProcessing ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <CloudUpload size={20} />
                  )
                }
              >
                {isUploading ? 'Uploading...' : isProcessing ? 'Converting...' : file ? 'Convert to CSV' : 'Select PDF File'}
              </GradientButton>
            )}

            {downloadUrl && (
              <Button
                variant="contained"
                size="large"
                onClick={handleDownload}
                startIcon={<Download size={20} />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: 16,
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  }
                }}
              >
                Download CSV
              </Button>
            )}

            {(file || downloadUrl) && (
              <Button
                variant="outlined"
                size="large"
                onClick={handleReset}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: 16,
                  borderColor: '#6B7280',
                  color: '#6B7280',
                  '&:hover': {
                    borderColor: '#374151',
                    color: '#374151',
                    backgroundColor: 'rgba(107, 114, 128, 0.04)'
                  }
                }}
              >
                Convert Another
              </Button>
            )}
          </Box>
        </Box>


      </Container>

      {/* Excollo 3D Logo */}
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            mt: { xs: 2, md: 2 },
            mb: { xs: 0, md: 0 },
            position: 'relative',
            zIndex: 1,
            background: 'transparent'
          }}
        >
          <Excollo3DCaseStudy disableScroll />
        </Box>
      </Container>

      {/* Footer */}
      <Footer />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={handleSidebarToggle}
        onFileSelect={handleFileSelect}
      />

      <Fade in={showWhatsAppButton}>
        <Button
          onClick={handleWhatsapp}
          variant="contained"
          color="primary"
          sx={{
            position: "fixed",
            height: 60,
            bottom: { xs: 200, md: 100 },
            right: { xs: 24, md: 24 },
            zIndex: 1000,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            "&:hover": {
              background: "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
            },
          }}
        >
          <IoLogoWhatsapp size={30} />
        </Button>
      </Fade>
    </Box>
  )
}

// Export the PDFtoCSV component as default
export default PDFtoCSV

