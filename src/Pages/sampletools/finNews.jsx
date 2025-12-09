// Import React hooks for state management and side effects
import React, { useState, useEffect } from 'react'
// Import Material-UI components for UI layout and styling
import { Box, TextField, InputAdornment, IconButton, Typography, Card, CardContent, Button, Container, Fade } from '@mui/material'
// Import Lucide React icons for UI elements
import { Search, TrendingUp, TrendingDown, Building2, Newspaper } from 'lucide-react'
// Import WhatsApp icon for contact button
import { IoLogoWhatsapp } from "react-icons/io5"
// Import custom components
import NavBar from '../../Components/NavBar'
import Footer from '../../Components/Footer'
import Excollo3DCaseStudy from '../../Components/AboutUs/Excollo3DCaseStudy'


/**
 * ConsolidatedApp Component (Financial News Tool)
 * Interactive demo showcasing financial news and stock analysis AI capabilities
 * Features real-time stock data, news analysis, and market insights
 * @returns {JSX.Element} Complete demo page with financial analysis interface
 */
function ConsolidatedApp() {
  // State for search query input
  const [searchQuery, setSearchQuery] = useState('')
  // State for loading indicator during API calls
  const [isLoading, setIsLoading] = useState(false)
  // State for webhook response data
  const [webhookData, setWebhookData] = useState(null)
  // State for WhatsApp button visibility based on scroll
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false)

  /**
   * Parse webhook output to extract structured financial data
   * Processes raw text response and organizes it into sections
   * @param {string} output - Raw text output from webhook
   * @returns {Object} Parsed data with news, metrics, and analysis
   */
  const parseWebhookOutput = (output) => {
    console.log('Parsing webhook output:', output) // Debug log
    const lines = output.split('\n')
    let currentSection = ''
    let newsItems = []
    let keyMetrics = { marketCap: "N/A", pe: "N/A", eps: "N/A" }
    let companyProfile = ''
    let shortTermAnalysis = ''
    let marketOverview = ''

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      console.log(`Line ${i}: "${line}" (Section: ${currentSection})`) // Debug log
      
      if (line.includes('📰 Latest News')) {
        currentSection = 'news'
        continue
      } else if (line.includes('📈 Chart Analysis')) {
        currentSection = 'analysis'
        // Remove emoticons from the analysis header line
        const cleanHeader = line.replace(/[📈📊📉📰🔗🏢]/g, '').trim()
        shortTermAnalysis = cleanHeader + '\n'
        continue
      } else if (line.includes('🔗 Options Chain')) {
        currentSection = 'options'
        continue
      } else if (line.includes('🏢 Company Snapshot')) {
        currentSection = 'company'
        continue
      }

      if (currentSection === 'news' && line.startsWith('- ')) {
        // Extract news items
        const newsMatch = line.match(/- (.+?) — (.+?) — (.+?) \[Read more\]\((.+?)\)/)
        if (newsMatch) {
          newsItems.push({
            title: newsMatch[1],
            source: newsMatch[2],
            time: newsMatch[3],
            url: newsMatch[4]
          })
        }
      } else if (currentSection === 'analysis' && line) {
        // Remove emoticons from analysis content
        const cleanLine = line.replace(/[📈📊📉📰🔗🏢]/g, '').trim()
        if (cleanLine) {
          shortTermAnalysis += cleanLine + '\n'
        }
      } else if (currentSection === 'company' && line) {
        // More flexible parsing for Market Cap
        if (line.includes('Market Cap')) {
          const marketCapMatch = line.match(/Market Cap[:\s]*~?([^|]+?)(?:\s*\||$)/)
          if (marketCapMatch) {
            keyMetrics.marketCap = marketCapMatch[1].trim()
          }
        }
        
        // More flexible parsing for P/E
        if (line.includes('P/E') || line.includes('PE')) {
          const peMatch = line.match(/P\/?E[:\s]*~?([^|]+?)(?:\s*\||$)/)
          if (peMatch) {
            keyMetrics.pe = peMatch[1].trim()
          }
        }
        
        // More flexible parsing for EPS
        if (line.includes('EPS')) {
          const epsMatch = line.match(/EPS[:\s]*~?([^|]+?)(?:\s*\||$)/)
          if (epsMatch) {
            keyMetrics.eps = epsMatch[1].trim()
          }
        }
        
        if (line.includes('Profile:')) {
          // Remove emoticons from company profile
          companyProfile = line.replace('Profile: ', '').replace(/[📈📊📉📰🔗🏢]/g, '').trim()
        }
      }
    }

    // Market Overview is empty since all content is in subsections
    marketOverview = ""

    // Additional fallback parsing - look for metrics anywhere in the output
    const fullText = output.toLowerCase()
    
    // Try to find Market Cap if not found in company section
    if (keyMetrics.marketCap === "N/A") {
      const marketCapMatch = fullText.match(/market cap[:\s]*~?([^|\n]+?)(?:\s*\||\n|$)/)
      if (marketCapMatch) {
        keyMetrics.marketCap = marketCapMatch[1].trim()
        console.log('Found Market Cap in fallback:', keyMetrics.marketCap)
      }
    }
    
    // Try to find P/E if not found in company section
    if (keyMetrics.pe === "N/A") {
      const peMatch = fullText.match(/p\/?e[:\s]*~?([^|\n]+?)(?:\s*\||\n|$)/)
      if (peMatch) {
        keyMetrics.pe = peMatch[1].trim()
        console.log('Found P/E in fallback:', keyMetrics.pe)
      }
    }
    
    // Try to find EPS if not found in company section
    if (keyMetrics.eps === "N/A") {
      const epsMatch = fullText.match(/eps[:\s]*~?([^|\n]+?)(?:\s*\||\n|$)/)
      if (epsMatch) {
        keyMetrics.eps = epsMatch[1].trim()
        console.log('Found EPS in fallback:', keyMetrics.eps)
      }
    }

    console.log('Final parsed metrics:', keyMetrics) // Debug log

    return {
      marketOverview: marketOverview,
      shortTermAnalysis: shortTermAnalysis.trim() || "Short term analysis will be displayed here...",
      companyProfile: companyProfile || "Company profile information will be displayed here...",
      keyMetrics,
      newsFeed: newsItems
    }
  }

  const triggerWebhook = async (ticker) => {
    if (!ticker.trim()) return

    setIsLoading(true)
    try {
      // Always use the production webhook URL for now
      const webhookUrl = 'https://n8n-excollo.azurewebsites.net/webhook/23f0b55a-c886-4837-b3bf-ac0a4ddad5bb'
      
      console.log('Triggering webhook with ticker:', ticker.trim())
      console.log('Webhook URL:', webhookUrl)

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticker: ticker.trim(),
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        const data = await response.text()
        console.log('Webhook response:', data)
        
        // Try to parse as JSON, fallback to text
        try {
          const jsonData = JSON.parse(data)
          
          // Parse the structured output from the webhook
          const output = jsonData.output || data
          const parsedData = parseWebhookOutput(output)
          setWebhookData(parsedData)
        } catch {
          // If not JSON, create a mock structure for display
          setWebhookData({
            marketOverview: data,
            shortTermAnalysis: "Analysis data will be displayed here...",
            companyProfile: "Company profile information...",
            keyMetrics: {
              marketCap: "N/A",
              pe: "N/A", 
              eps: "N/A"
            },
            newsFeed: [
              { title: "Sample News 1", url: "#" },
              { title: "Sample News 2", url: "#" },
              { title: "Sample News 3", url: "#" }
            ]
          })
        }
      } else {
        console.error('Webhook error:', response.status, response.statusText)
        const errorText = await response.text()
        console.error('Error response body:', errorText)
      }
    } catch (error) {
      console.error('Error calling webhook:', error)
      console.error('Error details:', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = () => {
    console.log('Search triggered with query:', searchQuery)
    triggerWebhook(searchQuery)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSearch()
    }
  }

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
    <Box sx={{ 
      minHeight: "100vh", 
      background: "#000", 
      color: "#fff", 
      position: 'relative',
      '@keyframes spin': {
        '0%': {
          transform: 'rotate(0deg)',
        },
        '100%': {
          transform: 'rotate(360deg)',
        },
      },
    }}>
      {/* Linear Gradient Background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "88%",
          height: { xs: "15%", md: "18%" },
          background: `radial-gradient(ellipse at top, rgba(154, 106, 255, 0.6) 0%, rgba(0, 0, 0, 0) 60%)`,
          zIndex: 1,
            opacity: 1,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 3 }}>
        <NavBar />
      </Box>

      {/* Fin News Dashboard Heading Section */}
      <Box sx={{ position: "relative", zIndex: 3, textAlign: "center", py: 4 }}>
        {/* Heading with Chart Analysis Arrow */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            fontWeight: 800,
            fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
            textAlign: "center",
            letterSpacing: "-0.02em"
          }}
        >
          {/* Chart Analysis Arrow */}
          <Box
            sx={{
              width: { xs: 32, sm: 40, md: 48 },
              height: { xs: 32, sm: 40, md: 48 },
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.8) 0%, rgba(59, 130, 246, 0.8) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(16, 185, 129, 0.4)"
              }
            }}
          >
            <Box
              sx={{
                width: 0,
                height: 0,
                borderLeft: { xs: "6px solid transparent", sm: "8px solid transparent", md: "10px solid transparent" },
                borderRight: { xs: "6px solid transparent", sm: "8px solid transparent", md: "10px solid transparent" },
                borderBottom: { xs: "10px solid white", sm: "12px solid white", md: "14px solid white" },
                transform: "translateY(-2px)"
              }}
            />
          </Box>
          
          {/* Heading Text */}
          <Box>
            <Box component="span" sx={{ color: "#FFFFFF" }}>
              Fin News{' '}
            </Box>
            <Box 
              component="span" 
              sx={{
                background: "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              Dashboard
            </Box>
          </Box>
        </Box>

        {/* Search Bar */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
            maxWidth: "600px",
            gap: 1
          }}>
            <TextField
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search stocks, news, or market data..."
              variant="outlined"
              disabled={isLoading}
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.1) !important",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#fff",
                  fontSize: "16px",
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1) !important",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "rgba(255, 255, 255, 0.1) !important",
                  },
                  "&.Mui-focused fieldset": {
                    border: "2px solid rgba(154, 106, 255, 0.8)",
                  },
                  "&.MuiInputBase-root": {
                    backgroundColor: "rgba(255, 255, 255, 0.1) !important",
                  },
                  "& input": {
                    color: "#fff",
                    "&::placeholder": {
                      color: "rgba(255, 255, 255, 0.6)",
                  opacity: 1,
                    },
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search 
                      size={20} 
                      color="rgba(255, 255, 255, 0.6)" 
                    />
                  </InputAdornment>
                ),
              }}
            />
            <IconButton
              onClick={handleSearch}
              disabled={isLoading || !searchQuery.trim()}
              sx={{
                backgroundColor: "rgba(154, 106, 255, 0.8)",
                color: "#fff",
                borderRadius: "12px",
                width: "48px",
                height: "48px",
                "&:hover": {
                  backgroundColor: "rgba(154, 106, 255, 1)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(154, 106, 255, 0.4)"
                },
                "&:disabled": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "rgba(255, 255, 255, 0.3)",
                },
                transition: "all 0.3s ease"
              }}
            >
              <Search size={20} />
            </IconButton>
          </Box>
        </Box>

        {/* Loading State */}
        {isLoading && (
          <Box sx={{ 
            position: "relative", 
            zIndex: 3, 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            py: 8,
            px: 4
          }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                border: "4px solid rgba(154, 106, 255, 0.3)",
                borderTop: "4px solid #9A6AFF",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                mb: 3
              }}
            />
            <Typography
              variant="h5"
              sx={{
                color: "#FFFFFF",
                fontWeight: 600,
                textAlign: "center"
              }}
            >
              Analyzing market data...
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                textAlign: "center",
                mt: 1
              }}
            >
              Please wait while we fetch the latest information
            </Typography>
          </Box>
        )}

        {/* Dashboard Content */}
        {webhookData && !isLoading && (
          <Box sx={{ position: "relative", zIndex: 3, px: 4, py: 6 }}>
            {/* Market Overview - Main heading with subsections below */}
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h4"
                sx={{
                  color: "#FFFFFF",
                  fontWeight: 700,
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2
                }}
              >
                <TrendingUp size={150} color="#10B981" />
                Market Overview
              </Typography>
            </Box>

            {/* Short Term Analysis */}
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h4"
                sx={{
                  color: "#FFFFFF",
          fontWeight: 700,
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2
                }}
              >
                <TrendingDown size={32} color="#EF4444" />
                Short Term Analysis
              </Typography>
              <Card
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "16px",
                  backdropFilter: "blur(10px)"
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography sx={{ color: "#FFFFFF", fontSize: "16px", lineHeight: 1.6, textAlign: "left" }}>
                    {webhookData.shortTermAnalysis || "Short term analysis will be displayed here..."}
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            {/* Company Profile */}
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h4"
                sx={{
                  color: "#FFFFFF",
                fontWeight: 700,
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2
                }}
              >
                <Building2 size={32} color="#3B82F6" />
                Company Profile
              </Typography>
              <Card
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "16px",
                  backdropFilter: "blur(10px)"
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography sx={{ color: "#FFFFFF", fontSize: "16px", lineHeight: 1.6, textAlign: "left" }}>
                    {webhookData.companyProfile || "Company profile information will be displayed here..."}
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            {/* Key Component Metrics */}
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h4"
                sx={{
                  color: "#FFFFFF",
            fontWeight: 700,
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2
                }}
              >
                <TrendingUp size={32} color="#8E54F7" />
                Key Component Metrics
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3 }}>
                {/* Market Cap Card */}
                <Card
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "16px",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 25px rgba(154, 106, 255, 0.2)"
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: "center" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#10B981",
                fontWeight: 600,
                        mb: 2
              }}
            >
              Market Cap
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        color: "#FFFFFF",
                        fontWeight: 700
                      }}
                    >
                      {webhookData.keyMetrics?.marketCap || "N/A"}
                    </Typography>
                  </CardContent>
                </Card>

                {/* P/E Card */}
                <Card
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "16px",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 25px rgba(154, 106, 255, 0.2)"
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: "center" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#3B82F6",
                fontWeight: 600,
                        mb: 2
              }}
            >
              P/E
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        color: "#FFFFFF",
                        fontWeight: 700
                      }}
                    >
                      {webhookData.keyMetrics?.pe || "N/A"}
                    </Typography>
                  </CardContent>
                </Card>

                {/* EPS Card */}
                <Card
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "16px",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 25px rgba(154, 106, 255, 0.2)"
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: "center" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#8E54F7",
                fontWeight: 600,
                        mb: 2
              }}
            >
              EPS
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        color: "#FFFFFF",
                        fontWeight: 700
                      }}
                    >
                      {webhookData.keyMetrics?.eps || "N/A"}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>

            {/* News Feed */}
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h4"
                sx={{
                  color: "#FFFFFF",
          fontWeight: 700,
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  justifyContent: "flex-start"
                }}
              >
                <Newspaper size={32} color="#F59E0B" />
        News Feed
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "flex-start" }}>
                {(webhookData.newsFeed || []).map((news, index) => (
                  <Card
                    key={index}
                    sx={{
                      backgroundColor: "rgba(6, 6, 6, 0.91)",
                      border: "none",
                      borderRadius: "16px",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(154, 106, 255, 0.2)"
                      }
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                      <Box sx={{ 
                        display: "flex", 
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "space-between", 
                        alignItems: { xs: "flex-start", sm: "flex-start" }, 
                        gap: { xs: 2, sm: 2 } 
                      }}>
                        <Box sx={{ flex: 1, width: { xs: "100%", sm: "auto" } }}>
                          <Typography
                            variant="h6"
                            sx={{
                              color: "#FFFFFF",
                              fontWeight: 600,
                              mb: 1,
                              textAlign: "justify",
                              fontSize: { xs: "1rem", sm: "1.25rem" },
                              lineHeight: { xs: 1.4, sm: 1.5 }
                            }}
                          >
                            {news.title}
                          </Typography>
                          {news.source && (
                            <Box sx={{ 
                              display: "flex", 
                              flexDirection: { xs: "column", sm: "row" },
                              gap: { xs: 0.5, sm: 2 }, 
                              alignItems: { xs: "flex-start", sm: "center" }, 
                              mb: 1 
                            }}>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "#8E54F7",
                                  fontWeight: 500,
                                  textAlign: "justify",
                                  fontSize: { xs: "0.75rem", sm: "0.875rem" }
                                }}
                              >
                                {news.source}
                              </Typography>
                              {news.time && (
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "rgba(255, 255, 255, 0.6)",
                                    textAlign: "justify",
                                    fontSize: { xs: "0.75rem", sm: "0.875rem" }
                                  }}
                                >
                                  {news.time}
                                </Typography>
                              )}
                            </Box>
                          )}
                        </Box>
                        <Button
                          variant="outlined"
                          sx={{
                            color: "#8E54F7",
                            borderColor: "#8E54F7",
                            borderRadius: "8px",
                            px: { xs: 2, sm: 3 },
                            py: { xs: 1, sm: 1 },
                            flexShrink: 0,
                            width: { xs: "100%", sm: "auto" },
                            fontSize: { xs: "0.75rem", sm: "0.875rem" },
                            "&:hover": {
                              backgroundColor: "rgba(142, 84, 247, 0.1)",
                              borderColor: "#8E54F7"
                            }
                          }}
                          onClick={() => window.open(news.url, '_blank')}
                        >
                          Read More
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>

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

// Export the ConsolidatedApp component as default
export default ConsolidatedApp
