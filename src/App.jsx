import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeroPage from "./Pages/HeroPage";
import AboutUsPage from "./Pages/AboutUsPage";
import ContactForm from "./Pages/ContactFormPage";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import TermsOfService from "./Components/TermsOfService";
import { Box } from "@mui/material";
import "./App.css";
import ServicesPage from "./Pages/ServicesPage";
import ProductPage from "./Pages/ProductPage";
import CustomCursor from "./Components/CursorEffect/CursorEffetct";
import ScrollToTop from "./Components/ScrollToTop";
import Model from "./Components/Model";
import ChatBotWidget from "./Components/ChatBotWidget";

import PotentialToolsPage from "./Pages/PotentialToolsPage";
import OurWorkPage from "./Pages/OurWorkPage";
import SampleToolsPage from "./Pages/SampleToolsPage";
import HotelConcierge from "./Pages/sampletools/HotelConcierge";
import MrCoconut from "./Pages/caseStudies/MrCoconut";
import ContentCubicle from "./Pages/caseStudies/ContentCubicle";
import SwilSupportBot from "./Pages/caseStudies/SwilSupportBot";
import InsightIQ from "./Pages/caseStudies/InsightIQ";
import SwilInternalKnowledgeBot from "./Pages/caseStudies/SwilInternalKnowledgeBot";
import Phyllo from "./Pages/caseStudies/Phyllo";
import PDFsummarizer from "./Pages/caseStudies/PDFsummarizer";

import SEOArticleGenerator from "./Pages/sampletools/SeoArticleGenerator";
import SEOFeedback from "./Pages/sampletools/SEOFeedback";
import FinNews from "./Pages/sampletools/finNews";
import ECommCustomerInteraction from "./Pages/sampletools/eCommCustomerInteraction";
import PDFtoCSV from "./Pages/sampletools/PDFtoCSV";


const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Box sx={{ backgroundColor: "#000", color: "#fff" }}>
        <CustomCursor />
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/model" element={<Model />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/privacy&policy" element={<PrivacyPolicy />} />
          <Route path="/termsofservice" element={<TermsOfService />} />

          <Route path="/tools" element={<SampleToolsPage />} />
          <Route path="/potentialtools" element={<PotentialToolsPage />} />
          <Route path="/sampletools/hotelconcierge" element={<HotelConcierge />} />
          <Route path="/sampletools/seoarticlegenerator" element={<SEOArticleGenerator />} />
          <Route path="/sampletools/seofeedback" element={<SEOFeedback />} />
          <Route path="/sampletools/finnews" element={<FinNews />} />
          <Route path="/sampletools/ecomm-customer-interaction" element={<ECommCustomerInteraction />} />
          <Route path="/sampletools/pdf-to-csv" element={<PDFtoCSV />} />
          <Route path="/our-work" element={<OurWorkPage />} />

          <Route path="/case-study/mr-coconut" element={<MrCoconut />} />
          <Route path="/case-study/content-cubicle" element={<ContentCubicle />} />
          <Route path="/case-study/swil-support-bot" element={<SwilSupportBot />} />
          <Route path="/case-study/insightiq" element={<InsightIQ />} />
          <Route path="/case-study/swil-internal-knowledge-bot" element={<SwilInternalKnowledgeBot />} />
          <Route path="/case-study/phyllo" element={<Phyllo />} />
          <Route path="/case-study/pdf-summarizer" element={<PDFsummarizer />} />
        </Routes>
      </Box>
      <ChatBotWidget />
    </Router>
  );
};

export default App;
