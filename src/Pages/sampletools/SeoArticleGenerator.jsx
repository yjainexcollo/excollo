// Import React for component functionality
import React from "react";
// Import Material-UI components for UI layout and styling
import { Box, Container, Typography, TextField, IconButton, Button, Fade } from "@mui/material";
// Import Material-UI icons
import SearchIcon from "@mui/icons-material/Search";
// Import WhatsApp icon for contact button
import { IoLogoWhatsapp } from "react-icons/io5";
// Import custom components
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import Excollo3DCaseStudy from "../../Components/AboutUs/Excollo3DCaseStudy";

/**
 * SeoArticleGenerator Component
 * Interactive demo showcasing SEO article generation AI capabilities
 * Features keyword input, article generation, and copy functionality
 * @returns {JSX.Element} Complete demo page with article generation interface
 */
const SeoArticleGenerator = () => {
  // State for search keyword input
  const [searchInput, setSearchInput] = React.useState("");
  // State for loading indicator during API calls
  const [isLoading, setIsLoading] = React.useState(false);
  // State for WhatsApp button visibility based on scroll
  const [showWhatsAppButton, setShowWhatsAppButton] = React.useState(false);
  // State for generated content with multiple fields
  const [generatedContent, setGeneratedContent] = React.useState({
    title: "",
    slug: "",
    metaDescription: "",
    strategySummary: "",
    article: ""
  });

  const handleSearch = async () => {
    const trimmed = searchInput.trim();
    if (!trimmed) return;

    setIsLoading(true);

    try {
      // Call the webhook with the user's input
      const webhookUrl = import.meta.env.DEV
        ? '/api/seo-webhook'
        : 'https://n8n-excollo.azurewebsites.net/webhook/f0e8b760-7674-4021-9c53-e0c56acb5351';

      const requestBody = {
        message: trimmed,
        text: trimmed,
        input: trimmed,
        query: trimmed,
        timestamp: new Date().toISOString()
      };

      console.log('Sending request to SEO webhook:', webhookUrl);
      console.log('Request body:', requestBody);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Webhook error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      // Get the response as text first, then try to parse as JSON
      const rawResponseText = await response.text();
      console.log('Raw response from SEO webhook:', rawResponseText);

      let data;
      try {
        data = JSON.parse(rawResponseText);
        console.log('Parsed JSON data:', data);
      } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError);
        data = { message: rawResponseText };
      }

      // Always use webhook response if available, regardless of format
      console.log('Webhook response received, using it instead of fallback');
      console.log('Full data object:', data);

      // Check if data is an array (common webhook response format)
      let articleData = data;
      if (Array.isArray(data) && data.length > 0) {
        articleData = data[0];
        console.log('Extracted first item from array:', articleData);
      }

      // Extract structured content from webhook response
      const title = articleData.title || data.title || `SEO Article: ${trimmed}`;
      const slug = articleData.slug || data.slug || trimmed.toLowerCase().replace(/\s+/g, '-');
      const metaDescription = articleData.meta_description || articleData.metaDescription || data.meta_description || data.metaDescription || `AI-generated SEO article about ${trimmed}`;

      // Clean up strategy summary - extract readable text from JSON
      let strategySummary = articleData.strategy_summary || articleData.strategySummary || data.strategy_summary || data.strategySummary || `This article was generated using AI for the topic: ${trimmed}`;

      // If strategy summary is JSON, parse and format it
      if (typeof strategySummary === 'string' && strategySummary.startsWith('{')) {
        try {
          const parsedSummary = JSON.parse(strategySummary);
          if (parsedSummary.key_trend_insight && parsedSummary.content_angle) {
            strategySummary = `${parsedSummary.key_trend_insight}\n\n${parsedSummary.content_angle}`;
          }
        } catch (e) {
          console.log('Strategy summary is not valid JSON, using as is');
        }
      }

      // Handle body content - could be array of objects or string
      let articleContent = articleData.body || data.body || data.article || data.content || data.message || data.text || rawResponseText;

      console.log('Raw article content:', articleContent);
      console.log('Article content type:', typeof articleContent);

      // If body is a JSON string, parse it first
      if (typeof articleContent === 'string' && articleContent.startsWith('[')) {
        try {
          articleContent = JSON.parse(articleContent);
          console.log('Parsed article content from JSON string:', articleContent);
        } catch (e) {
          console.log('Failed to parse article content as JSON, using as string');
        }
      }

      // If body is an array of objects, format it properly with different heading sizes
      if (Array.isArray(articleContent)) {
        console.log('Body is an array, formatting content...');
        articleContent = articleContent.map(section => {
          if (typeof section === 'object' && section.type && section.title && section.content) {
            // Format based on heading type
            const headingLevel = section.type === 'H1' ? '#' :
              section.type === 'H2' ? '##' :
                section.type === 'H3' ? '###' :
                  section.type === 'H4' ? '####' : '##';
            return `${headingLevel} ${section.title}\n\n${section.content}`;
          } else if (typeof section === 'object' && section.title && section.content) {
            return `## ${section.title}\n\n${section.content}`;
          } else if (typeof section === 'string') {
            return section;
          }
          return JSON.stringify(section);
        }).join('\n\n');
      }

      console.log('Final extracted content:');
      console.log('Title:', title);
      console.log('Slug:', slug);
      console.log('Meta Description:', metaDescription);
      console.log('Strategy Summary:', strategySummary);
      console.log('Article Content Length:', articleContent ? articleContent.length : 0);

      // Use webhook response for all content
      setGeneratedContent({
        title: title,
        slug: slug,
        metaDescription: metaDescription,
        strategySummary: strategySummary,
        article: articleContent || `Webhook response received but no content found. Raw response: ${rawResponseText}`
      });

      setSearchInput("");
    } catch (error) {
      console.error('Error calling SEO webhook:', error);
      // Fallback to placeholder content on error
      setGeneratedContent({
        title: `Complete Guide to ${trimmed} - Best Practices and Tips`,
        slug: trimmed.toLowerCase().replace(/\s+/g, '-'),
        metaDescription: `Discover everything you need to know about ${trimmed}. Get expert insights, practical tips, and actionable strategies in this comprehensive guide.`,
        strategySummary: `This article targets the main keyword "${trimmed}" and related long-tail keywords. The content is structured for maximum SEO impact with proper heading hierarchy, internal linking opportunities, and user engagement focus.`,
        article: `# Complete Guide to ${trimmed}

## Introduction
Welcome to the ultimate guide on ${trimmed}. In this comprehensive article, we'll explore everything you need to know to master this topic.

## What is ${trimmed}?
${trimmed} is a crucial concept that plays a significant role in today's digital landscape...

## Key Benefits
- Enhanced understanding
- Practical applications
- Real-world implementation
- Measurable results

## Best Practices
When working with ${trimmed}, it's essential to follow these proven strategies...

## Conclusion
By implementing these ${trimmed} strategies, you'll be well-equipped to achieve your goals and see meaningful results.`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  // WhatsApp button scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowWhatsAppButton(true);
      } else {
        setShowWhatsAppButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleWhatsapp = () => {
    window.open(
      "https://wa.me/918890204938?text=Hey%2C%20I%20need%20help%20with%20a%20tech%20solution.%20Let's%20talk%21",
      "_blank"
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#000", color: "#fff", position: 'relative' }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: { xs: "100%", md: "88%" },
          height: { xs: "120px", sm: "140px", md: "160px" },
          background: `radial-gradient(ellipse at top, rgba(154, 106, 255, 0.6) 0%, rgba(0, 0, 0, 0) 60%)`,
          zIndex: 1,
          opacity: 1,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 3 }}>
        <NavBar />
      </Box>

      <Container
        maxWidth="xl"
        sx={{
          pt: { xs: 4, sm: 6, md: 10 },
          px: { xs: 1, sm: 2, md: 3 },
          position: 'relative',
          zIndex: 2
        }}
      >
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: { xs: 28, sm: 36, md: 48, lg: 62 },
            textAlign: 'center',
            fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
            lineHeight: { xs: 1.1, sm: 1.2 },
            mb: { xs: 1, sm: 2 }
          }}
        >
          SEO Article{' '}
          <Box component="span" sx={{
            background: 'linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Generator
          </Box>
        </Typography>

        <Typography
          sx={{
            mt: { xs: 1, sm: 2 },
            color: 'rgba(255,255,255,0.85)',
            maxWidth: { xs: '100%', sm: 800, md: 900 },
            textAlign: 'center',
            mx: 'auto',
            fontSize: { xs: 14, sm: 16 },
            lineHeight: { xs: 1.4, sm: 1.6 },
            px: { xs: 1, sm: 0 }
          }}
        >
          The SEO Article Generator AI creates comprehensive, search-engine-optimized content tailored to your specific keywords and topics. Generate engaging articles with proper meta descriptions, strategic keyword placement, and compelling titles that rank well and convert readers. Simply share your topic, target keywords, or special requirements.
        </Typography>

        {/* Search Interface */}
        <Box sx={{
          mt: { xs: 3, sm: 4, md: 5 },
          display: 'flex',
          justifyContent: 'center',
          px: { xs: 1, sm: 0 }
        }}>
          <Box sx={{
            display: 'flex',
            maxWidth: 600,
            width: '100%',
            gap: 1
          }}>
            <TextField
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your topic or keywords..."
              fullWidth
              variant="outlined"
              disabled={isLoading}
              InputProps={{
                sx: {
                  color: '#fff',
                  fontSize: { xs: 14, sm: 16 },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255,255,255,0.2)'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#7e22ce'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#7e22ce'
                  },
                  '&.Mui-disabled': {
                    color: 'rgba(255,255,255,0.5)',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' }
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'rgba(255,255,255,0.5)',
                    opacity: 1
                  }
                },
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSearch}
              disabled={!searchInput.trim() || isLoading}
              sx={{
                background: '#7e22ce',
                minWidth: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': { background: '#6b21a8' },
                '&:disabled': {
                  background: 'rgba(126, 34, 206, 0.3)',
                  opacity: 0.5
                }
              }}
            >
              <SearchIcon sx={{ color: '#fff', fontSize: { xs: 20, sm: 24 } }} />
            </IconButton>
          </Box>
        </Box>

        {/* Loading Indicator */}
        {isLoading && (
          <Box sx={{
            mt: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            py: 4
          }}>
            <Box sx={{
              width: { xs: 40, sm: 50 },
              height: { xs: 40, sm: 50 },
              border: '4px solid rgba(126, 34, 206, 0.3)',
              borderTop: '4px solid #7e22ce',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' }
              }
            }} />
            <Typography sx={{
              fontSize: { xs: 14, sm: 16 },
              color: 'rgba(255,255,255,0.8)',
              textAlign: 'center'
            }}>
              Generating your SEO article...
            </Typography>
          </Box>
        )}

        {/* Generated Content Display */}
        {(generatedContent.title || generatedContent.slug || generatedContent.metaDescription || generatedContent.strategySummary || generatedContent.article) && (
          <Box sx={{
            mt: { xs: 3, sm: 4, md: 5 },
            mx: 'auto',
            width: '100%',
            maxWidth: { xs: '100%', sm: 800, md: 1000 },
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(126, 34, 206, 0.3)',
            borderRadius: 2,
            p: { xs: 2, sm: 3, md: 4 }
          }}>

            {generatedContent.title && (
              <Box sx={{ mb: 3 }}>
                <Typography sx={{
                  fontSize: { xs: 16, sm: 18 },
                  fontWeight: 600,
                  color: '#7e22ce',
                  mb: 1
                }}>
                  Title
                </Typography>
                <Typography sx={{
                  fontSize: { xs: 14, sm: 16 },
                  color: 'rgba(255,255,255,0.9)',
                  wordWrap: 'break-word'
                }}>
                  {generatedContent.title}
                </Typography>
              </Box>
            )}

            {generatedContent.slug && (
              <Box sx={{ mb: 3 }}>
                <Typography sx={{
                  fontSize: { xs: 16, sm: 18 },
                  fontWeight: 600,
                  color: '#7e22ce',
                  mb: 1
                }}>
                  Slug
                </Typography>
                <Typography sx={{
                  fontSize: { xs: 14, sm: 16 },
                  color: 'rgba(255,255,255,0.9)',
                  wordWrap: 'break-word',
                  fontFamily: 'monospace'
                }}>
                  {generatedContent.slug}
                </Typography>
              </Box>
            )}

            {generatedContent.metaDescription && (
              <Box sx={{ mb: 3 }}>
                <Typography sx={{
                  fontSize: { xs: 16, sm: 18 },
                  fontWeight: 600,
                  color: '#7e22ce',
                  mb: 1
                }}>
                  Meta Description
                </Typography>
                <Typography sx={{
                  fontSize: { xs: 14, sm: 16 },
                  color: 'rgba(255,255,255,0.9)',
                  wordWrap: 'break-word'
                }}>
                  {generatedContent.metaDescription}
                </Typography>
              </Box>
            )}

            {generatedContent.strategySummary && (
              <Box sx={{ mb: 3 }}>
                <Typography sx={{
                  fontSize: { xs: 16, sm: 18 },
                  fontWeight: 600,
                  color: '#7e22ce',
                  mb: 1
                }}>
                  Strategy Summary
                </Typography>
                <Typography sx={{
                  fontSize: { xs: 14, sm: 16 },
                  color: 'rgba(255,255,255,0.9)',
                  wordWrap: 'break-word'
                }}>
                  {generatedContent.strategySummary}
                </Typography>
              </Box>
            )}

            {generatedContent.article && (
              <Box sx={{ mb: 0 }}>
                <Typography sx={{
                  fontSize: { xs: 16, sm: 18 },
                  fontWeight: 600,
                  color: '#7e22ce',
                  mb: 1
                }}>
                  Article
                </Typography>
                <Box sx={{
                  color: 'rgba(255,255,255,0.9)',
                  wordWrap: 'break-word',
                  lineHeight: 1.6,
                  '& h1': {
                    fontSize: { xs: 24, sm: 28 },
                    fontWeight: 700,
                    color: '#7e22ce',
                    mb: 2,
                    mt: 3
                  },
                  '& h2': {
                    fontSize: { xs: 20, sm: 24 },
                    fontWeight: 600,
                    color: '#7e22ce',
                    mb: 1.5,
                    mt: 2.5
                  },
                  '& h3': {
                    fontSize: { xs: 18, sm: 20 },
                    fontWeight: 600,
                    color: '#8E54F7',
                    mb: 1,
                    mt: 2
                  },
                  '& h4': {
                    fontSize: { xs: 16, sm: 18 },
                    fontWeight: 600,
                    color: '#8E54F7',
                    mb: 1,
                    mt: 1.5
                  },
                  '& p': {
                    fontSize: { xs: 14, sm: 16 },
                    mb: 1.5,
                    lineHeight: 1.6
                  }
                }}>
                  {generatedContent.article.split('\n').map((line, index) => {
                    if (line.startsWith('# ')) {
                      return <Typography key={index} component="h1" sx={{ fontSize: { xs: 24, sm: 28 }, fontWeight: 700, color: '#7e22ce', mb: 2, mt: 3 }}>{line.substring(2)}</Typography>;
                    } else if (line.startsWith('## ')) {
                      return <Typography key={index} component="h2" sx={{ fontSize: { xs: 20, sm: 24 }, fontWeight: 600, color: '#7e22ce', mb: 1.5, mt: 2.5 }}>{line.substring(3)}</Typography>;
                    } else if (line.startsWith('### ')) {
                      return <Typography key={index} component="h3" sx={{ fontSize: { xs: 18, sm: 20 }, fontWeight: 600, color: '#8E54F7', mb: 1, mt: 2 }}>{line.substring(4)}</Typography>;
                    } else if (line.startsWith('#### ')) {
                      return <Typography key={index} component="h4" sx={{ fontSize: { xs: 16, sm: 18 }, fontWeight: 600, color: '#8E54F7', mb: 1, mt: 1.5 }}>{line.substring(5)}</Typography>;
                    } else if (line.trim() === '') {
                      return <Box key={index} sx={{ mb: 1 }} />;
                    } else {
                      return <Typography key={index} component="p" sx={{ fontSize: { xs: 14, sm: 16 }, mb: 1.5, lineHeight: 1.6 }}>{line}</Typography>;
                    }
                  })}
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Container>

      {/* Excollo 3D Logo */}
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 1, sm: 2, md: 3 },
          mt: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Box
          sx={{
            mt: { xs: 1, md: 2 },
            mb: { xs: 0, md: 0 },
            position: 'relative',
            zIndex: 1,
            background: '#000'
          }}
        >
          <Excollo3DCaseStudy disableScroll />
        </Box>
      </Container>

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
  );
};

// Export the SeoArticleGenerator component as default
export default SeoArticleGenerator;