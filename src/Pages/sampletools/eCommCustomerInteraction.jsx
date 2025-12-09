// Import React hooks for state management and side effects
import React, { useState, useRef, useEffect } from 'react'
// Import Material-UI components for UI layout and styling
import { Box, Container, Typography, TextField, IconButton, Button, Fade } from '@mui/material'
// Import Lucide React icons for UI elements
import { Mic, Send } from 'lucide-react'
// Import WhatsApp icon for contact button
import { IoLogoWhatsapp } from "react-icons/io5"
// Import custom components
import NavBar from '../../Components/NavBar'
import Footer from '../../Components/Footer'
import Excollo3DCaseStudy from '../../Components/AboutUs/Excollo3DCaseStudy'

/**
 * ECommCustomerInteraction Component
 * Interactive demo showcasing e-commerce customer interaction AI capabilities
 * Features a chat interface that simulates customer service interactions
 * @returns {JSX.Element} Complete demo page with chat interface and animations
 */
const ECommCustomerInteraction = () => {
  // State for chat messages and conversation history
  const [messages, setMessages] = useState([])
  // State for current input message
  const [input, setInput] = useState('')
  // State for loading indicator during API calls
  const [isLoading, setIsLoading] = useState(false)
  // State for user IP address (for analytics/tracking)
  const [userIP, setUserIP] = useState('')
  // State for WhatsApp button visibility based on scroll
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false)
  // Ref for input field focus management
  const inputRef = useRef(null)

  /**
   * Effect to fetch user IP address for analytics
   * Uses ipify.org API to get the user's public IP address
   * Falls back to a generated session ID if IP fetch fails
   */
  useEffect(() => {
    const fetchUserIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        setUserIP(data.ip)
      } catch (error) {
        console.error('Error fetching IP:', error)
        // Fallback to a generated session ID if IP fetch fails
        setUserIP(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
      }
    }

    fetchUserIP()
  }, [])

  /**
   * Effect to handle scroll-based WhatsApp button visibility
   * Shows/hides the floating WhatsApp button based on scroll position
   */
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

  /**
   * Handle WhatsApp contact button click
   * Opens WhatsApp with pre-filled message in new tab
   */
  const handleWhatsapp = () => {
    window.open(
      "https://wa.me/918890204938?text=Hey%2C%20I%20need%20help%20with%20a%20tech%20solution.%20Let's%20talk%21",
      "_blank"
    )
  }

  /**
   * Handle sending a message in the chat interface
   * Processes user input, sends to AI webhook, and displays response
   */
  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    // Add user message to chat history
    const userMessage = {
      id: Date.now(),
      sender: 'You',
      text: trimmed,
      time: 'now',
      isUser: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Use proxy in development, direct URL in production
      const webhookUrl = import.meta.env.DEV
        ? '/api/ecomm-webhook'
        : 'https://n8n-excollo.azurewebsites.net/webhook/31344f1e-117a-4839-bfd0-a6c31aacf593'

      const requestBody = {
        message: trimmed,
        query: trimmed,
        input: trimmed,
        text: trimmed,
        sessionId: userIP || `session_${Date.now()}`,
        timestamp: new Date().toISOString()
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      if (response.ok) {
        const data = await response.text()

        // Try to parse as JSON, fallback to text
        let botResponse
        try {
          const jsonData = JSON.parse(data)
          botResponse = jsonData.output || jsonData.response || jsonData.message || jsonData.text || jsonData.reply || jsonData.answer || data
        } catch {
          botResponse = data || "Thank you for your message! How can I help you with your order today?"
        }

        const botMessage = {
          id: Date.now() + 1,
          sender: 'Customer Support Bot',
          text: botResponse,
          time: 'now',
          isUser: false,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face'
        }
        setMessages(prev => [...prev, botMessage])
      } else {
        // Show error message to user
        const botMessage = {
          id: Date.now() + 1,
          sender: 'Customer Support Bot',
          text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
          time: 'now',
          isUser: false,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face'
        }
        setMessages(prev => [...prev, botMessage])
      }
    } catch (error) {
      console.error('Error calling webhook:', error)
      // Show error message to user
      const botMessage = {
        id: Date.now() + 1,
        sender: 'Customer Support Bot',
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        time: 'now',
        isUser: false,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face'
      }
      setMessages(prev => [...prev, botMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", background: "#000", color: "#fff", position: 'relative' }}>
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

      <Box sx={{ position: "relative", zIndex: 3 }}>
        <NavBar />
      </Box>

      <Container maxWidth="xl" sx={{ pt: { xs: 4, md: 6 }, px: { xs: 2, sm: 3 }, position: 'relative', zIndex: 2 }}>
        {/* Main Title */}
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: { xs: 32, sm: 40, md: 48 },
            textAlign: 'center',
            fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
            mb: { xs: 2, md: 3 },
            lineHeight: 1.2
          }}
        >
          E-commerce Customer{' '}
          <Box component="span" sx={{
            background: 'linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Interaction Bot
          </Box>
        </Typography>

        {/* Description */}
        <Typography sx={{
          mb: { xs: 4, md: 6 },
          color: 'rgba(255,255,255,0.85)',
          maxWidth: 900,
          textAlign: 'center',
          mx: 'auto',
          fontSize: { xs: 14, sm: 16 },
          lineHeight: 1.6
        }}>
          The E-commerce Customer Interaction Bot is a virtual extension of your customer service team, built to deliver personalized shopping assistance at scale. Customers can use it to get product recommendations, track orders, resolve issues, or explore your catalog, all aligned with your brand's offerings.
        </Typography>

        {/* Chat Interface */}
        <Box sx={{
          mx: 'auto',
          width: '100%',
          maxWidth: 900,
          border: '1px solid rgba(126, 34, 206, 0.2)',
          borderRadius: 3,
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(126, 34, 206, 0.1)',
          minHeight: 500
        }}>
          {/* Chat Messages */}
          <Box sx={{
            flex: 1,
            overflowY: 'auto',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            minHeight: 400,
            justifyContent: messages.length === 0 ? 'center' : 'flex-start'
          }}>
            {messages.length === 0 && (
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                flexDirection: 'column',
                gap: 2,
                color: 'rgba(255,255,255,0.6)'
              }}>
                <Typography sx={{ fontSize: 18, fontWeight: 500, fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                  Welcome to E-commerce Customer Support
                </Typography>
                <Typography sx={{ fontSize: 14, textAlign: 'center', maxWidth: 400, fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                  How can I help you today? Ask me about products, orders, returns, or any other questions!
                </Typography>
              </Box>
            )}
            {messages.map((message) => (
              <Box key={message.id} sx={{
                display: 'flex',
                justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                width: '100%',
                alignItems: 'flex-start',
                gap: { xs: 0.5, sm: 1 },
                mb: 2
              }}>
                {!message.isUser && (
                  <Box
                    component="img"
                    src={message.avatar}
                    alt={message.sender}
                    sx={{
                      width: { xs: 32, sm: 40 },
                      height: { xs: 32, sm: 40 },
                      borderRadius: '50%',
                      objectFit: 'cover',
                      flexShrink: 0,
                      mt: 0.5
                    }}
                  />
                )}

                <Box
                  sx={{
                    minWidth: 'fit-content',
                    px: { xs: 2, sm: 2.5 },
                    py: { xs: 1.5, sm: 2 },
                    borderRadius: 3,
                    background: message.isUser
                      ? 'linear-gradient(135deg, rgba(126, 34, 206, 0.3) 0%, rgba(126, 34, 206, 0.2) 100%)'
                      : 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    border: message.isUser
                      ? '1px solid rgba(126, 34, 206, 0.4)'
                      : '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                    fontSize: { xs: 13, sm: 14, md: 15 },
                    lineHeight: 1.5,
                    wordWrap: 'break-word',
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'break-word',
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                    boxShadow: message.isUser
                      ? '0 4px 12px rgba(126, 34, 206, 0.2)'
                      : '0 4px 12px rgba(0, 0, 0, 0.2)',
                    position: 'relative',
                    width: 'fit-content',
                    maxWidth: { xs: 'calc(100% - 50px)', sm: '65%', md: '65%' }
                  }}
                >
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 0.5,
                    flexWrap: 'wrap',
                    gap: 0.5
                  }}>
                    <Typography sx={{
                      fontSize: { xs: 11, sm: 12 },
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.8)',
                      flex: 1,
                      minWidth: 0
                    }}>
                      {message.sender}
                    </Typography>
                    <Typography sx={{
                      fontSize: { xs: 10, sm: 11 },
                      color: 'rgba(255,255,255,0.6)',
                      flexShrink: 0
                    }}>
                      {message.time}
                    </Typography>
                  </Box>
                  <Typography sx={{
                    fontSize: { xs: 13, sm: 14, md: 15 },
                    lineHeight: 1.5,
                    wordWrap: 'break-word',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {message.text}
                  </Typography>
                </Box>

                {message.isUser && (
                  <Box
                    component="img"
                    src={message.avatar}
                    alt={message.sender}
                    sx={{
                      width: { xs: 32, sm: 40 },
                      height: { xs: 32, sm: 40 },
                      borderRadius: '50%',
                      objectFit: 'cover',
                      flexShrink: 0,
                      mt: 0.5
                    }}
                  />
                )}
              </Box>
            ))}

            {isLoading && (
              <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                width: '100%',
                alignItems: 'flex-start',
                gap: { xs: 0.5, sm: 1 },
                mb: 2
              }}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
                  alt="Bot"
                  sx={{
                    width: { xs: 32, sm: 40 },
                    height: { xs: 32, sm: 40 },
                    borderRadius: '50%',
                    objectFit: 'cover',
                    flexShrink: 0,
                    mt: 0.5
                  }}
                />
                <Box
                  sx={{
                    maxWidth: { xs: 'calc(100% - 50px)', sm: '65%', md: '65%' },
                    minWidth: 'fit-content',
                    px: { xs: 2, sm: 2.5 },
                    py: { xs: 1.5, sm: 2 },
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                    fontSize: { xs: 13, sm: 14, md: 15 },
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: { xs: 1, sm: 1.5 },
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <Box sx={{
                    width: { xs: 10, sm: 12 },
                    height: { xs: 10, sm: 12 },
                    border: '2px solid rgba(126, 34, 206, 0.3)',
                    borderTop: '2px solid #7e22ce',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    '@keyframes spin': {
                      '0%': { transform: 'rotate(0deg)' },
                      '100%': { transform: 'rotate(360deg)' }
                    }
                  }} />
                  <Typography sx={{
                    fontSize: { xs: 13, sm: 14, md: 15 },
                    color: 'rgba(255,255,255,0.8)'
                  }}>
                    Typing...
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>

          {/* Input Field */}
          <Box sx={{
            display: 'flex',
            p: { xs: 1.5, sm: 2 },
            gap: { xs: 1, sm: 2 },
            borderTop: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '0 0 12px 12px',
            alignItems: 'center'
          }}>
            <TextField
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type Something"
              fullWidth
              size="medium"
              variant="outlined"
              disabled={isLoading}
              autoFocus
              multiline
              maxRows={3}
              InputProps={{
                sx: {
                  color: '#fff',
                  fontSize: { xs: 14, sm: 15 },
                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                  borderRadius: 2,
                  background: 'rgba(255,255,255,0.05)',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(126, 34, 206, 0.3)',
                    borderWidth: 1
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(126, 34, 206, 0.6)'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#7e22ce',
                    borderWidth: 2
                  },
                  '&.Mui-disabled': {
                    color: 'rgba(255,255,255,0.5)',
                    background: 'rgba(255,255,255,0.02)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255,255,255,0.1)'
                    }
                  },
                  '& .MuiInputBase-input': {
                    py: { xs: 1, sm: 1.5 },
                    fontSize: { xs: 14, sm: 15 },
                    '&::placeholder': {
                      color: 'rgba(255,255,255,0.5)',
                      opacity: 1
                    }
                  }
                },
              }}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              sx={{
                px: { xs: 2, sm: 3 },
                py: { xs: 1.2, sm: 1.5 },
                borderRadius: 2,
                background: 'linear-gradient(135deg, #7e22ce 0%, #3b82f6 100%)',
                color: '#fff',
                fontWeight: 600,
                fontSize: { xs: 12, sm: 14 },
                textTransform: 'none',
                minWidth: 'auto',
                height: { xs: 40, sm: 48 },
                '&:hover': {
                  background: 'linear-gradient(135deg, #6d21a3 0%, #2563eb 100%)',
                },
                '&:disabled': {
                  background: 'rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.3)'
                }
              }}
            >
              <Send size={20} />
            </Button>
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
            background: '#000'
          }}
        >
          <Excollo3DCaseStudy disableScroll />
        </Box>
      </Container>

      {/* Footer */}
      <Footer />

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

// Export the ECommCustomerInteraction component as default
export default ECommCustomerInteraction
